const gulp = require('gulp');
const xo = require('gulp-xo');


gulp.task('fix', () =>
    gulp.src('index.js')
    .pipe(xo({
        "envs": [
            "browser"
        ],
        "globals": [
            "$",
            "jQuery"
        ],
        "ignore": [
            "*",
            "js/vendor/*",
            "!js/app/*"
        ]
    }))
    .pipe(gulp.dest('./dist'))
);


gulp.task('default', () =>
    gulp.src('index.js')
    .pipe(xo({
        "esnext": true
    }))
    .pipe(gulp.dest('./dist'))
);
