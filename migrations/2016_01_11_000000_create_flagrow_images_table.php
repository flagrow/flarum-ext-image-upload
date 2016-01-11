<?php namespace Flagrow\ImageUpload\Migration;

/*
* This file is part of image-upload.
*
* (c) Flagrow
*
* For the full copyright and license information, please view the license.md
* file that was distributed with this source code.
*/

use Flarum\Database\AbstractMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateFlagrowImagesTable extends AbstractMigration
{

    /**
     * Run the migrations.
     *
     * @info Called when extension is enabled. Never runs twice.
     */
    public function up()
    {
        $this->schema->create('flagrow_images', function(Blueprint $table)
        {
            $table->increments('id');

            // the user who posted the image
            $table->integer('user_id')->unsigned()->nullable();

            // the specific post id this image is appearing in
            $table->integer('post_id')->unsigned();

            // file name of the image
            $table->string('file_name')->nullable();

            // the method this file was uploaded to, allows for future erasing on remote systems
            $table->string('upload_method');

            // adds created_at and updated_at
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');

            $table->unique('file_name');
            $table->index('file_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @info Called using the uninstall button in the admin.
     */
    public function down()
    {
        $this->schema->drop('flagrow_images');
    }
}