<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Attributes;

use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use ImDong\FlarumExtVisibleToOpOnly\Common\Defined;

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
        $isSticky = $discussion->getAttribute('is_sticky');
        $isStickiest = $discussion->getAttribute('is_stickiest');
        if ($allowViewSticky && ($isSticky || $isStickiest)) {
            $canViewPosts = true;
        }

        // 组成结构
        return [
            'canOpOnlyViewPosts' => $canViewPosts,
            'canOpOnlyViewHidePosts' => $canViewHidePosts,
        ];
    }
}
