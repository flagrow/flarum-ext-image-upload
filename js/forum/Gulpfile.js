var gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/remote-image-upload': [
            'src/**/*.js'
        ]
    }
});