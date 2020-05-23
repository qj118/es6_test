import gulp from 'gulp';
import gulpif from 'gulp-if';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import {log, colors} from 'gulp-util';
import args from './util/args';

gulp.task('scripts', () => {
    return gulp.src(['app/js/index.js']) // 读取文件
        .pipe(plumber({
            errorHandle: function(){
            }
        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest('server/public/js')) // 保存文件
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))
        .pipe(uglify({compress: {properties: false}, output: {'quote_keys': true}})) // 压缩文件
        .pipe(gulp.dest('server/public/js')) // 压缩后再保存
        .pipe(gulpif(args.watch, livereload())) // 监听刷新
});