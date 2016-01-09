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
            <div className="Form-group">
                <label>{app.translator.trans('flagrow-remote-image-upload.admin.image_resize')}
                    <input type="checkbox"
                    name="resize"
                    bidi={this.setting('flagrow.remote-image-upload.must_resize')} />
                </label>
                <label>{app.translator.trans('flagrow-remote-image-upload.admin.max_width')}</label>
                <input className="FormControl" bidi={this.setting('flagrow.remote-image-upload.max_width')} />
                <label>{app.translator.trans('flagrow-remote-image-upload.admin.max_height')}</label>
                <input className="FormControl" bidi={this.setting('flagrow.remote-image-upload.max_height')} />
            </div>,
            <input type="radio"
            name="endpoint"
            bidi={this.setting('flagrow.remote-image-upload.endpoint')}
            value="https://api.imgur.com/3/image" hidden />
        ];
    }
}
