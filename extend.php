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
use Flarum\Extend;
use ImDong\FlarumExtVisibleToOpOnly\Attributes\PostAttributes;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    // 语言支持
    new Extend\Locales(__DIR__ . '/locale'),

    // 给主题添加是否能查看 post 的权限
    (new Extend\ApiSerializer(BasicPostSerializer::class))
        ->attributes(PostAttributes::class),

    // 添加 [OP] 代码支持
    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->BBcodes->addCustom(
                '[OP]{TEXT}[/OP]',
                '<onlyOpSee>{TEXT}</onlyOpSee>'
            );
        }),
];
