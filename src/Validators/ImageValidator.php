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

namespace Flagrow\ImageUpload\Validators;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the license.md
* file that was distributed with this source code.
*/


use Flarum\Core\Validator\AbstractValidator;

class ImageValidator extends AbstractValidator
{
    /**
     * @var array
     *
     * @todo move to getRules method to allow dynamic size based on admin settings
     */
    protected $rules = [
        'image' => [
            'required',
            'image',
            'max:1024'
        ]
    ];
}
