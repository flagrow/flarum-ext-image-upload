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

use Flagrow\ImageUpload\Traits\UrlAssignable;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Config;

class LocalAdapter extends Local
{
    use UrlAssignable;

    /**
     * {@inheritdoc}
     */
    public function write($path, $contents, Config $config)
    {
        $meta = parent::write($path, $contents, $config);

        if ($meta !== false) {
            $relative = str_replace(app()->publicPath(), null, $this->getPathPrefix());
            $url      = $relative . $path;
            if ($config->has('flarum-settings') && !empty($config->get('flarum-settings')->get('flagrow.image-upload.cdnUrl'))) {
                $url = $config->get('flarum-settings')->get('flagrow.image-upload.cdnUrl') . $url;
            }
            $this->assignUrl($url, $config);
        }

        return $meta;
    }

}