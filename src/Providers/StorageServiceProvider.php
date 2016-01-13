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
            return $this->loadUploadSystem($app);
        };

        $this->app->when(UploadImageHandler::class)
            ->needs(FileSystemInterface::class)
            ->give($filesystem);
    }

    /**
     * @param $app
     * @return mixed
     */
    protected function loadUploadSystem($app)
    {
        switch ($app->make('flarum.settings')->get('flagrow.image-upload.uploadMethod', 'local')) {
            case 'imgur':
                return $app->make('filesystem')
                    ->extend('imgur', function ($app, $config) {
                        return new Filesystem(new ImgurAdapter($app->make('flarum.settings')->get('flagrow.image-upload.imgurClientId')));
                    })
                    ->callCustomCreator([
                        'driver' => 'imgur'
                    ]);
                break;
            default:
                return $app->make('filesystem')->createLocalDriver([
                    'root' => public_path('assets/images')
                ])->getDriver();

        }
    }
}