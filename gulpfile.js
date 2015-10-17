'use strict'

const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');

const SRC = 'src/**/*.js';
const DEST = 'lib';

gulp.task('default', function(){
    return gulp.src(SRC)
            .pipe(changed(DEST))
            .pipe(babel())
            .pipe(gulp.dest(DEST));
});
