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
  // this is the prefix we use in the settings table in the database
  protected $packagePrefix = 'flagrow.image-upload.';
  // those are the fields we need to get from the database
  protected $fieldsToGet = array(
      'upload_method',
      'imgur_client_id',
      'must_resize',
      'resize_max_width',
      'resize_max_height'
  );

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
        foreach ($this->fieldsToGet as $field) {
            $event->attributes[$this->packagePrefix . $field] = $this->settings->get($this->packagePrefix . $field);
        }
    }
  }
}
