const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');

function handleError(e) {
  console.log('error in build', e.message, e.stack);
  this.emit('end');
}

gulp.task('moveHtml', () => {
  return gulp.src('Geolocatorwithplaces.html')
    .pipe(gulp.dest('public'));
});

gulp.task('styles', () => {
  return gulp.src('Geolocatorwithplaces.css')
    .pipe(less())
    .pipe(gulp.dest('public'));
});

gulp.task('buildJs', () => {
  return gulp.src('Geolocatorwithplaces.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', handleError)
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['moveHtml', 'styles', 'buildJs']);

gulp.task('default', () => {
  gulp.watch('Geolocatorwithplaces.js', ['buildJs']);
  gulp.watch('Geolocatorwithplaces.html', ['moveHtml']);
  gulp.watch('Geolocatorwithplaces.css', ['styles']);
});