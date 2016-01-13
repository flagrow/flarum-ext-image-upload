<?php
/*
 * This file is part of flagrow/flarum-ext-image-upload.
 *
 * Copyright (c) Flagrow.
 *
 * http://flagrow.github.io
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

namespace Flagrow\ImageUpload\Providers;

use Flagrow\ImageUpload\Adapters\ImgurAdapter;
use Illuminate\Container\Container;
use Illuminate\Support\ServiceProvider;
use Flagrow\ImageUpload\Commands\UploadImageHandler;
use League\Flysystem\Filesystem;
use League\Flysystem\FilesystemInterface;

class StorageServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $filesystem = function (Container $app) {
            return $this->instantiateUploadAdapter($app);
        };

        $this->app->when(UploadImageHandler::class)
            ->needs(FileSystemInterface::class)
            ->give($filesystem);
    }

    /**
     * Sets the upload adapter for the specific preferred service.
     *
     * @param $app
     * @return FilesystemInterface
     */
    protected function instantiateUploadAdapter($app)
    {

        switch ($app->make('flarum.settings')->get('flagrow.image-upload.uploadMethod', 'local')) {
            case 'imgur':
                $app->make('config')->set('filesystems.disks.imgur', ['driver' => 'imgur']);
                return $app->make('filesystem')
                    ->extend('imgur', function ($app, $config) {
                        return new Filesystem(new ImgurAdapter($app->make('flarum.settings')->get('flagrow.image-upload.imgurClientId')));
                    })
                    ->disk('imgur')->getDriver();
                break;
            default:
                return $app->make('filesystem')->createLocalDriver([
                    'root' => public_path('assets/images')
                ])->getDriver();

        }
    }
}