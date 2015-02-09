var gulp = require('gulp')
  , mocha = require('gulp-mocha')
  , sourcemaps = require('gulp-sourcemaps')
  , to5 = require('gulp-6to5')
  , concat = require('gulp-concat')

gulp.task('default', function () {
  return gulp.src(['src/**/*.js', 'tests/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(to5({ modules:'common' }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('test', ['default'], function () {
  return gulp.src('dist/all.js')
    .pipe(mocha())
})

gulp.task('watch', ['default'], function() {
  gulp.watch('src/**/*.js', ['test'])
  gulp.watch('tests/**/*.js', ['test'])
});
