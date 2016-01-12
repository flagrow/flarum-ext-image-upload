<?php 
/*
 * This file is part of image-upload.
 *
 * A package by Flagrow.
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

namespace Flagrow\ImageUpload\Listeners;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the license.md
* file that was distributed with this source code.
*/

use Flagrow\ImageUpload\Image;
use Flarum\Event\PostWasDeleted;
use Illuminate\Contracts\Events\Dispatcher;

class DeleteImage
{
    /**
     * Subscribe to the specific events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasDeleted::class, [$this, 'postWasDeleted']);
    }

    /**
     * Deletes any images that were listed for that post.
     *
     * @param PostWasDeleted $event
     */
    public function postWasDeleted(PostWasDeleted $event)
    {
        Image::where('post_id', $event->post->id)->delete();
    }
}
