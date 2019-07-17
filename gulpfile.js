const { watch, series, parallel, src, dest } = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
// const imagemin = require('gulp-imagemin');
// const image = require('gulp-image');

// GET GULP INJECT

function js(cb) {
  return src('src/js/**')
  // .pipe(babel({
  //   presets: ['@babel/env']
  // }))
  .pipe(concat('app.js'))
  .pipe(minify())
  .pipe(dest('build/'));
  cb();
}

function boot(cb) {
  return src('src/scss/**')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/css'));
    cb();
}

function css(cb) {
  return src('src/css/**')
  .pipe(concat('style.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest('build/'));
  cb();
}

// function images(cb) {
//   return src('src/images/*')
//   .pipe(imagemin())
//   .pipe(image())
//   .pipe(dest('build/images'))
//   cb();
// }

// exports.images = images;
exports.js = js;
exports.boot = boot;
exports.css = series(boot,css);
// exports.css = css;
exports.all = parallel(js, series(boot,css));
// exports.all = parallel(js, css);
watch('src/css/**', css);
watch('src/js/**', js);
// watch('src/images/**', images);
watch('src/scss/**', series(boot,css));