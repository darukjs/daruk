const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const rimraf = require('rimraf');
const exec = require('child_process').exec;

gulp.task('move:build', () => moveDirToExample('build/**/*', '/node_modules/daruk'));

gulp.task('move:types', () => moveDirToExample('types/**/*', '/node_modules/@types/daruk'));

gulp.task('move', gulp.parallel('move:build', 'move:types'));

gulp.task('build', (cb) => exec('npm run build', cb));

gulp.task('watch:src', () => {
  const watcher = gulp.watch('src/**/*.ts');
  watcher.on('all', gulp.series('build', 'move:build'));
});

gulp.task('watch:types', () => {
  const watcher = gulp.watch('types/**/*.d.ts');
  watcher.on('all', gulp.series('build', 'move:types'));
});

gulp.task('watch', gulp.parallel('watch:src', 'watch:types'));

gulp.task('build:watch', gulp.series('move', 'watch'));

function moveDirToExample(src, dest) {
  const getDirs = (base) => getFolders(base).map((path) => `${base}/${path}`);
  const examplesDirs = getDirs('example');
  let stream = gulp.src([src]);
  examplesDirs.forEach((dir) => {
    rimraf.sync(dir + dest);
    stream = stream.pipe(gulp.dest(dir + dest));
  });
  return stream;
}

function getFolders(dir) {
  return fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
}
