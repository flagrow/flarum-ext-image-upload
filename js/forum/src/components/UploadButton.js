import Component from 'flarum/components/Component';
import icon from 'flarum/helpers/icon';

export default class UploadButton extends Component {
    view() {
        return m('div', {className: 'Button hasIcon flagrow-image-upload-button'}, [
            icon('paperclip', {className: 'Button-icon'}),
            m('span', {className: 'Button-label'}, app.translator.trans('flagrow-remote-image-upload.forum.buttons.attach')),
            m('input', {type: 'file', accept: 'image/*', name: 'flagrow-image-upload-input'})
        ]);
    }
}