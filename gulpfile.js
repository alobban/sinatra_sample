/**
 * Created by vagrant on 5/12/16.
 */

var gulp = require('gulp'),
    // sass = require('gulp-sass'),
    // concat = require('gulp-concat'),
    // jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    // rename = require('gulp-rename'),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('depend', function () {
    log('Combining all dependency frameworks');
    
    return gulp.src(['bower_components/angular/angular.min.js','bower_components/angular-ui-router/release/angular-ui-router.min.js','bower_components/jquery/dist/jquery.min.js','bower_components/bootstrap/dist/js/bootstrap.min.js'])
        .pipe($.concat('dependencies.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('jshint-test', function () {
    log('Analyzing source with JSHint');
    
   return gulp.src(['public/js/app.js','public/js/modules/**/*.js'])
       .pipe($.jshint())
       .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function () {
    log('Compiling custom JS app file');
    
    return gulp.src([
        'public/js/app.js',
        'public/js/modules/user/user.js',
        'public/js/modules/user/user.controller.js',
        'public/js/modules/user/afnViewUser.ctrl.js',
        'public/js/modules/user/afnAddUser.ctrl.js',
        'public/js/modules/user/afnEditUser.ctrl.js',
        'public/js/modules/user/afnDeleteUser.ctrl.js'
    ])
        .pipe($.concat('app.compiled.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('sass-css', function () {
    log('Compiling css files from SASS');
    
    return gulp.src('public/scss/main.scss')
        .pipe($.sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('copy-css', function () {
    log('Copying Bootstrap CSS file');
    
    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('public/css'));
});

gulp.task('copy-fonts', function () {
    log('Copy Bootstrap fonts folder');
    
    return gulp.src('bower_components/bootstrap/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('watch', function () {
    log('Night Watch has begun');
   gulp.watch(['public/js/app.js','public/js/modules/**/*.js'], ['jshint-test']);
   gulp.watch(['public/js/app.js','public/js/modules/**/*.js'], ['scripts']);
   gulp.watch('public/scss/*', ['sass-css']); 
});

gulp.task('default', ['depend','jshint-test','scripts', 'sass-css', 'copy-css', 'copy-fonts', 'watch']);