import SettingsModal from 'flarum/components/SettingsModal';

export default class RemoteImageUploadSettingsModal extends SettingsModal {
    className() {
        return 'RemoteImageUploadSettingsModal Modal--small';
    }

    title() {
        return 'Remote Image Upload Settings';
    }

    form() {
        return [
            <div className="Form-group">
                <label>Imgur Client-ID</label>
                <input className="FormControl" bidi={this.setting('flagrow.remote-image-upload.client_id')} />
            </div>,
            <input type="radio"
            name="endpoint"
            bidi={this.setting('flagrow.remote-image-upload.endpoint')}
            value="https://api.imgur.com/3/image" hidden />
        ];
    }
}
