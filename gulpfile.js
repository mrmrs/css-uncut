// Gulp tasks for TRIM

// Load plugins 
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-ruby-sass'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    csslint = require('gulp-csslint'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    jshint = require('gulp-jshint'),
    jsmin = require('gulp-jsmin'),
    concat = require('gulp-concat'),
    stylish = require('jshint-stylish'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload;

// Minify all css files in the css directory
// Run this in the root directory of the project with `gulp minify-css `
gulp.task('minify-css', function(){
  gulp.src('./css/i.css')
    .pipe(minifyCSS())
    .pipe(size({gzip: true, showFiles: true, title:'minified css'}))
    .pipe(rename('i.min.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('minify-images', function(){
  gulp.src('./img/*')
     .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist'));
});

// Concat all js files into one. If you add js files, you need to explicitly 
// add them in the order you want them added to the final js.
gulp.task('js-concat', function() {
  gulp.src(['js/base.js', 'js/home.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./'));
});

// JS Hint that code
// Run this in the root directory of the project with `gulp js-hint`
gulp.task('js-hint', function(){
  gulp.src('js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('stylish'));
});

gulp.task('js-min', function() {
  gulp.src('all.js')
    .pipe(jsmin())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('js'));
});

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', function(){
  gulp.src('./css/i.css')
    .pipe(csslint({
          'compatible-vendor-prefixes': false,
          'box-sizing': false,
          'important': false,
          'known-properties': false
        }))
    .pipe(csslint.reporter());
});

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
    gulp.src('./sass/i.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(size({gzip: true, showFiles: true, title:'uncompiled'}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('uncss', function(){
    gulp.src('./css/i.css')
        .pipe(size({gzip: true, showFiles: true, title:'pre uncss'}))
        .pipe(uncss({ html: ['index.html'], ignore: ['svg', ':hover', ':visited', ':link', ':visited'] }))
        .pipe(minifyCSS())
        .pipe(size({gzip: true, showFiles: true, title:'after uncss and minify'}))
        .pipe(rename('i.min.css'))
        .pipe(gulp.dest('css'))
});

// Initialize browser-sync which starts a static server also allows for 
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/*
   DEFAULT TASK

 • Process sass then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or sass files

*/
gulp.task('default', ['pre-process', 'minify-css', 'bs-reload', 'browser-sync'], function(){
  gulp.start('pre-process', 'csslint');
  gulp.watch('js/app.js', ['js-hint']);
  gulp.watch('sass/*.scss', ['pre-process']);
  gulp.watch('css/i.css', ['minify-css', 'bs-reload']);
  gulp.watch('*.html', ['bs-reload']);
});

