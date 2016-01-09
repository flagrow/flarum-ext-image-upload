System.register('flagrow/remote-image-upload/components/RemoteImageUploadSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
    'use strict';

    var SettingsModal, RemoteImageUploadSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
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
                        return [m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                'Imgur Client-ID'
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('flagrow.remote-image-upload.client_id') })
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                app.translator.trans('flagrow-remote-image-upload.admin.image_resize'),
                                m('input', { type: 'checkbox',
                                    name: 'resize',
                                    bidi: this.setting('flagrow.remote-image-upload.must_resize') })
                            ),
                            m(
                                'label',
                                null,
                                app.translator.trans('flagrow-remote-image-upload.admin.max_width')
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('flagrow.remote-image-upload.max_width') }),
                            m(
                                'label',
                                null,
                                app.translator.trans('flagrow-remote-image-upload.admin.max_height')
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('flagrow.remote-image-upload.max_height') })
                        ), m('input', { type: 'radio',
                            name: 'endpoint',
                            bidi: this.setting('flagrow.remote-image-upload.endpoint'),
                            value: 'https://api.imgur.com/3/image', hidden: true })];
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