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

        $newHTML = $attributes["contentHtml"];

        // 帖子作者和管理员可见
        $replied = !$actor->isGuest();
        if ($actor->isAdmin()) {
            $replied = true;
        }

        // 检查是否拥有忽略回复可见权限
        if ($actor->hasPermission('post.bypassReplyRequirement')) {
            $replied = true;
        }

        if ($replied) {
            $newHTML = preg_replace('#<onlyopsee>(.*?)<\/onlyopsee>#is',
                '<div class="onlyopsee"><div class="onlyopsee_title">' .
                $this->translator->trans('imdong-visible-to-op-only.forum.hidden_content_only_op_see')
                . '</div>$1</div>',
                $newHTML
            );
        } else {
            $newHTML = preg_replace(
                '#<onlyopsee>(.*?)</onlyopsee>#is',
                '<div class="onlyopsee"><div class="onlyopsee_alert">' .
                $this->translator->trans('imdong-visible-to-op-only.forum.only_op_see') . '</div></div>',
                $newHTML
            );
        }

        $attributes['contentHtml'] = $newHTML;

        return $attributes;
    }
}
