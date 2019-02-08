//=> 将index.less文件 编译并压缩成css文件
lessc css/index.less css/index.min.css -x

//=> 用babel将drag.js 编译成ES5语法并监听
安装 babel-preset-latest babel-preset-stage-2
babel js/drag.js -o  js/dragES5.js -w
