import { extend } from 'flarum/extend';
import app from 'flarum/app';

//import ImageUploadSettingsModal from 'flagrow/image-upload/components/ImageUploadSettingsModal';
import addImageUploadPane from 'flagrow/image-upload/addImageUploadPane'

app.initializers.add('flagrow-image-upload', app => {
    addImageUploadPane();
});
