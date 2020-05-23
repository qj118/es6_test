import gulp from 'gulp';
import args from './util/args';

gulp.task('browser', (cb) => {
    if(!args.watch) return cb();
    gulp.watch('app/**/*.js', ["scripts"]); // 文件的监听，监听到 js 文件，运行 scripts task
    gulp.watch('app/**/*.ejs', ["pages"]);
    gulp.watch('app/**/*.css', ["css"]);
});