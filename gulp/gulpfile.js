var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var browser = require("browser-sync");
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var reload = browser.reload;
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

var browserList = [
      'edge >= 13',
      'ie >= 10',
      'ChromeAndroid >= 4',
      'firefox >= 57',
      'Chrome >= 51',
      'Safari >= 9',
      'iOS >= 8',
      'Android >= 4',
      'and_chr >= 51'
    ];

var  encodeOptions = {
      newline: "crlf",
      encoding: "utf8"
    };

var htmlBeautifyOptions = {
    "indent_size": 2,
    "indent_char": " ",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": false,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
}

var dist = '../.build/'

gulp.task('browser-sync', function() {
    browser({
        server: {
            baseDir: dist
        },
        port: 8080
    });
});

//ブラウザリロード
gulp.task('bs-reload', function () {
    browser.reload();
});

// html build
gulp.task('html-build',function(){
    gulp.src([
      '../_resource/**/*.html',
      '!../_resource/**/_*.html'
    ])
    .pipe($.plumber())
    .pipe($.nunjucksRender({
      path: ['../_resource/html/']
    }))
    .pipe($.htmlBeautify(htmlBeautifyOptions))
    .pipe($.convertNewline(encodeOptions))
    .pipe(gulp.dest(dist + '/'));
});

gulp.task('server', ['browser-sync'], function () {
    gulp.watch("../_resource/**/*.html",["html-build"]);
    gulp.watch(dist + "/**/*.html", ['bs-reload']);
});