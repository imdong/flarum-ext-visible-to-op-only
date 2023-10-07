<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Attributes;

use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use ImDong\FlarumExtVisibleToOpOnly\Common\Defined;
use ImDong\FlarumExtVisibleToOpOnly\ReplaceCode;

class PostAttributes
{
    /**
     * @var SettingsRepositoryInterface|mixed
     */
    private $settings;

    public function __construct()
    {
        $this->settings = resolve(SettingsRepositoryInterface::class);
    }

    public function __invoke(BasicPostSerializer $serializer, Post $post): array
    {
        // 获取当前用户
        $actor = $serializer->getActor();

        // 获取 discussion
        $discussion = $post->discussion;

        // 检查是否有查看的权限
        $canViewPosts = $actor->can(Defined::$extPrefix . '.viewPosts', $discussion);

        // 是否有查看隐藏内容的权限
        $canViewHidePosts = $actor->can(Defined::$extPrefix . '.ViewHidePosts', $discussion);

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

        // 如果不允许看到回复内容则直接屏蔽掉
        if (!$canViewPosts) {
            $attributes["contentHtml"] = resolve(ReplaceCode::class)->getTipsDeny();
            return $attributes;
        }

        // 组成结构
        return [
            'canOpOnlyViewPosts' => $canViewPosts,
            'canOpOnlyViewHidePosts' => $canViewHidePosts,
        ];
    }
}
