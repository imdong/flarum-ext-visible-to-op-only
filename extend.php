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

use Flarum\Extend;
use s9e\TextFormatter\Configurator;
use Flarum\Api\Serializer\PostSerializer;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),

    new Extend\Locales(__DIR__ . '/locale'),

    // 添加 op 可见
    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->BBcodes->addCustom(
                '[OP]{TEXT}[/Op]',
                '<onlyOpSee>{TEXT}</onlyOpSee>'
            );
        }),

    (new Extend\ApiSerializer(PostSerializer::class))
        ->attributes(ReplaceCode::class),
];
