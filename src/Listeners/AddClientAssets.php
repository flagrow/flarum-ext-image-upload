<?php

namespace Flagrow\RemoteImageUpload\Listeners;

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets {

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events) {
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
        if($event->isForum())
        {

        }
    }

    /**
     * Modifies the client view for the Admin.
     *
     * @param ConfigureClientView $event
     */
    public function addAdminAssets(ConfigureClientView $event)
    {
        if($event->isAdmin())
        {

        }
    }
}