import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';
import SettingDropdown from 'flarum/components/SettingDropdown';


export default class ImageUploadSettingsModal extends SettingsModal {
    className() {
        return 'RemoteImageUploadSettingsModal Modal--small';
    }

    title() {
        return 'Image Upload Settings';
    }

    form() {
        return [
            SettingDropdown.component({
                label: 'Upload method',
                key: 'flagrow.image-upload.method',
                options: [
                    {value: 'imgur', label: 'Imgur'},
                    {value: 'local', label: 'Local'}
                ]
            })
        ];
    }

    // updateSettingsView() {
    //     var settingToShow = '#image-upload-' + $('#image-upload-method > select').val();
    //     console.log(settingToShow);
    //     $('.upload-method').hide("fast");
    //     $(settingToShow).show("fast");
    // }
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
