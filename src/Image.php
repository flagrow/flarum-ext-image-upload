<?php namespace Flagrow\ImageUpload;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the license.md
* file that was distributed with this source code.
*/

use Flarum\Database\AbstractModel;

class Image extends AbstractModel
{
    /**
     * The database table entries of this model are stored in.
     *
     * @var string
     */
    protected $table = 'flagrow_images';
}