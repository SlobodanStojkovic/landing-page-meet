import pkg from "gulp";
const { src, dest, watch, series, parallel } = pkg;
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import prefix from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import terser from "gulp-terser";
import gulp from "gulp";
import imagemin from "gulp-imagemin";

//compile, prefix, and min scss
function compilescss() {
  return src("src/scss/*.scss") // change to your source directory
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(cleanCss())
    .pipe(dest("dist/css")); // change to your final/public directory
}

// minify js
function jsmin() {
  return src("src/js/*.js") // change to your source directory
    .pipe(terser())
    .pipe(dest("dist/js")); // change to your final/public directory
}

//minimize images
function minimizeImages() {
  return gulp
    .src("src/images/*") // change to your source directory
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images")); // change to your final/public directory
}

//watchtask
function watchTask() {
  watch("src/scss/**/*.scss", compilescss); // change to your source directory
  watch("src/js/*.js", jsmin); // change to your source directory
}

// Default Gulp task
export const dev = series(compilescss, jsmin, minimizeImages, watchTask);
export default dev;
