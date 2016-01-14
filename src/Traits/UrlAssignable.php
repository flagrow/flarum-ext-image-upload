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

namespace Flagrow\ImageUpload\Traits;

use League\Flysystem\Config;

trait UrlAssignable {
    protected function assignUrl($url, Config $config)
    {
        if($config->has('flagrow-image')) {
            $image = $config->get('flagrow-image');
            $image->file_url = $url;
            $image->save();
        }
    }
}