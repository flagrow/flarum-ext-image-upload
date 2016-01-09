System.register('flagrow/remote-image-upload/components/RemoteImageUploadSettingsModal', ['flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export) {
    'use strict';

    var SettingsModal, Switch, RemoteImageUploadSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch['default'];
        }],
        execute: function () {
            RemoteImageUploadSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(RemoteImageUploadSettingsModal, _SettingsModal);

                function RemoteImageUploadSettingsModal() {
                    babelHelpers.classCallCheck(this, RemoteImageUploadSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(RemoteImageUploadSettingsModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(RemoteImageUploadSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'RemoteImageUploadSettingsModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return 'Remote Image Upload Settings';
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m('div', { className: 'Form-group' }, [m('label', 'Upload method'), m('select', { className: 'FormControl', bidi: this.setting('flagrow.image-upload.method'), onchange: this.setMethod.bind(this) }, [m('option', { value: 'local' }, 'Local'), m('option', { value: 'imgur' }, 'Imgur')])]), m('section', { id: 'imgur', style: { display: 'none' } }, [m('div', { className: 'Form-group' }, [m('label', 'Imgur Client-ID'), m('input', { className: 'FormControl', bidi: this.setting('flagrow.image-upload.client_id') })]), m('div', { className: 'Form-group' }, [Switch.component({
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
                }, {
                    key: 'setMethod',
                    value: function setMethod() {
                        console.log(this.setting('flagrow.image-upload.method'));
                        $('section#' + this.setting('flagrow.image-upload.method')).show();
                    }
                }]);
                return RemoteImageUploadSettingsModal;
            })(SettingsModal);

            _export('default', RemoteImageUploadSettingsModal);
        }
    };
});;
System.register('flagrow/remote-image-upload/main', ['flarum/extend', 'flarum/app', 'flagrow/remote-image-upload/components/RemoteImageUploadSettingsModal'], function (_export) {
    'use strict';

    var extend, app, RemoteImageUploadSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flagrowRemoteImageUploadComponentsRemoteImageUploadSettingsModal) {
            RemoteImageUploadSettingsModal = _flagrowRemoteImageUploadComponentsRemoteImageUploadSettingsModal['default'];
        }],
        execute: function () {

            app.initializers.add('flagrow-remote-image-upload', function (app) {
                app.extensionSettings['flagrow-remote-image-upload'] = function () {
                    return app.modal.show(new RemoteImageUploadSettingsModal());
                };

                // this selects imgur as endpoint.
                $('input:radio[name=endpoint]', '.RemoteImageUploadSettingsModal').filter('[value="https://api.imgur.com/3/image"]').prop('checked', true);
            });
        }
    };
});