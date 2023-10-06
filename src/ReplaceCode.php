<?php

namespace ImDong\FlarumExtVisibleToOpOnly;

use Flarum\Settings\SettingsRepositoryInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Database\AbstractModel;


class ReplaceCode
{
    public function __construct()
    {
        $this->settings = resolve(SettingsRepositoryInterface::class);
        $this->translator = resolve(TranslatorInterface::class);
    }

    public function __invoke(PostSerializer $serializer, AbstractModel $post, array $attributes)
    {
        // 是否无权限查看帖子内容
        if (!$attributes['canViewPosts']) {
            $attributes["contentHtml"] = $this->getTipsDeny();
            return $attributes;
        }

        if (isset($attributes["contentHtml"])) {
            // 仅楼主可见
            if (str_contains($attributes["contentHtml"], '<onlyopsee>')) {
                $attributes = $this->onlyOpSee($serializer, $post, $attributes);
            }
        }

        return $attributes;
    }

    /**
     * 仅楼主可见
     *
     * @param PostSerializer $serializer
     * @param AbstractModel $post
     * @param array $attributes
     * @return mixed
     */
    public function onlyOpSee(PostSerializer $serializer, AbstractModel $post, array $attributes)
    {
        $actor = $serializer->getActor();
        $discussion = $post->discussion;

        // 是否有查看隐藏内容的权限
        $allowViewHidePosts = $actor->can('allowViewHidePosts', $discussion);

        // 管理员 贴主 回复作者
        $replied = false;
        if ($actor->isAdmin() || $allowViewHidePosts || $discussion->user_id == $actor->id || $post->user_id == $actor->id) {
            $replied = true;
        }

        $attributes["contentHtml"] = preg_replace(
            '#<onlyopsee>(.*?)<\/onlyopsee>#is',
            $replied ? $this->getTipsAllow() : $this->getTipsDeny(),
            $attributes["contentHtml"]
        );

        return $attributes;
    }

    /**
     * @return string
     */
    private function getTipsAllow(): string
    {
        return sprintf(
            '<div class="onlyopsee"><div class="onlyopsee_title">%s</div>$1</div>',
            $this->translator->trans('imdong-visible-to-op-only.forum.only_op_see')
        );
    }

    /**
     * @return string
     */
    private function getTipsDeny(): string
    {
        return sprintf(
            '<div class="onlyopsee"><div class="onlyopsee_alert">%s</div></div>',
            $this->translator->trans('imdong-visible-to-op-only.forum.hidden_content_only_op_see')
        );
    }
}
