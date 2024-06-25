<?php

/*
 * This file is part of imdong/flarum-ext-visible-to-op-only.
 *
 * Copyright (c) 2023 ImDong.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace ImDong\FlarumExtVisibleToOpOnly;

use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Extend;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\Post\Event\Posted;
use Flarum\Tags\Api\Serializer\TagSerializer;
use ImDong\FlarumExtVisibleToOpOnly\Attributes\AddUserAttributes;
use ImDong\FlarumExtVisibleToOpOnly\Attributes\PostAttributes;
use ImDong\FlarumExtVisibleToOpOnly\Attributes\TagSubscriptionAttribute;
use ImDong\FlarumExtVisibleToOpOnly\Listener\AddPostSendOpAuthListener;
use ImDong\FlarumExtVisibleToOpOnly\Listener\EditPostSendOpAuthListener;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    // 语言支持
    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Event())
        ->listen(PostSaving::class, EditPostSendOpAuthListener::class)
        ->listen(Posted::class, AddPostSendOpAuthListener::class),

    // 给主题添加是否能查看 post 的权限
    (new Extend\ApiSerializer(BasicPostSerializer::class))
        ->attributes(PostAttributes::class),

    (new Extend\ApiSerializer(BasicUserSerializer::class))
        ->attributes(AddUserAttributes::class),

    // 添加 [OP] 代码支持
    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->BBcodes->addCustom(
                '[OP]{TEXT}[/OP]',
                '<onlyOpSee>{TEXT}</onlyOpSee>'
            );
        }),

    (new Extend\Settings())
        ->serializeToForum('imdong-visible-to-op-only.admin.permissions.view-button', 'imdong-visible-to-op-only.admin.permissions.view-button'),
];
