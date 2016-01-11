<?php namespace Flagrow\ImageUpload\Commands;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the license.md
* file that was distributed with this source code.
*/

use Flagrow\ImageUpload\Validators\ImageValidator;
use Flarum\Core\Repository\UserRepository;
use Flarum\Foundation\Application;
use Illuminate\Events\Dispatcher;
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
     * @param Dispatcher $events
     * @param UserRepository $users
     * @param FilesystemInterface $uploadDir
     * @param Application $app
     * @param ImageValidator $validator
     */
    public function __construct(Dispatcher $events, UserRepository $users, FilesystemInterface $uploadDir, Application $app, ImageValidator $validator)
    {
        $this->events = $events;
        $this->users = $users;
        $this->uploadDir = $uploadDir;
        $this->app = $app;
        $this->validator = $validator;
    }

}