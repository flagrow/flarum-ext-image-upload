import Component from 'flarum/components/Component';
import icon from 'flarum/helpers/icon';

export default class UploadButton extends Component {

    /**
     * Load the configured remote uploader service.
     */
    init() {
        // api endpoint
        this.endpoint = app.forum.attribute('flagrow.remote-image-upload.endpoint');
        // client id
        this.client_id = app.forum.attribute('flagrow.remote-image-upload.client_id');
        // client bearer token if non-anonymous
        this.token = app.forum.attribute('flagrow.remote-image-upload.token') || null;
        // whether uploading is anonymous, not account bound
        this.isAnonymous = app.forum.attribute('flagrow.remote-image-upload.anonymous') || true;
    }

    /**
     * Show the actual Upload Button.
     *
     * @returns {*}
     */
    view() {
        return m('div', {className: 'Button hasIcon flagrow-image-upload-button'}, [
            icon('paperclip', {className: 'Button-icon'}),
            m('span', {className: 'Button-label'}, app.translator.trans('flagrow-remote-image-upload.forum.buttons.attach')),
            m('input', {
                type: 'file',
                accept: 'image/*',
                name: 'flagrow-image-upload-input',
                onchange: this.process.bind(this)
            })
        ]);
    }

    /**
     * Process the upload event.
     */
    process() {
        console.log(this);
    }
}