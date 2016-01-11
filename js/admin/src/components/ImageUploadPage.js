import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Alert from 'flarum/components/Alert';
import FieldSet from 'flarum/components/FieldSet';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';

export default class ImageUploadPage extends Component {

    init() {
        // wheter we are saving the settings or not right now
        this.loading = false;

        // the fields we need to watch and to save
        this.fields = [
            'upload_method',
            'imgur_client_id',
            'resize_max_width',
            'resize_max_height'
        ];

        // the checkboxes we need to watch and to save.
        this.checkboxes = [
            'must_resize'
        ];

        // options for the dropdown menu
        this.uploadMethodOptions = {
            'local': app.translator.trans('flagrow-image-upload.admin.upload_methods.local'),
            'imgur': app.translator.trans('flagrow-image-upload.admin.upload_methods.imgur')
        };

        this.values = {};

        // our package prefix (to be added to every field and checkbox in the setting table)
        this.settingsPrefix = 'flagrow.image-upload';

        // bind the values of the fileds anc checkboxes to the getter/setter functions
        const settings = app.settings;
        this.fields.forEach(key => this.values[key] = m.prop(settings[this.addPrefix(key)]));
        this.checkboxes.forEach(key => this.values[key] = m.prop(settings[this.addPrefix(key)] === '1'));
    }

    /**
    * Show the actual ImageUploadPage.
    *
    * @returns {*}
    */
    view() {
        return [
            m('div', {className: 'ImageUploadPage'}, [
                m('div', {className: 'container'}, [
                    m('form', {onsubmit: this.onsubmit.bind(this)}, [
                        FieldSet.component({
                            label: app.translator.trans('flagrow-image-upload.admin.labels.upload_method'),
                            children: [
                                m('div', {className: 'helpText'}, app.translator.trans('flagrow-image-upload.admin.help_texts.upload_method')),
                                Select.component({
                                    options: this.uploadMethodOptions,
                                    onchange: this.values.upload_method,
                                    value: this.values.upload_method() || 'local'
                                })
                            ]
                        }),
                        m('div', {className: 'ImageUploadPage-resize'}, [
                            FieldSet.component({
                                label: app.translator.trans('flagrow-image-upload.admin.labels.resize.title'),
                                children: [
                                    m('div', {className: 'helpText'}, app.translator.trans('flagrow-image-upload.admin.help_texts.resize')),
                                    Switch.component({
                                        state: this.values.must_resize() || false,
                                        children: app.translator.trans('flagrow-image-upload.admin.labels.resize.toggle'),
                                        onchange: this.values.must_resize
                                    }),
                                    m('label', {}, app.translator.trans('flagrow-image-upload.admin.labels.resize.max_width')),
                                    m('input', {
                                        className: 'FormControl',
                                        value: this.values.resize_max_width() || '',
                                        oninput: m.withAttr('value', this.values.resize_max_width),
                                        disabled: !this.values.must_resize()
                                    }),
                                    m('label', {}, app.translator.trans('flagrow-image-upload.admin.labels.resize.max_height')),
                                    m('input', {
                                        className: 'FormControl',
                                        value: this.values.resize_max_height() || '',
                                        oninput: m.withAttr('value', this.values.resize_max_height),
                                        disabled: !this.values.must_resize()
                                    })
                                ]
                            })

                        ]),
                        m('div', {className: 'ImageUploadPage-imgur', style: {display: (this.values.upload_method() === 'imgur' ? "block" : "none")}}, [
                            FieldSet.component({
                                label: app.translator.trans('flagrow-image-upload.admin.labels.imgur.title'),
                                children: [
                                    m('label', {}, app.translator.trans('flagrow-image-upload.admin.labels.imgur.client_id')),
                                    m('input', {
                                        className: 'FormControl',
                                        value: this.values.imgur_client_id() || '',
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
                            children: app.translator.trans('flagrow-image-upload.admin.buttons.save'),
                            loading: this.loading,
                            disabled: !this.changed()
                        }),
                    ])
                ])
            ])
        ];
    }

    /**
    * Checks if the values of the fields and checkboxes are different from
    * the ones stored in the database
    *
    * @returns bool
    */
    changed() {
        var fieldsCheck = this.fields.some(key => this.values[key]() !== app.settings[this.addPrefix(key)]);
        var checkboxesCheck = this.checkboxes.some(key => this.values[key]() !== (app.settings[this.addPrefix(key)] == '1'));
        return fieldsCheck || checkboxesCheck;
    }

    /**
    * Saves the settings to the database and redraw the page
    *
    * @param e
    */
    onsubmit(e) {
        // prevent the usual form submit behaviour
        e.preventDefault();

        // if the page is already saving, do nothing
        if (this.loading) return;

        // prevents multiple savings
        this.loading = true;
        app.alerts.dismiss(this.successAlert);

        const settings = {};

        // gets all the svalues from the form
        this.fields.forEach(key => settings[this.addPrefix(key)] = this.values[key]());
        this.checkboxes.forEach(key => settings[this.addPrefix(key)] = this.values[key]());

        // actually saves everything in the database
        saveSettings(settings)
        .then(() => {
            // on succes, show an alert
            app.alerts.show(this.successAlert = new Alert({type: 'success', children: app.translator.trans('core.admin.basics.saved_message')}));
        })
        .finally(() => {
            // return to the initial state and redraw the page
            this.loading = false;
            m.redraw();
        });
    }

    /**
    * Adds the prefix `this.settingsPrefix` at the beginning of `key`
    *
    * @returns string
    */
    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}
