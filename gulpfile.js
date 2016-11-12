const gulp = require('gulp');
const xo = require('gulp-xo');

gulp.task('default', () =>
    gulp.src('./index.js')
    .pipe(xo({ suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
);
