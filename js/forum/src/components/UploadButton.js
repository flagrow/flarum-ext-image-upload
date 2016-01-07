import Component from 'flarum/components/Component';
import icon from 'flarum/helpers/icon';

export default class UploadButton extends Component {

    /**
     * Load the configured remote uploader service.
     */
    init() {
        // the service type handling uploads
        this.type = app.forum.attribute('flagrow.remote-image-upload.type') || 'oauth';

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

        // show loader
        this.markLoaderStarted();

        console.log(this);
        this.[this.type]();

    }

    oauth() {
        // api endpoint
        this.endpoint = app.forum.attribute('flagrow.remote-image-upload.endpoint');
        // client id
        this.client_id = app.forum.attribute('flagrow.remote-image-upload.client_id');
        // client bearer token if non-anonymous
        this.token = app.forum.attribute('flagrow.remote-image-upload.token') || null;
        // whether uploading is anonymous, not account bound
        this.isAnonymous = app.forum.attribute('flagrow.remote-image-upload.anonymous') || true;

        if (this.isAnonymous || !this.token) {
            var headers = {
                client_id: this.client_id
            };
        } else {
            var headers = {
                bearer: this.token
            };
        }

        var button = this;

        $.ajax(this.endpoint, {
            method: 'post',
            // authorization and other headers
            headers: headers,
            // upload success
            success: function (payload, statusCode, xhr) {

                button.markLoaderSuccess();
            },
            // upload error
            error: function(xhr, statusText, error) {

                button.markLoaderFailed();
            },
            statusCode: {
                // unauthorized
                401: function () {
                }
            }
        });
    }

    /**
     * Sets the icon classes of the icon in the upload input field.
     *
     * @param classes
     */
    setIconClasses(classes) {
        this.$('i').removeClass('fa-paperclip fa-spin fa-circle-o-notch fa-check green fa-times red').addClass(classes);
    }

    /**
     * Sets the label of the uploader button and allows disabling submits.
     *
     * @param text
     * @param disable
     */
    setLabel(text, disable = false) {
        this.$('.Button-label').text(text);

        // enable on timeout
        if(disable === false && $('.item-submit > button').attr('disabled') === true ) {
            setTimeout(function() {
                $('.item-submit > button').attr('disabled', false);
            }, 1000);
        } else if(disable === true) {
            $('.item-submit > button').attr('disabled', true);
        }
    }

    /**
     * Modifies the file upload button to indicate upload started.
     */
    markLoaderStarted() {
        this.setIconClasses('fa-spin fa-circle-o-notch');
        this.setLabel(app.translator.trans('flagrow-remote-image-upload.forum.states.loading'), true);
    }

    /**
     * Modifies the file upload button to indicate upload success.
     */
    markLoaderSuccess() {
        this.setIconClasses('fa-check green');
        this.setLabel(app.translator.trans('flagrow-remote-image-upload.forum.states.success'), false);
    }

    /**
     * Modifies the file upload button to indicate upload failed.
     */
    markLoaderFailed() {
        this.setIconClasses('fa-times red');
        this.setLabel(app.translator.trans('flagrow-remote-image-upload.forum.states.error'), false);
    }

    /**
     * Resets the file upload button to its original state.
     */
    resetLoader() {
        this.setIconClasses('fa-paperclip');
    }
}
