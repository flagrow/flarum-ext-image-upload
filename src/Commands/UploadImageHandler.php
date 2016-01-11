<?php namespace Flagrow\ImageUpload\Commands;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the license.md
* file that was distributed with this source code.
*/

use Carbon\Carbon;
use Flagrow\ImageUpload\Events\ImageWillBeSaved;
use Flagrow\ImageUpload\Image;
use Flagrow\ImageUpload\Validators\ImageValidator;
use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Core\Repository\PostRepository;
use Flarum\Core\Repository\UserRepository;
use Flarum\Core\Support\DispatchEventsTrait;
use Flarum\Foundation\Application;
use Illuminate\Events\Dispatcher;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use League\Flysystem\FilesystemInterface;

class UploadImageHandler
{
    use DispatchEventsTrait;
    use AssertPermissionTrait;

    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @var FilesystemInterface
     */
    protected $uploadDir;

    /**
     * @var Application
     */
    protected $app;

    /**
     * @var AvatarValidator
     */
    protected $validator;

    /**
     * @param Dispatcher     $events
     * @param UserRepository $users
     * @param PostRepository $posts
     * @param Application    $app
     * @param ImageValidator $validator
     */
    public function __construct(
        Dispatcher $events,
        UserRepository $users,
        PostRepository $posts,
        Application $app,
        ImageValidator $validator
    ) {
        $this->events    = $events;
        $this->users     = $users;
        $this->posts     = $posts;
        $this->app       = $app;
        $this->validator = $validator;

        /** @var Filesystem uploadDir */
        $this->uploadDir = new Filesystem(new Local(public_path('assets/images')));
    }

    /**
     * Handles the command execution.
     *
     * @param UploadImage $command
     * @return null|string
     */
    public function handle(UploadImage $command)
    {
        if ($command->postId) {
            // load the Post for this image
            $post = $this->posts->findOrFail($command->postId, $command->actor);
        } else {
            $post = null;
        }
        // todo check rights
        // todo validate file

        $image                = new Image();
        $image->user_id       = $command->actor->id;
        $image->upload_method = 'local';
        if ($post) {
            $image->post_id = $post->id;
        }

        $this->events->fire(
            new ImageWillBeSaved($post, $command->actor, $image, $command->file)
        );

        $file_name = sprintf('%d-%d-%s.jpg', $post ? $post->id : 0, $command->actor->id, str_random());

        if (!$this->uploadDir->write($file_name, $command->file)) {
            // todo should throw error
            return null;
        }

        $image->file_name = sprintf('%s/assets/images/%s', $this->app->url(), $file_name);
        $image->created_at = Carbon::now();

        $image->save();

        return $image;
    }
}