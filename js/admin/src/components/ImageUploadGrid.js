import Component from 'flarum/Component';
import SettingDropdown from 'flarum/components/SettingDropdown';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';
import icon from 'flarum/helpers/icon';

export default class PermissionGrid extends Component {
  init() {
    this.uploadMethods = this.uploadItems().toArray();
  }

  view() {
    const scopes = this.scopeItems().toArray();

    const permissionCells = permission => {
      return scopes.map(scope => (
        <td>
          {scope.render(permission)}
        </td>
      ));
    };

    return (
      <table className="PermissionGrid">
        {this.permissions.map(section => (
          <tbody>
            <tr className="PermissionGrid-section">
              <th>{section.label}</th>
              {permissionCells(section)}
              <td/>
            </tr>
            {section.children.map(child => (
              <tr className="PermissionGrid-child">
                <th>{child.icon ? icon(child.icon) : ''}{child.label}</th>
                {permissionCells(child)}
                <td/>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    );
  }

  permissionItems() {
    const items = new ItemList();

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

  localItems() {
      const items = new ItemList();

      return items;
  }

  imgurItems() {
      const items = new ItemList();

      items.add('client_id', {
        icon: 'i-cursor',
        label: 'Client-ID',
        setting: () => SettingDropdown.component({
          key: 'allow_sign_up',
          options: [
            {value: '1', label: app.translator.trans('core.admin.permissions_controls.signup_open_button')},
            {value: '0', label: app.translator.trans('core.admin.permissions_controls.signup_closed_button')}
          ]
        })
      }, 90);
  }

  viewItems() {
    const items = new ItemList();

    items.add('viewDiscussions', {
      icon: 'eye',
      label: app.translator.trans('core.admin.permissions.view_discussions_label'),
      permission: 'viewDiscussions',
      allowGuest: true
    }, 100);

    items.add('signUp', {
      icon: 'user-plus',
      label: app.translator.trans('core.admin.permissions.sign_up_label'),
      setting: () => SettingDropdown.component({
        key: 'allow_sign_up',
        options: [
          {value: '1', label: app.translator.trans('core.admin.permissions_controls.signup_open_button')},
          {value: '0', label: app.translator.trans('core.admin.permissions_controls.signup_closed_button')}
        ]
      })
    }, 90);

    return items;
  }

  startItems() {
    const items = new ItemList();

    items.add('start', {
      icon: 'edit',
      label: app.translator.trans('core.admin.permissions.start_discussions_label'),
      permission: 'startDiscussion'
    }, 100);

    items.add('allowRenaming', {
      icon: 'i-cursor',
      label: app.translator.trans('core.admin.permissions.allow_renaming_label'),
      setting: () => {
        const minutes = parseInt(app.settings.allow_renaming, 10);

        return SettingDropdown.component({
          defaultLabel: minutes
            ? app.translator.transChoice('core.admin.permissions_controls.allow_some_minutes_button', minutes, {count: minutes})
            : app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button'),
          key: 'allow_renaming',
          options: [
            {value: '-1', label: app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button')},
            {value: '10', label: app.translator.trans('core.admin.permissions_controls.allow_ten_minutes_button')},
            {value: 'reply', label: app.translator.trans('core.admin.permissions_controls.allow_until_reply_button')}
          ]
        });
      }
    }, 90);

    return items;
  }

  replyItems() {
    const items = new ItemList();

    items.add('reply', {
      icon: 'reply',
      label: app.translator.trans('core.admin.permissions.reply_to_discussions_label'),
      permission: 'discussion.reply'
    }, 100);

    items.add('allowPostEditing', {
      icon: 'pencil',
      label: app.translator.trans('core.admin.permissions.allow_post_editing_label'),
      setting: () => {
        const minutes = parseInt(app.settings.allow_post_editing, 10);

        return SettingDropdown.component({
          defaultLabel: minutes
            ? app.translator.transChoice('core.admin.permissions_controls.allow_some_minutes_button', minutes, {count: minutes})
            : app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button'),
          key: 'allow_post_editing',
          options: [
            {value: '-1', label: app.translator.trans('core.admin.permissions_controls.allow_indefinitely_button')},
            {value: '10', label: app.translator.trans('core.admin.permissions_controls.allow_ten_minutes_button')},
            {value: 'reply', label: app.translator.trans('core.admin.permissions_controls.allow_until_reply_button')}
          ]
        });
      }
    }, 90);

    return items;
  }

  moderateItems() {
    const items = new ItemList();

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

  scopeItems() {
    const items = new ItemList();

    items.add('global', {
      label: app.translator.trans('core.admin.permissions.global_heading'),
      render: item => {
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

  scopeControlItems() {
    return new ItemList();
  }
}
