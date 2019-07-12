const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp
    .src('./resource/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe(gulp.dest('./docs/css'));
});

gulp.task('pug', function() {
  return gulp
    .src('./resource/pug/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('./docs/'));
});

gulp.task('server', function() {
  browserSync.init({
    server: './docs/',
  });

  gulp.watch('./resource/sass/*.scss', gulp.task('sass'));
  gulp.watch('./resource/pug/*.pug', gulp.task('pug'));
  gulp.watch('./docs/*.html').on('change', browserSync.reload);
  gulp.watch('./docs/css/*.css').on('change', browserSync.reload);
});

gulp.task('serverReload', function() {
  browserSync.reload();
});

gulp.task('serverNoWatch', function() {
  browserSync.init({
    server: './',
  });
});
