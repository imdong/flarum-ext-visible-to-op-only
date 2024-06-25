<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Listener;


use Flarum\Post\Event\Saving;
use ImDong\FlarumExtVisibleToOpOnly\Common\Defined;

class EditPostSendOpAuthListener
{

    public function handle(Saving $event) {
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
