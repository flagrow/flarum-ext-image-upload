System.register('flagrow/image-upload/components/UploadButton', ['flarum/Component', 'flarum/helpers/icon'], function (_export) {
    'use strict';

    var Component, icon, UploadButton;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }],
        execute: function () {
            UploadButton = (function (_Component) {
                babelHelpers.inherits(UploadButton, _Component);

                function UploadButton() {
                    babelHelpers.classCallCheck(this, UploadButton);
                    babelHelpers.get(Object.getPrototypeOf(UploadButton.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(UploadButton, [{
                    key: 'init',

                    /**
                    * Load the configured remote uploader service.
                    */
                    value: function init() {
                        // the service type handling uploads
                        this.type = app.forum.attribute('flagrow.image-upload.uploadMethod') || 'local';
                        this.textAreaObj = null;

                        this.button = this;
                    }

                    /**
                    * Show the actual Upload Button.
                    *
                    * @returns {*}
                    */
                }, {
                    key: 'view',
                    value: function view() {
                        return m('div', { className: 'Button hasIcon flagrow-image-upload-button Button--icon' }, [icon('picture-o', { className: 'Button-icon' }), m('span', { className: 'Button-label' }, app.translator.trans('flagrow-image-upload.forum.buttons.attach')), m('input', {
                            type: 'file',
                            accept: 'image/*',
                            name: 'flagrow-image-upload-input',
                            onchange: this.process.bind(this)
                        })]);
                    }

                    /**
                    * Process the upload event.
                    */
                }, {
                    key: 'process',
                    value: function process() {
                        // keep track of the parent object
                        var button = this.button;

                        // wheter the image should be resized
                        this.mustResize = app.forum.attribute('flagrow.image-upload.mustResize') || false;
                        // max width and height of the uploaded image
                        this.maxWidth = app.forum.attribute('flagrow.image-upload.resizeMaxWidth') || null;
                        this.maxHeight = app.forum.attribute('flagrow.image-upload.resizeMaxHeight') || null;
                        // set the default value (changed later if necessary)
                        this.scalingFactor = 1;

                        // create the object that is going to load the image from the user's computer
                        var reader = new FileReader();
                        // this is what the reader is going to do once the file has been loaded into the object
                        reader.onload = function (e) {
                            // show loader
                            button.markLoaderStarted();

                            // create an off-screen canvas and an Image object
                            var canvas = document.createElement('canvas'),
                                canvasContext = canvas.getContext('2d'),
                                imageObject = new Image();

                            // this is what we are going to do once the image has been loaded into the object
                            imageObject.onload = function () {

                                // evaluate the scalingFactor to keep aspect ratio
                                if (button.mustResize == true) {
                                    button.scalingFactor = Math.min(button.maxWidth / imageObject.width, button.maxHeight / imageObject.height, 1);
                                }

                                // set canvas' dimension to target size
                                canvas.width = imageObject.width * button.scalingFactor;
                                canvas.height = imageObject.height * button.scalingFactor;

                                // draw source image into the off-screen canvas:
                                canvasContext.drawImage(imageObject, 0, 0, canvas.width, canvas.height);

                                // encode image to data-uri with base64 version of compressed image
                                var resizedImage = canvas.toDataURL();

                                // this formats the file for base64 upload
                                var data = resizedImage.substr(resizedImage.indexOf(",") + 1, resizedImage.length);

                                // run the service (oauth or the admin specified one)
                                button[button.type](data);
                            };

                            // load the file in the image object
                            imageObject.src = e.target.result;
                        };

                        // actually runs everything on the file that has been selected
                        reader.readAsDataURL($("input[name='flagrow-image-upload-input']")[0].files[0]);
                    }
                }, {
                    key: 'local',
                    value: function local(imageData) {

                        var data = new FormData();
                        data.append('image', imageData);

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/image/upload',
                            serialize: function serialize(raw) {
                                return raw;
                            },
                            data: data
                        }).then(this.success.bind(this), this.failure.bind(this));
                    }

                    /**
                    * Imgur upload method. Uses oauth.
                    *
                    * @param imageData
                    */
                }, {
                    key: 'imgur',
                    value: function imgur(imageData) {
                        //checks if the imgur client-id is defined
                        if (app.forum.attribute('flagrow.image-upload.imgurClientId') !== '') {
                            // create the imgur specific parameters that are going to be passed to
                            // the ouath method.
                            var connectionParameters = {
                                'endpoint': 'https://api.imgur.com/3/image',
                                'headers': {
                                    Authorization: 'Client-ID ' + app.forum.attribute('flagrow.image-upload.imgurClientId')
                                }
                            };

                            // now we call the oauth method.
                            this.oauth(imageData, connectionParameters);
                        } else {
                            // otherwise throws an error
                            this.markLoaderFailed();
                            // reset the button after 2s
                            setTimeout((function () {
                                this.resetLoader();
                            }).bind(this), 2000);
                            // also logs the error for debug
                            console.log('Flagrow Image Upload Extension: the Imgur client-id was not provided');
                        }
                    }

                    /**
                    * oauth general upload method.
                    *
                    * @param imageData
                    * @param connectionParameters
                    */
                }, {
                    key: 'oauth',
                    value: function oauth(imageData) {
                        var connectionParameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                        // api endpoint
                        this.endpoint = connectionParameters.endpoint || app.forum.attribute('flagrow.image-upload.endpoint');
                        // client id
                        this.client_id = connectionParameters.client_id || app.forum.attribute('flagrow.image-upload.clientId');
                        // client bearer token if non-anonymous
                        this.token = connectionParameters.token || app.forum.attribute('flagrow.image-upload.token') || null;
                        // whether uploading is anonymous, not account bound
                        this.isAnonymous = connectionParameters.anonymous || app.forum.attribute('flagrow.image-upload.anonymous') || true;

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
                            headers: connectionParameters.headers || headers,
                            data: {
                                'image': imageData,
                                'type': 'base64'
                            },
                            // upload success
                            success: function success(payload, statusCode, xhr) {
                                // redirects the call to the success method of the button
                                // also replaces `http` with `https`
                                button.success(payload.data.link.replace('http:', 'https:'));
                            },
                            // upload error
                            error: function error(xhr, statusText, _error) {
                                button.failure(statusText);
                            },
                            statusCode: {
                                // unauthorized
                                401: function _() {
                                    button.failure('Unauthorized');
                                }
                            }
                        });
                    }

                    /**
                     * Handles errors.
                     *
                     * @param message
                     */
                }, {
                    key: 'failure',
                    value: function failure(message) {
                        this.markLoaderFailed();
                        // todo show popup
                    }

                    /**
                     * Appends the link to the body of the composer.
                     *
                     * @param link
                     */
                }, {
                    key: 'success',
                    value: function success(link) {

                        if (typeof link == 'object') {
                            link = link.data.attributes.url;
                        }

                        this.markLoaderSuccess();

                        // create a markdown string that holds the image link
                        var markdownString = '\n![image ' + link + '](' + link + ')\n';

                        // place the Markdown image link in the Composer
                        this.textAreaObj.insertAtCursor(markdownString);

                        // if we are not starting a new discussion, the variable is defined
                        if (typeof this.textAreaObj.props.preview !== 'undefined') {
                            // show what we just uploaded
                            this.textAreaObj.props.preview();
                        }

                        var button = this;
                        // reset the button for a new upload
                        setTimeout(function () {
                            button.resetLoader();
                        }, 1000);
                    }

                    /**
                    * Sets the icon classes of the icon in the upload input field.
                    *
                    * @param classes
                    */
                }, {
                    key: 'setIconClasses',
                    value: function setIconClasses(classes) {
                        $('.flagrow-image-upload-button > i').removeClass('fa-picture-o fa-spin fa-circle-o-notch fa-check green fa-times red').addClass(classes);
                    }

                    /**
                    * Sets the label of the uploader button and allows disabling submits.
                    *
                    * @param text
                    * @param disable
                    */
                }, {
                    key: 'setLabel',
                    value: function setLabel(text) {
                        var disable = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

                        // set the text of the button
                        $('.flagrow-image-upload-button > .Button-label').text(text);

                        // get the composer element, so we search only in it
                        var composer = $('#composer');
                        // enable on timeout
                        if (disable === false && $('.item-submit > button', composer).prop('disabled') === true) {
                            setTimeout(function () {
                                $('.item-submit > button', composer).prop('disabled', false);
                            }, 1000);
                        } else if (disable === true) {
                            $('.item-submit > button', composer).prop('disabled', true);
                        }
                    }

                    /**
                    * Modifies the file upload button to indicate upload started.
                    */
                }, {
                    key: 'markLoaderStarted',
                    value: function markLoaderStarted() {
                        this.setIconClasses('fa-spin fa-circle-o-notch');
                        this.setLabel(app.translator.trans('flagrow-image-upload.forum.states.loading'), true);
                    }

                    /**
                    * Modifies the file upload button to indicate upload success.
                    */
                }, {
                    key: 'markLoaderSuccess',
                    value: function markLoaderSuccess() {
                        this.setIconClasses('fa-check green');
                        this.setLabel(app.translator.trans('flagrow-image-upload.forum.states.success'), false);
                    }

                    /**
                    * Modifies the file upload button to indicate upload failed.
                    */
                }, {
                    key: 'markLoaderFailed',
                    value: function markLoaderFailed() {
                        this.setIconClasses('fa-times red');
                        this.setLabel(app.translator.trans('flagrow-image-upload.forum.states.error'), false);
                    }

                    /**
                    * Resets the file upload button to its original state.
                    */
                }, {
                    key: 'resetLoader',
                    value: function resetLoader() {
                        this.setIconClasses('fa-picture-o');
                        this.setLabel(app.translator.trans('flagrow-image-upload.forum.buttons.attach'), false);
                        // remove the old file url
                        $("input[name='flagrow-image-upload-input']").val("");
                    }
                }]);
                return UploadButton;
            })(Component);

            _export('default', UploadButton);
        }
    };
});;
System.register('flagrow/image-upload/main', ['flarum/extend', 'flarum/components/TextEditor', 'flagrow/image-upload/components/UploadButton'], function (_export) {
    'use strict';

    var extend, TextEditor, UploadButton;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor['default'];
        }, function (_flagrowImageUploadComponentsUploadButton) {
            UploadButton = _flagrowImageUploadComponentsUploadButton['default'];
        }],
        execute: function () {

            app.initializers.add('flagrow-image-upload', function (app) {

                /**
                 * Add the upload button to the post composer.
                 */
                extend(TextEditor.prototype, 'controlItems', function (items) {
                    var theButton = new UploadButton();
                    theButton.textAreaObj = this;
                    items.add('flarum-image-upload', theButton, 0);
                    // animate the button on hover: shows the label
                    $(".Button-label", ".item-flarum-image-upload > div").hide();
                    $(".item-flarum-image-upload > div").hover(function () {
                        $('.Button-label', this).show();$(this).removeClass('Button--icon');
                    }, function () {
                        $('.Button-label', this).hide();$(this).addClass('Button--icon');
                    });
                });
            });
        }
    };
});