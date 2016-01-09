import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class ImageUploadSettingsModal extends SettingsModal {
    className() {
        return 'RemoteImageUploadSettingsModal Modal--small';
    }

    title() {
        return 'Remote Image Upload Settings';
    }

    form() {
        return [
            m('div', {className: 'Form-group'}, [
                m('label', 'Upload method'),
                m('select', {className: 'FormControl', bidi: this.setting('flagrow.image-upload.method'), onchange: this.setMethod.bind(this)}, [
                    m('option', {value: 'local'}, 'Local'),
                    m('option', {value: 'imgur'}, 'Imgur')
                ])
            ]),
            m('section', {id: 'imgur', style: {display: 'none'}}, [
                m('div', {className: 'Form-group'}, [
                    m('label', 'Imgur Client-ID'),
                    m('input', {className: 'FormControl', bidi: this.setting('flagrow.image-upload.client_id')})
                ]),
                m('div', {className: 'Form-group'}, [
                    Switch.component({
                        state: this.setting('flagrow.image-upload.must_resize'),
                        children: app.translator.trans('flagrow-image-upload.admin.image_resize'),
                        onchange: this.setting('flagrow.image-upload.must_resize')
                    })
                ])
            ]),
        ];
/*            <div className="Form-group">
                <label>{app.translator.trans('flagrow-image-upload.admin.image_resize')}
                    <input type="checkbox"
                    name="resize"
                    bidi={this.setting('flagrow.image-upload.must_resize')} />
                </label>
                <label>{app.translator.trans('flagrow-image-upload.admin.max_width')}</label>
                <input className="FormControl" bidi={this.setting('flagrow.image-upload.max_width')} />
                <label>{app.translator.trans('flagrow-image-upload.admin.max_height')}</label>
                <input className="FormControl" bidi={this.setting('flagrow.image-upload.max_height')} />
            </div>,
            <input type="radio"
            name="endpoint"
            bidi={this.setting('flagrow.image-upload.endpoint')}
            value="https://api.imgur.com/3/image" hidden />
        ];*/
    }

    setMethod() {
        console.log(this.setting('flagrow.image-upload.method'));
        $('section#' + this.setting('flagrow.image-upload.method')).show();
    }
}
