fs = require "fs"
del = require "del"
gulp = require "gulp"
map = require "vinyl-map"
gulpif = require "gulp-if"
gutil = require "gulp-util"
webpack = require "webpack"
rename = require "gulp-rename"
plumber = require "gulp-plumber"
replace = require "gulp-replace"
runSequence = require "run-sequence"

WebpackDevServer = require "webpack-dev-server"
webpackConfig = require "./webpack.config.js"

myDevConfig = Object.create webpackConfig
myDevConfig.devtool = "sourcemap"
myDevConfig.debug = true

webpackCompiler = webpack myDevConfig

gulp.task "watch", ->
  gulp.watch ["./src/modules/*.js", "./src/tests/*.js"], ["webpack:dev"]
  gulp.watch ["./src/plugins/chrome/*.json"], ["copy:extFiles"]


gulp.task "copy:extFiles", ->
  gulp.src "./src/plugins/chrome/**"
  .pipe gulp.dest "./build"


gulp.task "webpack:dev", (cb)->

  webpack(myDevConfig).run (err, stats)->
    if err
      throw new gutil.PluginError "webpack:dev", err

    gutil.log "[webpack:dev]", stats.toString(colors: true)
    cb()


gulp.task "webpack:server", (cb)->

  new WebpackDevServer(webpack(myDevConfig), {
    contentBase: "#{__dirname}/src/public"
    publicPath: "/brex"
    stats:
      colors: true
  }).listen 8080, "localhost", (err)->
    if err
      throw new gutil.PluginError "webpack:server", err

    gutil.log "[webpack:server]", "http://localhost:8080/webpack-dev-server/"
    cb()


gulp.task "default", (cb)->
  runSequence(
    "copy:extFiles"
    [
      "webpack:server"
    ],
    "watch"
    cb
  )