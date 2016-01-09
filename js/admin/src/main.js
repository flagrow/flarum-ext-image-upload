import { extend } from 'flarum/extend';
import app from 'flarum/app';

import ImageUploadSettingsModal from 'flagrow/image-upload/components/ImageUploadSettingsModal';

app.initializers.add('flagrow-image-upload', app => {
    app.extensionSettings['flagrow-image-upload'] = () => app.modal.show(new ImageUploadSettingsModal());

    // this selects imgur as endpoint.
    $('input:radio[name=endpoint]', '.ImageUploadSettingsModal')
        .filter('[value="https://api.imgur.com/3/image"]')
        .prop('checked', true);
});
