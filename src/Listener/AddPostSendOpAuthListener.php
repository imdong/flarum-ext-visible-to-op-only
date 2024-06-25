<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Listener;


use Flarum\Post\Event\Posted;
use ImDong\FlarumExtVisibleToOpOnly\Common\Defined;

class AddPostSendOpAuthListener
{

    public function handle(Posted $event) {
        $post = $event->post;

        if ($event->actor->cannot(Defined::$extPrefix . '.viewButton', $post->discussion)) {
            $post->afterSave(function ($post) {
                $content = $post->content;
                $post->content = str_replace(['[op]', '[/op]', '[OP]', '[/OP]', '<OP>', '</OP>'], '', $content);
                $post->save();
            });
        }
    }

}
