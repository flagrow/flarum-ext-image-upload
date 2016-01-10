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
        items.add('flarum-image-upload', theButton, 0);
        $(".Button-label", ".item-flarum-image-upload > div").hide();
        $(".item-flarum-image-upload > div").hover(
                function(){ $('.Button-label', this).show(); $(this).removeClass('Button--icon')},
                function(){ $('.Button-label', this).hide(); $(this).addClass('Button--icon')}
        );
    });
});
