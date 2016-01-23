# flagrow/flarum-ext-image-upload
[![Latest Stable Version](https://poser.pugx.org/flagrow/flarum-ext-image-upload/v/stable)][packagist-link] [![License](https://poser.pugx.org/flagrow/flarum-ext-image-upload/license)][packagist-link] [![Gitter](https://badges.gitter.im/flagrow/flarum-ext-image-upload.svg)](https://gitter.im/flagrow/flarum-ext-image-upload)

A [Flarum](http://flarum.org) extension to allow image uploading on thread and comment creation, supports multiple services like local storage and imgur.

---

## Install

```bash
composer require flagrow/flarum-ext-image-upload
```

## Configuration

- Visit the permission tab to select what user group can upload images in posts.
- Visit the settings tab of the extension in your admin to configure your image upload services.

## Upload services

The following upload services are supported:

- Locally in `assets/images`
- Imgur anonymously (requires Client Id by signing up)

## End-user usage

During post creation, click the Attach button to select a file. Once
you've chosen an image, upload will immediately start and based on
the image size and your connection will take some time to complete.

## Links

- by [Flagrow](https://github.com/flagrow)
- [changelog](changelog.md)
- [license](license.md)

[packagist-link]: https://packagist.org/packages/flagrow/image-upload
