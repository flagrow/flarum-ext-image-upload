<?php

namespace Flagrow\RemoteImageUpload\Listeners;

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addForumAssets']);
        $events->listen(ConfigureClientView::class, [$this, 'addAdminAssets']);
    }

    /**
     * Modifies the client view for the Forum.
     *
     * @param ConfigureClientView $event
     */
    public function addForumAssets(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $event->addAssets([
                __DIR__ . '/../../less/forum/upload.less',
                __DIR__ . '/../../js/forum/dist/extension.js'
            ]);
            $event->addBootstrapper('flagrow/remote-image-upload/main');
        }
    }

    /**
     * Modifies the client view for the Admin.
     *
     * @param ConfigureClientView $event
     */
    public function addAdminAssets(ConfigureClientView $event)
    {
        if ($event->isAdmin()) {

        }
    }
}