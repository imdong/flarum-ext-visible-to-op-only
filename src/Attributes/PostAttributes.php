<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Attributes;

use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use ImDong\FlarumExtVisibleToOpOnly\Common\Defined;
use Symfony\Contracts\Translation\TranslatorInterface;


class PostAttributes
{
    /**
     * @var SettingsRepositoryInterface|mixed
     */
    private $settings;

    /**
     * @var mixed|TranslatorInterface
     */
    private $translator;

    public function __construct()
    {
        $this->settings = resolve(SettingsRepositoryInterface::class);
        $this->translator = resolve(TranslatorInterface::class);
    }

    public function __invoke(BasicPostSerializer $serializer, Post $post, $attributes): array
    {
        // 获取当前用户
        $actor = $serializer->getActor();

        // 获取 discussion
        $discussion = $post->discussion;

        // 检查是否有查看的权限
        $canViewPosts = $actor->can(Defined::$extPrefix . '.viewPosts', $discussion);

        // 是否有查看隐藏内容的权限
        $canViewHidePosts = $actor->can('.' . Defined::$extPrefix . '.ViewHidePosts', $discussion);

        // 是否有使用仅楼主可见功能的权限
        $canViewButton = $actor->can(Defined::$extPrefix . '.viewButton', $discussion);

        // 如果自己是作者也可以看
        if ($actor->id == $post->user_id || $discussion->user_id == $actor->id) {
            $canViewPosts = true;
            $canViewHidePosts = true;
        }

        // 如果是置顶贴也可以看到隐藏回复
        $allowViewSticky = !!$this->settings->get(Defined::$extPrefix . '.allowViewSticky');
        $isSticky = $discussion->getAttribute('is_sticky'); // 置顶
        $isStickiest = $discussion->getAttribute('is_stickiest'); // 超级置顶
        $isTagSticky = $discussion->getAttribute('is_tag_sticky'); // 标签内置顶
        if ($allowViewSticky && ($isSticky || $isStickiest || $isTagSticky)) {
            $canViewPosts = true;
        }

        $attributes['canViewPosts'] = $canViewPosts;
        $attributes['canViewHidePosts'] = $canViewHidePosts;
        $attributes['canVisibleToOpPermissionsViewButton'] = $canViewButton;

        // 如果不允许看到回复内容则直接屏蔽掉
        if (!$canViewPosts) {
            $attributes['content'] = '';
            $attributes["contentHtml"] = '';
            return $attributes;
        }

        // 处理回复中的隐藏内容
        if (isset($attributes["contentHtml"]) && str_contains($attributes["contentHtml"], '<onlyopsee>')) {
            $attributes = $this->onlyOpSee($canViewHidePosts, $attributes);
        }

        // 组成结构
        return $attributes;
    }

    /**
     * 仅楼主可见
     *
     * @param bool $canViewHidePosts
     * @param array $attributes
     * @return array
     */
    public function onlyOpSee(bool $canViewHidePosts, array $attributes): array
    {
        // 如果可见就不变了
        if ($canViewHidePosts) {
            return $attributes;
        }

        // 替换隐藏部分内容
        $attributes["contentHtml"] = preg_replace(
            '#<onlyopsee>(.*?)<\/onlyopsee>#is',
            '<onlyopsee></onlyopsee>',
            $attributes["contentHtml"]
        );

        return $attributes;
    }

}
