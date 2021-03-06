'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('browserify', function () {

    return browserify({
            entries: 'src/Main.jsx',
            extensions: ['.jsx'],
            debug: true
        })
        .transform(babelify)
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
