System.register('flagrow/image-upload/components/ImageUploadSettingsModal', ['flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export) {
    'use strict';

    var SettingsModal, Switch, ImageUploadSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch['default'];
        }],
        execute: function () {
            ImageUploadSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(ImageUploadSettingsModal, _SettingsModal);

                function ImageUploadSettingsModal() {
                    babelHelpers.classCallCheck(this, ImageUploadSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(ImageUploadSettingsModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(ImageUploadSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'RemoteImageUploadSettingsModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return 'Image Upload Settings';
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m('div', { className: 'Form-group', id: 'image-upload-method' }, [m('label', 'Upload method'), m('select', { className: 'FormControl', bidi: this.setting('flagrow.image-upload.method') }, [m('option', { value: 'local' }, 'Local'), m('option', { value: 'imgur' }, 'Imgur')])]), m('section', { id: 'imgur', style: { display: 'none' } }, [m('div', { className: 'Form-group' }, [m('label', 'Imgur Client-ID'), m('input', { className: 'FormControl', bidi: this.setting('flagrow.image-upload.client_id') })]), m('div', { className: 'Form-group' }, [Switch.component({
                            state: this.setting('flagrow.image-upload.must_resize'),
                            children: app.translator.trans('flagrow-image-upload.admin.image_resize'),
                            onchange: this.setting('flagrow.image-upload.must_resize')
                        })])])];
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
                }]);
                return ImageUploadSettingsModal;
            })(SettingsModal);

            _export('default', ImageUploadSettingsModal);
        }
    };
});;
System.register('flagrow/image-upload/main', ['flarum/extend', 'flarum/app', 'flagrow/image-upload/components/ImageUploadSettingsModal'], function (_export) {
    'use strict';

    var extend, app, ImageUploadSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flagrowImageUploadComponentsImageUploadSettingsModal) {
            ImageUploadSettingsModal = _flagrowImageUploadComponentsImageUploadSettingsModal['default'];
        }],
        execute: function () {

            app.initializers.add('flagrow-image-upload', function (app) {
                app.extensionSettings['flagrow-image-upload'] = function () {
                    return app.modal.show(new ImageUploadSettingsModal());
                };

                // this selects imgur as endpoint.
                $('input:radio[name=endpoint]', '.ImageUploadSettingsModal').filter('[value="https://api.imgur.com/3/image"]').prop('checked', true);
            });
        }
    };
});