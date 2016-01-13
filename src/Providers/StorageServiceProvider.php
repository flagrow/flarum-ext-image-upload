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

use Illuminate\Contracts\Container\Container;
use Illuminate\Support\ServiceProvider;
use Flagrow\ImageUpload\Commands\UploadImageHandler;
use League\Flysystem\FilesystemInterface;
use Illuminate\Contracts\Filesystem\Factory;

class StorageServiceProvider extends ServiceProvider {

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        if($this->app->config('flagrow.image-upload.uploadMethod', 'local') == 'local') {
            $imagesFileSystem = function(Container $app) {
                return $app->make('filesystem')->createLocalDriver([
                    'root' => public_path('assets/images')
                ]);
            };
        }

        $this->app->when(UploadImageHandler::class)
            ->needs(FileSystemInterface::class)
            ->give($imagesFileSystem);
    }
}