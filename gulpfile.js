/**
 * Created by vagrant on 5/12/16.
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('scripts', function () {
    return gulp.src(['bower_components/angular/angular.js','bower_components/angular-ui-router/release/angular-ui-router.js'])
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('public/js'));
});