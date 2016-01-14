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

namespace Flagrow\ImageUpload\Adapters;

use League\Flysystem\Adapter\Local;
use League\Flysystem\Config;

class LocalAdapter extends Local
{
    public function write($path, $contents, Config $config)
    {
        $meta = parent::write($path, $contents, $config);

        if($meta !== false && $config->has('image')) {
            $relative = str_replace(app()->publicPath(), null, $this->getPathPrefix());
            $image = $config->get('image');
            $image->file_url = $relative . $path;
            // take CDN url into account if set
            if($config->has('settings') && !empty($config->get('settings')->get('flagrow.image-upload.cdnUrl'))) {
                $image->file_url = $config->get('settings')->get('flagrow.image-upload.cdnUrl') . $image->file_url;
            }
            $image->save();
        }

        return $meta;
    }

}