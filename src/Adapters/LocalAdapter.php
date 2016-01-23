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

use Flagrow\ImageUpload\Contracts\UploadAdapterContract;
use Flarum\Settings\SettingsRepositoryInterface;
use League\Flysystem\FilesystemInterface;

class LocalAdapter implements UploadAdapterContract
{

    /**
     * @var FilesystemInterface
     */
    protected $filesystem;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * LocalAdapter constructor.
     *
     * @param FilesystemInterface         $filesystem
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(FilesystemInterface $filesystem, SettingsRepositoryInterface $settings)
    {
        $this->filesystem = $filesystem;
        $this->settings   = $settings;
    }

    /**
     * Uploads raw contents to the service.
     *
     * @param string $contents
     * @return array    The meta of the file.
     */
    public function uploadContents($name, $contents)
    {
        $this->filesystem->write($name, $contents);
        $meta        = $this->filesystem->getMetadata($name);
        $meta['url'] = '/assets/images/' . $name;

        if ($this->settings->get('flarum-settings') && !empty($this->settings->get('flarum-settings')->get('flagrow.image-upload.cdnUrl'))) {
            $meta['url'] = $this->settings->get('flarum-settings')->get('flagrow.image-upload.cdnUrl') . $meta['url'];
        }

        return $meta;
    }


    public function uploadFile($name, $file)
    {
        // TODO: Implement uploadFile() method.
    }

    /**
     * Delete a remote file based on a adapter identifier.
     *
     * @param string $name
     * @param string $file
     * @return bool
     */
    public function deleteFile($name, $file)
    {
        // TODO: Implement deleteFile() method.
    }
}