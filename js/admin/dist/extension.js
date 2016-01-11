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
          items.add('image-upload', AdminLinkButton.component({
            href: app.route('image-upload'),
            icon: 'picture-o',
            children: 'Image Upload',
            description: 'Flagrow (c). Description here'
          }));
        });
      });
    }
  };
});;
System.register('flagrow/image-upload/components/ImageUploadGrid', ['flarum/Component', 'flarum/components/SettingDropdown', 'flarum/components/Button', 'flarum/utils/ItemList', 'flarum/helpers/icon'], function (_export) {
  'use strict';

  var Component, SettingDropdown, Button, ItemList, icon, PermissionGrid;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent['default'];
    }, function (_flarumComponentsSettingDropdown) {
      SettingDropdown = _flarumComponentsSettingDropdown['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList['default'];
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon['default'];
    }],
    execute: function () {
      PermissionGrid = (function (_Component) {
        babelHelpers.inherits(PermissionGrid, _Component);

        function PermissionGrid() {
          babelHelpers.classCallCheck(this, PermissionGrid);
          babelHelpers.get(Object.getPrototypeOf(PermissionGrid.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(PermissionGrid, [{
          key: 'init',
          value: function init() {
            this.uploadMethods = this.uploadItems().toArray();
          }
        }, {
          key: 'view',
          value: function view() {
            var scopes = this.scopeItems().toArray();

            var permissionCells = function permissionCells(permission) {
              return scopes.map(function (scope) {
                return m(
                  'td',
                  null,
                  scope.render(permission)
                );
              });
            };

            return m(
              'table',
              { className: 'PermissionGrid' },
              this.permissions.map(function (section) {
                return m(
                  'tbody',
                  null,
                  m(
                    'tr',
                    { className: 'PermissionGrid-section' },
                    m(
                      'th',
                      null,
                      section.label
                    ),
                    permissionCells(section),
                    m('td', null)
                  ),
                  section.children.map(function (child) {
                    return m(
                      'tr',
                      { className: 'PermissionGrid-child' },
                      m(
                        'th',
                        null,
                        child.icon ? icon(child.icon) : '',
                        child.label
                      ),
                      permissionCells(child),
                      m('td', null)
                    );
                  })
                );
              })
            );
          }
        }, {
          key: 'permissionItems',
          value: function permissionItems() {
            var items = new ItemList();

            items.add('local', {
              label: 'Local upload settings',
              children: this.localItems().toArray()
            }, 100);

            items.add('imgur', {
              label: 'Imgur upload settings',
              children: this.imgurItems().toArray()
            }, 90);

            return items;
          }
        }, {
          key: 'localItems',
          value: function localItems() {
            var items = new ItemList();

            return items;
          }
        }, {
          key: 'imgurItems',
          value: function imgurItems() {
            var items = new ItemList();

            items.add('client_id', {
              icon: 'i-cursor',
              label: 'Client-ID',
              setting: function setting() {
                return SettingDropdown.component({
                  key: 'allow_sign_up',
                  options: [{ value: '1', label: app.translator.trans('core.admin.permissions_controls.signup_open_button') }, { value: '0', label: app.translator.trans('core.admin.permissions_controls.signup_closed_button') }]
                });
              }
            }, 90);
          }
        }, {
          key: 'viewItems',
          value: function viewItems() {
            var items = new ItemList();

            items.add('viewDiscussions', {
              icon: 'eye',
              label: app.translator.trans('core.admin.permissions.view_discussions_label'),
              permission: 'viewDiscussions',
              allowGuest: true
            }, 100);

            items.add('signUp', {
              icon: 'user-plus',
              label: app.translator.trans('core.admin.permissions.sign_up_label'),
              setting: function setting() {
                return SettingDropdown.component({
                  key: 'allow_sign_up',
                  options: [{ value: '1', label: app.translator.trans('core.admin.permissions_controls.signup_open_button') }, { value: '0', label: app.translator.trans('core.admin.permissions_controls.signup_closed_button') }]
                });
              }
            }, 90);

            return items;
          }
        }, {
          key: 'startItems',
          value: function startItems() {
            var items = new ItemList();

            items.add('start', {
              icon: 'edit',
              label: app.translator.trans('core.admin.permissions.start_discussions_label'),
              permission: 'startDiscussion'
            }, 100);

            items.add('allowRenaming', {
              icon: 'i-cursor',
              label: app.translator.trans('core.admin.permissions.allow_renaming_label'),
              setting: function setting() {
                var minutes = parseInt(app.settings.allow_renaming, 10);

                return SettingDropdown.component({
                  defaultLabel: minutes ? app.translator.transChoice('core.admin.permissions_controls.allow_some_minutes_button', minutes, { count: minutes }) : app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button'),
                  key: 'allow_renaming',
                  options: [{ value: '-1', label: app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button') }, { value: '10', label: app.translator.trans('core.admin.permissions_controls.allow_ten_minutes_button') }, { value: 'reply', label: app.translator.trans('core.admin.permissions_controls.allow_until_reply_button') }]
                });
              }
            }, 90);

            return items;
          }
        }, {
          key: 'replyItems',
          value: function replyItems() {
            var items = new ItemList();

            items.add('reply', {
              icon: 'reply',
              label: app.translator.trans('core.admin.permissions.reply_to_discussions_label'),
              permission: 'discussion.reply'
            }, 100);

            items.add('allowPostEditing', {
              icon: 'pencil',
              label: app.translator.trans('core.admin.permissions.allow_post_editing_label'),
              setting: function setting() {
                var minutes = parseInt(app.settings.allow_post_editing, 10);

                return SettingDropdown.component({
                  defaultLabel: minutes ? app.translator.transChoice('core.admin.permissions_controls.allow_some_minutes_button', minutes, { count: minutes }) : app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button'),
                  key: 'allow_post_editing',
                  options: [{ value: '-1', label: app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button') }, { value: '10', label: app.translator.trans('core.admin.permissions_controls.allow_ten_minutes_button') }, { value: 'reply', label: app.translator.trans('core.admin.permissions_controls.allow_until_reply_button') }]
                });
              }
            }, 90);

            return items;
          }
        }, {
          key: 'moderateItems',
          value: function moderateItems() {
            var items = new ItemList();

            items.add('renameDiscussions', {
              icon: 'i-cursor',
              label: app.translator.trans('core.admin.permissions.rename_discussions_label'),
              permission: 'discussion.rename'
            }, 100);

            items.add('hideDiscussions', {
              icon: 'trash-o',
              label: app.translator.trans('core.admin.permissions.delete_discussions_label'),
              permission: 'discussion.hide'
            }, 90);

            items.add('deleteDiscussions', {
              icon: 'times',
              label: app.translator.trans('core.admin.permissions.delete_discussions_forever_label'),
              permission: 'discussion.delete'
            }, 80);

            items.add('editPosts', {
              icon: 'pencil',
              label: app.translator.trans('core.admin.permissions.edit_and_delete_posts_label'),
              permission: 'discussion.editPosts'
            }, 70);

            items.add('deletePosts', {
              icon: 'times',
              label: app.translator.trans('core.admin.permissions.delete_posts_forever_label'),
              permission: 'discussion.deletePosts'
            }, 60);

            return items;
          }
        }, {
          key: 'scopeItems',
          value: function scopeItems() {
            var items = new ItemList();

            items.add('global', {
              label: app.translator.trans('core.admin.permissions.global_heading'),
              render: function render(item) {
                if (item.setting) {
                  return item.setting();
                } else if (item.permission) {
                  return PermissionDropdown.component({
                    permission: item.permission,
                    allowGuest: item.allowGuest
                  });
                }

                return '';
              }
            }, 100);

            return items;
          }
        }, {
          key: 'scopeControlItems',
          value: function scopeControlItems() {
            return new ItemList();
          }
        }]);
        return PermissionGrid;
      })(Component);

      _export('default', PermissionGrid);
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

                        this.loading = false;

                        this.fields = ['upload_method', 'imgur_client_id'];
                        this.checkboxes = ['must_resize'];
                        this.uploadMethodOptions = {
                            'local': 'Local',
                            'imgur': 'Imgur'
                        };

                        this.values = {};
                        this.settingsPrefix = 'flagrow.image-upload';
                        var settings = app.settings;
                        this.fields.forEach(function (key) {
                            return _this.values[key] = m.prop(settings[_this.addPrefix(key)]);
                        });
                        this.checkboxes.forEach(function (key) {
                            return _this.values[key] = m.prop(settings[_this.addPrefix(key)] === '1');
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return [m('div', { className: 'ImageUploadPage' }, [m('div', { className: 'container' }, [m('form', { onsubmit: this.onsubmit.bind(this) }, [FieldSet.component({
                            label: 'Upload method',
                            children: [Select.component({
                                options: this.uploadMethodOptions,
                                onchange: this.values.upload_method,
                                value: this.values.upload_method()
                            })]
                        }), m('div', { className: 'ImageUploadPage-resize' }, [Switch.component({
                            state: this.values.must_resize(),
                            children: 'resize image before upload',
                            onchange: this.values.must_resize
                        })]), m('div', { className: 'ImageUploadPage-imgur', style: { display: this.values.upload_method() === 'imgur' ? "block" : "none" } }, [FieldSet.component({
                            label: 'Imgur settings',
                            children: [m('label', {}, 'Imgur Client-ID'), m('input', {
                                className: 'FormControl',
                                value: this.values.imgur_client_id(),
                                oninput: m.withAttr('value', this.values.imgur_client_id)
                            })]
                        })]), m('div', { style: { display: this.values.upload_method() === 'local' ? "block" : "none" } }, ['This is local setting']), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: 'Save settings',
                            loading: this.loading,
                            disabled: !this.changed()
                        })])])])];
                    }
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
                        console.log('this is in the settings: ' + app.settings[this.addPrefix('must_resize')]);
                        console.log('this is in the checkbox: ' + this.values.must_resize());
                        console.log('this is checkboxesCheck: ' + checkboxesCheck);
                        return fieldsCheck || checkboxesCheck;
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this3 = this;

                        e.preventDefault();

                        if (this.loading) return;

                        this.loading = true;
                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        this.fields.forEach(function (key) {
                            return settings[_this3.addPrefix(key)] = _this3.values[key]();
                        });
                        this.checkboxes.forEach(function (key) {
                            return settings[_this3.addPrefix(key)] = _this3.values[key]();
                        });

                        saveSettings(settings).then(function () {
                            app.alerts.show(_this3.successAlert = new Alert({ type: 'success', children: app.translator.trans('core.admin.basics.saved_message') }));
                        })['finally'](function () {
                            _this3.loading = false;
                            m.redraw();
                        });
                    }
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
System.register('flagrow/image-upload/components/ImageUploadSettingsModal', ['flarum/components/SettingsModal', 'flarum/components/Switch', 'flarum/components/SettingDropdown'], function (_export) {
    'use strict';

    var SettingsModal, Switch, SettingDropdown, ImageUploadSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch['default'];
        }, function (_flarumComponentsSettingDropdown) {
            SettingDropdown = _flarumComponentsSettingDropdown['default'];
        }],
        execute: function () {
            ImageUploadSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(ImageUploadSettingsModal, _SettingsModal);

                function ImageUploadSettingsModal() {
                    babelHelpers.classCallCheck(this, ImageUploadSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(ImageUploadSettingsModal.prototype), 'constructor', this).apply(this, arguments);
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
                        return [SettingDropdown.component({
                            label: 'Upload method',
                            key: 'flagrow.image-upload.method',
                            options: [{ value: 'imgur', label: 'Imgur' }, { value: 'local', label: 'Local' }]
                        })];
                    }

                    // updateSettingsView() {
                    //     var settingToShow = '#image-upload-' + $('#image-upload-method > select').val();
                    //     console.log(settingToShow);
                    //     $('.upload-method').hide("fast");
                    //     $(settingToShow).show("fast");
                    // }
                }]);
                return ImageUploadSettingsModal;
            })(SettingsModal);

            _export('default', ImageUploadSettingsModal);
        }
    };
});;
System.register('flagrow/image-upload/main', ['flarum/extend', 'flarum/app', 'flagrow/image-upload/addImageUploadPane'], function (_export) {
    'use strict';

    //import ImageUploadSettingsModal from 'flagrow/image-upload/components/ImageUploadSettingsModal';
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
                //app.extensionSettings['flagrow-image-upload'] = () => app.modal.show(new ImageUploadSettingsModal());

                // this selects imgur as endpoint.
                // $('input:radio[name=endpoint]', '.ImageUploadSettingsModal')
                //     .filter('[value="https://api.imgur.com/3/image"]')
                //     .prop('checked', true);

                addImageUploadPane();
            });
        }
    };
});