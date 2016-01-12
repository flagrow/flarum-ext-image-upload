<?php 
/*
 * This file is part of image-upload.
 *
 * A package by Flagrow.
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

namespace Flagrow\ImageUpload\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class ImageSerializer extends AbstractSerializer
{

    /**
     * @var string
     */
    protected $type = 'images';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param object|array $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return [
            'url' => $model->file_name,
            'post_id' => (int) $model->post_id,
        ];
    }
}
