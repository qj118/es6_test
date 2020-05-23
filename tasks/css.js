import gulp from 'gulp';

gulp.task('css', () => {
    return gulp.src('app/**/*.css')
        .pipe(gulp.dest('server/public'))
});