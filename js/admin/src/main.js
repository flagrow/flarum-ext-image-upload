import { extend } from 'flarum/extend';
import app from 'flarum/app';
import saveSettings from 'flarum/utils/saveSettings';


import addImageUploadPane from 'flagrow/image-upload/addImageUploadPane'

app.initializers.add('flagrow-image-upload', app => {
    // checks if the upload_method is already set in the database. If not, set to Local
    const settings = app.settings;
    if (typeof settings['flagrow.image-upload.upload_method'] === 'undefined') {
        console.log('undefined!');
        settings['flagrow.image-upload.upload_method'] = 'local';
        saveSettings(settings);
    }
    addImageUploadPane();
});
