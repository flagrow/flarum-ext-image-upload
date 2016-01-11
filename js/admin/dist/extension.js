System.register('flagrow/image-upload/addImageUploadPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'flagrow/image-upload/components/ImageUploadPage'], function (_export) {
    'use strict';

    var extend, AdminNav, AdminLinkButton, ImageUploadPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav['default'];
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
        }, function (_flagrowImageUploadComponentsImageUploadPage) {
            ImageUploadPage = _flagrowImageUploadComponentsImageUploadPage['default'];
        }],
        execute: function () {
            _export('default', function () {
                app.routes['image-upload'] = { path: '/image-upload', component: ImageUploadPage.component() };

                app.extensionSettings['flagrow-image-upload'] = function () {
                    return m.route(app.route('image-upload'));
                };

                extend(AdminNav.prototype, 'items', function (items) {
                    // add the Image Upload tab to the admin navigation menu
                    items.add('image-upload', AdminLinkButton.component({
                        href: app.route('image-upload'),
                        icon: 'picture-o',
                        children: 'Image Upload',
                        description: app.translator.trans('flagrow-image-upload.admin.help_texts.description')
                    }));
                });
            });
        }
    };
});;
System.register('flagrow/image-upload/components/ImageUploadPage', ['flarum/Component', 'flarum/components/Button', 'flarum/utils/saveSettings', 'flarum/components/Alert', 'flarum/components/FieldSet', 'flarum/components/Select', 'flarum/components/Switch'], function (_export) {
    'use strict';

    var Component, Button, saveSettings, Alert, FieldSet, Select, Switch, ImageUploadPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings['default'];
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert['default'];
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet['default'];
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect['default'];
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch['default'];
        }],
        execute: function () {
            ImageUploadPage = (function (_Component) {
                babelHelpers.inherits(ImageUploadPage, _Component);

                function ImageUploadPage() {
                    babelHelpers.classCallCheck(this, ImageUploadPage);
                    babelHelpers.get(Object.getPrototypeOf(ImageUploadPage.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(ImageUploadPage, [{
                    key: 'init',
                    value: function init() {
                        var _this = this;

                        // whether we are saving the settings or not right now
                        this.loading = false;

                        // the fields we need to watch and to save
                        this.fields = ['upload_method', 'imgur_client_id', 'resize_max_width', 'resize_max_height'];

                        // the checkboxes we need to watch and to save.
                        this.checkboxes = ['must_resize'];

                        // options for the dropdown menu
                        this.uploadMethodOptions = {
                            'local': app.translator.trans('flagrow-image-upload.admin.upload_methods.local'),
                            'imgur': app.translator.trans('flagrow-image-upload.admin.upload_methods.imgur')
                        };

                        this.values = {};

                        // our package prefix (to be added to every field and checkbox in the setting table)
                        this.settingsPrefix = 'flagrow.image-upload';

                        // bind the values of the fileds anc checkboxes to the getter/setter functions
                        var settings = app.settings;
                        this.fields.forEach(function (key) {
                            return _this.values[key] = m.prop(settings[_this.addPrefix(key)]);
                        });
                        this.checkboxes.forEach(function (key) {
                            return _this.values[key] = m.prop(settings[_this.addPrefix(key)] === '1');
                        });
                    }

                    /**
                    * Show the actual ImageUploadPage.
                    *
                    * @returns {*}
                    */
                }, {
                    key: 'view',
                    value: function view() {
                        return [m('div', { className: 'ImageUploadPage' }, [m('div', { className: 'container' }, [m('form', { onsubmit: this.onsubmit.bind(this) }, [FieldSet.component({
                            label: app.translator.trans('flagrow-image-upload.admin.labels.upload_method'),
                            children: [m('div', { className: 'helpText' }, app.translator.trans('flagrow-image-upload.admin.help_texts.upload_method')), Select.component({
                                options: this.uploadMethodOptions,
                                onchange: this.values.upload_method,
                                value: this.values.upload_method() || 'local'
                            })]
                        }), m('div', { className: 'ImageUploadPage-resize' }, [FieldSet.component({
                            label: app.translator.trans('flagrow-image-upload.admin.labels.resize.title'),
                            children: [m('div', { className: 'helpText' }, app.translator.trans('flagrow-image-upload.admin.help_texts.resize')), Switch.component({
                                state: this.values.must_resize() || false,
                                children: app.translator.trans('flagrow-image-upload.admin.labels.resize.toggle'),
                                onchange: this.values.must_resize
                            }), m('label', {}, app.translator.trans('flagrow-image-upload.admin.labels.resize.max_width')), m('input', {
                                className: 'FormControl',
                                value: this.values.resize_max_width() || '',
                                oninput: m.withAttr('value', this.values.resize_max_width),
                                disabled: !this.values.must_resize()
                            }), m('label', {}, app.translator.trans('flagrow-image-upload.admin.labels.resize.max_height')), m('input', {
                                className: 'FormControl',
                                value: this.values.resize_max_height() || '',
                                oninput: m.withAttr('value', this.values.resize_max_height),
                                disabled: !this.values.must_resize()
                            })]
                        })]), m('div', { className: 'ImageUploadPage-imgur', style: { display: this.values.upload_method() === 'imgur' ? "block" : "none" } }, [FieldSet.component({
                            label: app.translator.trans('flagrow-image-upload.admin.labels.imgur.title'),
                            children: [m('label', {}, app.translator.trans('flagrow-image-upload.admin.labels.imgur.client_id')), m('input', {
                                className: 'FormControl',
                                value: this.values.imgur_client_id() || '',
                                oninput: m.withAttr('value', this.values.imgur_client_id)
                            })]
                        })]), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-image-upload.admin.buttons.save'),
                            loading: this.loading,
                            disabled: !this.changed()
                        })])])])];
                    }

                    /**
                    * Checks if the values of the fields and checkboxes are different from
                    * the ones stored in the database
                    *
                    * @returns bool
                    */
                }, {
                    key: 'changed',
                    value: function changed() {
                        var _this2 = this;

                        var fieldsCheck = this.fields.some(function (key) {
                            return _this2.values[key]() !== app.settings[_this2.addPrefix(key)];
                        });
                        var checkboxesCheck = this.checkboxes.some(function (key) {
                            return _this2.values[key]() !== (app.settings[_this2.addPrefix(key)] == '1');
                        });
                        return fieldsCheck || checkboxesCheck;
                    }

                    /**
                    * Saves the settings to the database and redraw the page
                    *
                    * @param e
                    */
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this3 = this;

                        // prevent the usual form submit behaviour
                        e.preventDefault();

                        // if the page is already saving, do nothing
                        if (this.loading) return;

                        // prevents multiple savings
                        this.loading = true;
                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        // gets all the values from the form
                        this.fields.forEach(function (key) {
                            return settings[_this3.addPrefix(key)] = _this3.values[key]();
                        });
                        this.checkboxes.forEach(function (key) {
                            return settings[_this3.addPrefix(key)] = _this3.values[key]();
                        });

                        // actually saves everything in the database
                        saveSettings(settings).then(function () {
                            // on succes, show an alert
                            app.alerts.show(_this3.successAlert = new Alert({ type: 'success', children: app.translator.trans('core.admin.basics.saved_message') }));
                        })['finally'](function () {
                            // return to the initial state and redraw the page
                            _this3.loading = false;
                            m.redraw();
                        });
                    }

                    /**
                    * Adds the prefix `this.settingsPrefix` at the beginning of `key`
                    *
                    * @returns string
                    */
                }, {
                    key: 'addPrefix',
                    value: function addPrefix(key) {
                        return this.settingsPrefix + '.' + key;
                    }
                }]);
                return ImageUploadPage;
            })(Component);

            _export('default', ImageUploadPage);
        }
    };
});;
System.register('flagrow/image-upload/main', ['flarum/extend', 'flarum/app', 'flagrow/image-upload/addImageUploadPane'], function (_export) {
    'use strict';

    var extend, app, addImageUploadPane;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flagrowImageUploadAddImageUploadPane) {
            addImageUploadPane = _flagrowImageUploadAddImageUploadPane['default'];
        }],
        execute: function () {

            app.initializers.add('flagrow-image-upload', function (app) {
                addImageUploadPane();
            });
        }
    };
});