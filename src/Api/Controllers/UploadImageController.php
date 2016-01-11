<?php namespace Flagrow\ImageUpload\Api\Controllers;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the license.md
* file that was distributed with this source code.
*/

use Flagrow\ImageUpload\Api\Serializers\ImageSerializer;
use Flarum\Api\Controller\AbstractResourceController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UploadImageController extends AbstractResourceController
{

    /**
     * The serializer instance for this request.
     *
     * @var ImageSerializer
     */
    public $serializer = ImageSerializer::class;


    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document               $document
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $postId = array_get($request->getQueryParams(), 'post');
        $actor = $request->getAttribute('actor');
        $file = array_get($request->getUploadedFiles(), 'image');

        return $this->bus->dispatch(
            new UploadAvatar($postId, $file, $actor)
        );
    }
}