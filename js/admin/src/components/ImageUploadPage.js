import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Alert from 'flarum/components/Alert';
import FieldSet from 'flarum/components/FieldSet';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';

export default class ImageUploadPage extends Component {

    init() {
        this.loading = false;

        this.fields = [
            'upload_method',
            'imgur_client_id'
        ];
        this.checkboxes = [
            'must_resize'
        ];
        this.uploadMethodOptions = {
            'local': 'Local',
            'imgur': 'Imgur'
        };

        this.values = {};
        this.settingsPrefix = 'flagrow.image-upload';
        const settings = app.settings;
        this.fields.forEach(key => this.values[key] = m.prop(settings[this.addPrefix(key)]));
        this.checkboxes.forEach(key => this.values[key] = m.prop(settings[this.addPrefix(key)] === '1'));
    }

    view() {
        return [
            m('div', {className: 'ImageUploadPage'}, [
                m('div', {className: 'container'}, [
                    m('form', {onsubmit: this.onsubmit.bind(this)}, [
                        FieldSet.component({
                            label: 'Upload method',
                            children: [
                                Select.component({
                                    options: this.uploadMethodOptions,
                                    onchange: this.values.upload_method,
                                    value: this.values.upload_method()
                                })
                            ]
                        }),
                        m('div', {className: 'ImageUploadPage-resize'}, [
                            Switch.component({
                                state: this.values.must_resize(),
                                children: 'resize image before upload',
                                onchange: this.values.must_resize
                            })
                        ]),
                        m('div', {className: 'ImageUploadPage-imgur', style: {display: (this.values.upload_method() === 'imgur' ? "block" : "none")}}, [
                            FieldSet.component({
                                label: 'Imgur settings',
                                children: [
                                    m('label', {}, 'Imgur Client-ID'),
                                    m('input', {
                                        className: 'FormControl',
                                        value: this.values.imgur_client_id(),
                                        oninput: m.withAttr('value', this.values.imgur_client_id)
                                    })
                                ]
                            })
                        ]),
                        m('div', {style: {display: (this.values.upload_method() === 'local' ? "block" : "none")}}, [
                            'This is local setting'
                        ]),
                        Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: 'Save settings',
                            loading: this.loading,
                            disabled: !this.changed()
                        }),
                    ])
                ])
            ])
        ];
    }

    changed() {
        var fieldsCheck = this.fields.some(key => this.values[key]() !== app.settings[this.addPrefix(key)]);
        var checkboxesCheck = this.checkboxes.some(key => this.values[key]() !== (app.settings[this.addPrefix(key)] == '1'));
        console.log('this is in the settings: ' + app.settings[this.addPrefix('must_resize')]);
        console.log('this is in the checkbox: ' + this.values.must_resize());
        console.log('this is checkboxesCheck: ' + checkboxesCheck);
        return fieldsCheck || checkboxesCheck;
    }

    onsubmit(e) {
        e.preventDefault();

        if (this.loading) return;

        this.loading = true;
        app.alerts.dismiss(this.successAlert);

        const settings = {};

        this.fields.forEach(key => settings[this.addPrefix(key)] = this.values[key]());
        this.checkboxes.forEach(key => settings[this.addPrefix(key)] = this.values[key]());

        saveSettings(settings)
        .then(() => {
            app.alerts.show(this.successAlert = new Alert({type: 'success', children: app.translator.trans('core.admin.basics.saved_message')}));
        })
        .finally(() => {
            this.loading = false;
            m.redraw();
        });
    }

    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}
