var gulp = require('gulp'),
    watch = require('gulp-watch');

var src = [
    './Our.Umbraco.MaintenanceModeV8/App_Plugins'],
    dest = './MaintenanceMode.SiteV8/App_Plugins';

gulp.task('monitor', function () {
    // Endless stream mode
    return watch(src + '/**/*', { ignoreInitial: false, verbose: true })
        .pipe(gulp.dest(dest));
});

gulp.task('default', 'monitor');