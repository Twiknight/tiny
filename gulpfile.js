'use strict'

const gulp = require('gulp');
const mocha = require('gulp-mocha')

const TEST = 'test/*.js';

gulp.task('test', function(){
    return gulp.src(TEST, {read:false})
            .pipe(mocha({
                reporter: 'spec'
            }));
});
