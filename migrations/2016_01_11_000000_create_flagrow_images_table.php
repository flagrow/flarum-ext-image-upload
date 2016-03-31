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

namespace flagrow\image\upload\Migration;

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;


return Migration::createTable(
    'flagrow_images',
    function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('post_id')->unsigned();
            $table->string('file_name')->nullable();
            $table->string('upload_method');
            $table->timestamp('created_at');
    }
);
