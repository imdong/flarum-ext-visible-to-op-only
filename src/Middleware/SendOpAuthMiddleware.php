<?php

namespace ImDong\FlarumExtVisibleToOpOnly\Middleware;

use Flarum\Locale\Translator;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use ImDong\FlarumExtVisibleToOpOnly\Common\Defined;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Illuminate\Support\Arr;

class SendOpAuthMiddleware implements MiddlewareInterface
{
    private $settings;
    private $translator;

    public function __construct(Translator $translator, SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->translator = $translator;
    }


    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $currentRoute = $request->getUri()->getPath();

        foreach (['/discussions', '/posts'] as $val) {
            if (strpos($currentRoute, $val) !== false) {
                if (!$actor->can(Defined::$extPrefix . 'viewButton')) {
                    $content = Arr::get($request->getParsedBody(), 'data.attributes.content');
                    $data = $request->getParsedBody();
                    $data['data']['attributes']['content'] = str_replace('[/OP]', '', str_replace('[OP]', '', $content));
                    $request = $request->withParsedBody($data);
                }
            }
        }

        return $handler->handle($request);
    }
}
