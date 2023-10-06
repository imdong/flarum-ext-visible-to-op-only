<?php

namespace ImDong\FlarumExtVisibleToOpOnly;

use Flarum\Settings\SettingsRepositoryInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Database\AbstractModel;


class ReplaceCode
{
    /**
     * @var mixed|TranslatorInterface
     */
    private $translator;

    public function __construct()
    {
        $this->translator = resolve(TranslatorInterface::class);
    }

    /**
     * @param PostSerializer $serializer
     * @param AbstractModel $post
     * @param array $attributes
     * @return array
     */
    public function __invoke(PostSerializer $serializer, AbstractModel $post, array $attributes): array
    {
        // 是否有权限查看回复内容
        if (!$attributes['canOpOnlyViewPosts']) {
            $attributes["contentHtml"] = $this->getTipsDeny();
            return $attributes;
        }

        // 处理回复中的隐藏内容
        if (isset($attributes["contentHtml"]) && str_contains($attributes["contentHtml"], '<onlyopsee>')) {
            $attributes = $this->onlyOpSee($serializer, $post, $attributes);
        }

        return $attributes;
    }

    /**
     * 仅楼主可见
     *
     * @param PostSerializer $serializer
     * @param AbstractModel $post
     * @param array $attributes
     * @return array
     */
    public function onlyOpSee(PostSerializer $serializer, AbstractModel $post, array $attributes): array
    {
        // 替换隐藏部分内容
        $attributes["contentHtml"] = preg_replace(
            '#<onlyopsee>(.*?)<\/onlyopsee>#is',
            $attributes['canOpOnlyViewHidePosts'] ? $this->getTipsAllow() : $this->getTipsDeny(),
            $attributes["contentHtml"]
        );

        return $attributes;
    }

    /**
     * 获取允许显示时的模板
     *
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
     * 获取拒绝显示时的模板
     *
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
