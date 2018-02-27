var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var browser = require("browser-sync");
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var reload = browser.reload;
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var config = require('./config');

gulp.task('browser-sync', function() {
    browser({
        server: {
            baseDir: config.paths.dist
        },
        port: config.port
    });
});

//ブラウザリロード
gulp.task('bs-reload', function () {
    browser.reload();
});

// html build
gulp.task('html:build',function(){
  gulp.src([
    config.paths.src + '**/*.html',
    config.paths.src + '**/_*.html'
  ])
  .pipe($.plumber())
  .pipe($.nunjucksRender({
    path: [config.paths.src + 'html/']
  }))
  .pipe($.htmlBeautify(config.htmlBeautifyOptions))
  .pipe($.convertNewline(config.encodeOptions))
  .pipe(gulp.dest(config.paths.dist + '/'))
  .pipe($.size({title:'*** html:build ***'}));
});

// css build
gulp.task('css:build', function () {
  gulp.src([
      "node_modules/reset-css/reset.css",
      config.paths.src + 'sass/**/*scss',
      "config.paths.src + 'sass/**/_*.scss"
    ])
    .pipe($.plumber())
    .pipe($.sass({
        style:'expanded'
    }))
    .pipe($.groupCssMediaQueries({
      log: true
    }))
    .pipe($.autoprefixer(config.browserList))
    .pipe($.concat("style.css"))
    .pipe($.csscomb())
    .pipe($.cleanCss())
    .pipe($.convertNewline(config.encodeOptions))
    .pipe(gulp.dest(config.paths.dist + "/css/"))
    .pipe($.size({title:'*** css:build ***'}));
});

// js build
gulp.task('js:build',function() {
  return gulp.src([
      "node_modules/jquery/dist/jquery.js",
      config.paths.src + 'js/page.js'
    ])
    .pipe($.plumber())
    .pipe($.concat('bundle.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.paths.dist + '/js/'))
    .pipe($.size({title:'*** js:build ***'}));
});

// ESLint
gulp.task('js:eslint', function() {
  return gulp.src(config.paths.src + 'js/page.js')
    .pipe(eslint({
      useEslintrc: false,
      configFile: '../eslint.es5.yml'
    }))
    .pipe(eslint.format())
    .pipe(size( { title: '*** js:eslint ***' } ) );
});

// minify png, jpeg, gif and svg images
gulp.task('image:build', function() {
  gulp.src(config.paths.src + 'html/_groups/images/**/*.+(jpg|jpeg|png|gif|svg)')
    .pipe($.imagemin([
      pngquant({
        quality: '65-80',
        speed: 1,
        floyd:0
      }),
      mozjpeg({
        quality:85,
        progressive: true
      })
      ]
    ))
    .pipe($.imagemin()) //ここでガンマ情報を除去！
    .pipe(gulp.dest(config.paths.dist + '/images/'))
    .pipe($.size({title:'*** image:build ***'})),
  gulp.src(config.paths.src + 'html/_groups/images/**/*.ico')
    .pipe(gulp.dest(config.paths.dist + '/images/'));
});

gulp.task('server', ['browser-sync'], function () {
  gulp.watch(config.paths.src + '**/*.html',["html:build"]);
  gulp.watch(config.paths.src + '**/*.scss', ["css:build"]);
  gulp.watch(config.paths.src + '**/*.js', ["js:build"]);
  gulp.watch(config.paths.dist + "/**/*.html", ['bs-reload']);
  gulp.watch(config.paths.dist + "/**/*.css", ['bs-reload']);
  gulp.watch(config.paths.dist + "/**/*.js", ['bs-reload']);
});

gulp.task('default', ['image-build','server', 'sass']);
gulp.task('build',['html:build', 'image:build', 'js:build', 'css:build']);

