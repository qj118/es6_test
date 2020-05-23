import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']));// task 启动顺序