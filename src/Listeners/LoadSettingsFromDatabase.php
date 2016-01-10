<?php namespace Flagrow\ImageUpload\Listeners;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;

class LoadSettingsFromDatabase {
  protected $settings;

  /**
  * Gets the settings variable. Called on Object creation.
  *
  * @param SettingsRepositoryInterface $settings
  */
  public function __construct(SettingsRepositoryInterface $settings) {
    $this->settings = $settings;
  }

  /**
  * Subscribes to the Flarum events.
  *
  * @param Dispatcher $events
  */
  public function subscribe(Dispatcher $events) {
    $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
  }
  /**
  * Get the setting values from the database and make them available
  * in the forum.
  *
  * @param PrepareApiAttributes $event
  */
  public function prepareApiAttributes(PrepareApiAttributes $event) {
    if ($event->isSerializer(ForumSerializer::class)) {
      $event->attributes['flagrow.image-upload.endpoint'] = $this->settings->get('flagrow.image-upload.endpoint');
      $event->attributes['flagrow.image-upload.imgur_client_id'] = $this->settings->get('flagrow.image-upload.imgur_client_id');
      $event->attributes['flagrow.image-upload.max_width'] = $this->settings->get('flagrow.image-upload.max_width');
      $event->attributes['flagrow.image-upload.max_height'] = $this->settings->get('flagrow.image-upload.max_height');
      $event->attributes['flagrow.image-upload.must_resize'] = $this->settings->get('flagrow.image-upload.must_resize');
    }
  }
}
