import { extend } from 'flarum/extend';
import app from 'flarum/app';

import RemoteImageUploadSettingsModal from 'flagrow/remote-image-upload/components/RemoteImageUploadSettingsModal';

app.initializers.add('flagrow-remote-image-upload', app => {
    app.extensionSettings['flagrow-remote-image-upload'] = () => app.modal.show(new RemoteImageUploadSettingsModal());

    // this selects imgur as endpoint.
    $('input:radio[name=endpoint]', '.RemoteImageUploadSettingsModal')
    .filter('[value="https://api.imgur.com/3/image"]')
    .prop('checked', true);
});
