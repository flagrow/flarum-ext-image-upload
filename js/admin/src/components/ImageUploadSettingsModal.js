import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class ImageUploadSettingsModal extends SettingsModal {
    className() {
        return 'RemoteImageUploadSettingsModal Modal--small';
    }

    title() {
        return 'Image Upload Settings';
    }

    form() {
        return [
            <div className="Form-group" id="image-upload-method">
                <label>Upload method</label>
                <select className="FormControl"
                    bidi={this.setting('flagrow.image-upload.method')}
                    onChange={this.updateSettingsView()} >
                    <option value="local">Local</option>
                    <option value="imgur">Imgur</option>
                </select>
            </div>,
            <div className="Form-group upload-method" id="image-upload-imgur">
                <label>Imgur Client-ID</label>
                <input className="FormControl" bidi={this.setting('flagrow.image-upload.client_id')} />
            </div>
        ];
    }

    updateSettingsView() {
        var settingToShow = '#image-upload-' + $('#image-upload-method > select').val();
        console.log(settingToShow);
        $('.upload-method').hide("fast");
        $(settingToShow).show("fast");
    }
}

//     m('div', {className: 'Form-group', id: 'image-upload-method'}, [
//         m('label', 'Upload method'),
//         m('select', {className: 'FormControl', bidi: this.setting('flagrow.image-upload.method')}, [
//             m('option', {value: 'local'}, 'Local'),
//             m('option', {value: 'imgur'}, 'Imgur')
//         ])
//     ]),
//     m('section', {id: 'imgur', style: {display: 'none'}}, [
//         m('div', {className: 'Form-group'}, [
//             m('label', 'Imgur Client-ID'),
//             m('input', {className: 'FormControl', bidi: this.setting('flagrow.image-upload.client_id')})
//         ]),
//         m('div', {className: 'Form-group'}, [
//             Switch.component({
//                 state: this.setting('flagrow.image-upload.must_resize'),
//                 children: app.translator.trans('flagrow-image-upload.admin.image_resize'),
//                 onchange: this.setting('flagrow.image-upload.must_resize')
//             })
//         ])
//     ]),
// ];
// <div className="Form-group">
//     <label>{app.translator.trans('flagrow-image-upload.admin.image_resize')}
//         <input type="checkbox"
//         name="resize"
//         bidi={this.setting('flagrow.image-upload.must_resize')} />
//     </label>
//     <label>{app.translator.trans('flagrow-image-upload.admin.max_width')}</label>
//     <input className="FormControl" bidi={this.setting('flagrow.image-upload.max_width')} />
//     <label>{app.translator.trans('flagrow-image-upload.admin.max_height')}</label>
//     <input className="FormControl" bidi={this.setting('flagrow.image-upload.max_height')} />
// </div>,
// <input type="radio"
// name="endpoint"
// bidi={this.setting('flagrow.image-upload.endpoint')}
// value="https://api.imgur.com/3/image" hidden />
