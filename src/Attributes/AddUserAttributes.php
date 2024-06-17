<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Attributes;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\User\User;
use ImDong\FlarumExtVisibleToOpOnly\Common\Defined;

class AddUserAttributes
{
    public function __invoke(BasicUserSerializer $serializer, User $user) {

        $attributes = [];

        if ($serializer->getActor()->can(Defined::$extPrefix . 'viewButton', $user)) {
            $attributes['canVisibleToOpPermissionsViewButton'] = true;
        }

        return $attributes;
    }
}
