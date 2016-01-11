import { extend } from 'flarum/extend';
import app from 'flarum/app';

import addImageUploadPane from 'flagrow/image-upload/addImageUploadPane'

app.initializers.add('flagrow-image-upload', app => {
    addImageUploadPane();
});
