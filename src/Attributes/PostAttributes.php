<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Attributes;

use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Post\Post;

class PostAttributes
{
    public function __invoke(BasicPostSerializer $serializer, Post $post): array
    {
        // 获取当前用户
        $actor = $serializer->getActor();

        // 获取 discussion
        $discussion = $post->discussion;

        // 检查是否有查看的权限
        $canViewPosts = $actor->can('viewPosts', $discussion);

        // 如果自己是作者也可以看
        if ($actor->id == $post->user_id || $discussion->user_id == $actor->id) {
            $canViewPosts = true;
        }

        $attributes = [
            'canViewPosts' => $canViewPosts,
        ];

        return $attributes;
    }
}
