const gulp = require('gulp');
const xo = require('gulp-xo');
const coffee = require('gulp-coffee');
const gutil = require('gulp-util');

gulp.task('default', () =>
    gulp.src('index.coffee')
    .pipe(coffee({
        bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest('./dist'))
);
