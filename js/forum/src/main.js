import { extend } from 'flarum/extend';
import TextEditor from 'flarum/components/TextEditor';
import UploadButton from 'flagrow/image-upload/components/UploadButton';

app.initializers.add('flagrow-image-upload', app => {

    /**
     * Add the upload button to the post composer.
     */
    extend(TextEditor.prototype, 'controlItems', function(items)
    {
        var theButton = new UploadButton;
        theButton.textAreaObj = this;
        items.add('flarum-image-upload', theButton, 20);
    });
});
