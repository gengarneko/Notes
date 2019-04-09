# vue 多页开发环境 + 开发思路

## vue-multi-device-single-page

> 多个单页应用整个的 vue 工程的开发环境
>
> vue 工程的目录设置

### 本文内容

1. vue + vuex + vue-resource + vue-router 的工程目录设计
2. 基于 vue-cli 的多个 vue 单页应用的开发环境搭建

### 目录

> 一、开发环境使用
>
> 二、需求分析
>
> 三、开发思路
>
> 四、src 目录设计及思路
>
> 五、开发环境开发
>
> 六、整个开发环境的目录注释

## 一、开发环境使用

### 多终端路径设置

1. 在 `src/device/` 目录下添加终端（页面）路径，如：`src/device/pc/`
2. 在新添加的文件下加入这个终端（页面）使用的打包模板，命名为 `index.html`，如：`src/device/pc/index.html`
3. 在新添加的文件下加入这个终端（页面）使用的入口文件，命名为 `index.js`，如：`src/device/pc/index.js`

### Build 打包

> 打生产环境的包，会自动把不同终端的文件按终端名称分开

![](https://segmentfault.com/img/remote/1460000009543208?w=821&h=441)

> `npm run build 'device'`
>
> - `device`：接受的参数，在 `/build/device-conf..js` 里面有限制
>
> 示例：`npm run build pc` 打一个 pc 端的包
>
> `npm run build-all`
>
> 打所有终端的包

### dev 开发

> `npm run dev`
>
> 开始进行调试，基于 `vue-cli` 的，所以基本是 `vue-cli` 的

1. 自动打开一个网页，从这里选择要调试的终端

   ![](https://segmentfault.com/img/remote/1460000009543209?w=338&h=251)

2. 开始调试

   ![](https://segmentfault.com/img/remote/1460000009543204?w=711&h=721)

## 二、需求分析

需求：

1. 要开发 pc 端 + 移动端 + app 混合开发的页面，每个页面都是单页面应用
2. 为了节约开发成本，这几个端要共用一些组件和方法
3. 打包要方便，调试要方便
4. vue 驱动的多页应用

几个问题：

1. vue-cli 提供了非常好的开发环境，我能否在这个基础上进行整理，解决需求 2、3？
2. vue + vuex + vue-resource + vue-router 的工程目录应该怎么设计？

> 面对这样的需求，我的理解是把多个单页应用融合到一个工程里面

这个工程是啥

> github <https://github.com/vincentmrlau/vue-multi-device-single-page>，欢迎交流
>
> 多端的单页应用的 vue 工程的开发环境，本质上是多个单页面
>
> 基于 vue，整合了 vuex vue-resource vue-router 的开发目录设计
>
> 整个基于 vue-cli 生成的目录进行修改，除了 test（正在研究）外的功能均可使用

## 三、开发思路

1. 设置公用组件的目录
2. 抽离 api，分为公用的 api 和属于各个页面自己的 api
3. 每个单页应用 vuex 管理状态
4. 可能会被多人同时编辑，如何尽量减少 merge
5. 针对这样的需求的 src 下面的目录应该怎么设计
6. 针对需求配置开发环境

## 四、src 目录设计及思路

> 介绍 src 的目录设置及其作用
>
> 介绍 界面 - 模板 html - 组件 - store - 接口 的关系

### 概况两图流

1. pc 主页示意图

   ![](https://segmentfault.com/img/remote/1460000009543204?w=711&h=721)

2. 分析图

   ![](https://image-static.segmentfault.com/331/355/3313558820-59256894d02fe)

### 目录设置及其作用

```
├─src            # 源文件目录
│  │  config.js
│  │  
│  ├─api        # 多端共用的 api
│  │      device-root.js
│  │      middleware.js
│  │      
│  ├─assets        # 多端共用的 资源
│  │      logo.png
│  │      
│  ├─components    # 多端共用的 组件
│  │      RootCommonComponent.vue
│  │      
│  └─device        # 设备入口 
│      ├─app    # 混合开发的放这里了，也可以分 ios 和 安卓
│      │      index.html    # app专用的html模板，打包好的东西会自动注入
│      │      index.js        # app的入口文件
│      │      
│      ├─mobile        # 这里放移动端的页面 ，下面的 index文件作用类似其他端
│      │      index.html    
│      │      index.js
│      │      
│      └─pc            # 这个目录下的都是pc端使用的，当然其他端要用也可以
│          │  App.vue        # 入口组件
│          │  index.html    # 模板文件
│          │  index.js        # 入口文件
│          │  
│          ├─api            # 分离开接口
│          │      home.js    # home这个模块用的接口
│          │      middleware.js            # 一些公用的中间件
│          │      
│          ├─assets            # 资源
│          ├─components        # 组件
│          │  ├─commonComponents    # 公共组件
│          │  │      Header.vue
│          │  │      
│          │  ├─Home    # home这个模块用的组件
│          │  │      Body.vue
│          │  │      Index.vue
│          │  │      
│          │  └─Page404    # 404这个模块用的组件
│          │          Index.vue
│          │          
│          ├─router        # 路由
│          │      index.js
│          │      
│          ├─store        # vuex 的store
│          │  │  index.js    # 根级别的store + 模块组装
│          │  │  
│          │  └─modules        # store 模块
│          │          home.js    # home这个模块使用的store
│          │          
│          └─types            # 放类型名称
│                  home.js    # home这个模块使用的 types
│                  root.js    # 公用的types
```

### 界面 - 模板 - 组件 的关系

> 界面：最后展现在用户面前的
>
> 模板：用来注入打包的 HTML 文件
>
> 组件：编写的 vue 组件

它们的关系：

![](https://segmentfault.com/img/remote/1460000009543206?w=440&h=368)

### 组件 - store - api 的关系

> store：vuex
>
> api：vue-resource

1. 组件使用 store：
   1. 通过辅助函数（`mapGetters` 等）把 `store` 的属性映射到组件中使用
   2. 组件通过 `action` 来提交 `mutation` 修改状态
   3. 也可以通过 `$store` 来使用
2. 组件使用 api：
   1. 组件通过 `store` 的 `action` 使用 api
3. store 内部安排
   1. 由 `mutation` 来修改状态
   2. 由 `action` 来提交 `mutation`
4. 由 `store` 的 `action` 来调用 api
5. api 里面分离中间件，按需调用

看图：

![](https://image-static.segmentfault.com/208/408/2084085654-59256897aef5b)

## 五、开发环境

> 在 vue-cli 生产的开发环境的基础上进行修改

新增加：`build/device-conf.js` 用来出路多终端（页面）开发相关问题

```js
var chalk = require('chalk')
var glob = require('glob')

// 获取 deviceList
var deviceList = []
var deviceSrcArray = glob.sync('./src/device/*')
for (var x in deviceSrcArray) {
  deviceList.push(deviceSrcArray[x].split('/')[3])
}

// 检测输入的参数是否在允许的 list 中
var checkDevice = function () {
  var device = process.env.DEVICE_ENV
  var result = false
  // 检查 deviceList 是否有重复
  var hash = {}
  var repeatList = []
  for (var i = 0; i < deviceList.length; i++) {
    if (hash[deviceList[i]]) {
      repeatList.push(deviceList[i])
    }
    hash[deviceList[i]] = true
  }
  if (repeatList.length > 0) {
    console.log(chalk.bgRed('deviceList 有重复'))
    console.log(chalk.bgRed(repeatList.toString()))
    return result
  }
  for (var k in deviceList) {
    if (device === deviceList[k]) {
      result = device
      break
    }
  }
  if (result === false) {
    console.log(chalk.bgRed('参数错误，允许的参数为：'))
    console.log(chalk.bgRed(deviceList.toString()))
  }
  return result
}

exports.deviceList = deviceList
exports.checkDevice = checkDevice
// 其他依赖
exports.polyfills = ['babel-polyfill']
```

### 添加：`/build/build-all.js`

> 内部根据 `deviceList` 产生运行 `build.js` 子进程，完成打包

```js
var execFileSync = require('child_process').execFileSync;
var path = require('path')
var deviceList = require('./device-conf').deviceList || []

var buildFile = path.join(__dirname, 'build.js')

for( var x in deviceList){
  console.log('building :',deviceList[x])
  execFileSync( 'node', [buildFile, deviceList[x]], {

  })
}
```

### 修改 `/build/build.js`

> 修改设置环境变量并检查参数代码

```js
var chalk = require('chalk')
// 设置 process.env.DEVICE_ENV 参数
// 没有则返回错误
var device = process.argv[2]
var checkDevice = require('./device-conf').checkDevice
if (device) {
  process.env.DEVICE_ENV = device
  if (!checkDevice()) {
    return false
  }
} else {
  console.log(chalk.bgRed('错误：缺少参数，详情请看 README.md'))
  return false
}
```

### 修改 `/build/build.js`

1. 添加一个路由（在使用中间件 `connect-history-api-fallback` 之前添加），把可调式的入口展示出来

   ```js
   // 写一个小路由，打开浏览器的时候可以选一个开发路径
   var deviceList = require('./device-conf').deviceList || []
   var sentHref = ''
   for (var x in deviceList) {
     sentHref += '<a href="/' + deviceList[x] + './index.html">点我调试终端：' + deviceList[x].toString() + '</a><br>'
   }
   app.get('/devDeviceList', (req, res, next) => {
     res.send(sentHref)
   })
   ```

2. 修改打开的默认连接

   ```js
   opn(uri + '/devDeviceList')
   ```

### 修改 `/config/index.js` 主要修改模板入口，打包出口等

```js
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var device = process.env.DEVICE_ENV || 'undefined'

// 入口模板路径
var htmlTemplate = './src/device/' + device + '/index.html'

module.exports = {
  build: {
    env: require('./prod.env'),
    // 加入 html 入口
    htmlTemplate: htmlTemplate,
    index: path.resolve(_dirname, '../dist', device, 'index.html'),
    assetsRoot: path.resolve(_dirname, '../dist', device),
    assetsSubDirectory: 'static',
    // 这里的路径改成相对路径
    // 原来是：assetsPublicpath: '/',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
```

### 修改 `/build/webpack.dev.conf.js`

> 主要修改了入口配置，出口配置，以及模板文件配置

```js
// 获取 device
var device = process.env.DEVICE_ENV

var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var htmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 设置设备相关信息引入
var deviceList = require('./device-conf').deviceList
// 其它依赖
var extraPolyfill = require('./device-conf').polyfills || []

// 设置入口
var entry = {}
// 设置 html 插件模板入口和依赖
var htmlPluginConf = []
for (var x in deviceList) {
  // 设置入口
  entry[deviceList[x]] = extraPolyfill.concat(
  	['./build/dev-client'],
    './src/device' + deviceList[x] + '/index.js'
  )
  var _htmlPlugin = new HtmlWebpackPlugin({
    filename: deviceList[x] + '/index.html',
    template: './src/device' +deviceList[x] + '/index.html',
    chunks: [deviceList[x]]
  })
  htmlPluginConf.push(_htmlPlugin)
}

// add hot-reload related code to entry chunks
// 把热重载所需的代码也打包进去
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })

// 删除的 entry 和 output
try {
  delete baseWebpackConfig.entry
} catch (e) {
  conosle.log(e)
}
try {
  delete baseWebpackConfig.output
} catch (e) {
  conosle.log(e)
}

module.exports = merge(baseWebpackConfig, {
  // 设置入口
  entry: entry,
  // 设置出口
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: config.dev.htmlTemplate,
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ].concat(htmlPluginConf)
})
```

### 修改 `/build/webpack.prod.conf.js`

> 主要修改了入口配置，出口配置，以及模板文件配置

```js
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

// 设置device相关变量
var device = process.env.DEVICE_ENV
//设置入口
var extraPolyFill = require('./device-conf').polyfills ||[]
var entry = {
  index: extraPolyFill.concat('./src/device/' + device + '/index.js')
}

console.log(config.build.htmlTemplate)
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // 写入prod的入口
  entry: entry,
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist pc.html with correct asset hash for caching.
    // you can customize output by editing /pc.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      // template: 'index.html',
      template: config.build.htmlTemplate,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
```

## 六、整个开发环境的目录注释

```
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .postcssrc.js
│  index.html
│  npm-debug.log
│  package.json
│  README.md
│  tree.txt
│          
├─build   # 这里是打包工具相关的
│      build-all.js # 通过打包所有端的代码
│      build.js        # 这里设定进程的环境变量
│      check-versions.js
│      dev-client.js  
│      dev-server.js    # 这里也需要对进程的环境变量进行设定
│      device-conf.js    # 这里面有关于多端开发、打包的相关设定
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js        # 修改了入口、出口等
│      webpack.dev.conf.js        # 修改了入口、出口等
│      webpack.prod.conf.js        # 修改了入口出口等
│      webpack.test.conf.js        # 测试相关还未完善
│      
├─config
│      dev.env.js
│      index.js                    # 打包的入口和出口
│      prod.env.js
│      test.env.js
│      
├─dist        # 最后打包的目录 分端储存
│  ├─app
│  │  │  index.html
│  │  │  
│  │  └─static
│  │      └─js
│  │              index.0142f89e3523b3b0d16b.js
│  │              index.0142f89e3523b3b0d16b.js.map
│  │              manifest.57f6691c595e842abc95.js
│  │              manifest.57f6691c595e842abc95.js.map
│  │              vendor.cce790f63359fc27fa7d.js
│  │              vendor.cce790f63359fc27fa7d.js.map
│  │              
│  ├─mobile
│  │  │  index.html
│  │  │  
│  │  └─static
│  │      └─js
│  │              index.0142f89e3523b3b0d16b.js
│  │              index.0142f89e3523b3b0d16b.js.map
│  │              manifest.57f6691c595e842abc95.js
│  │              manifest.57f6691c595e842abc95.js.map
│  │              vendor.cce790f63359fc27fa7d.js
│  │              vendor.cce790f63359fc27fa7d.js.map
│  │              
│  └─pc
│      │  index.html
│      │  
│      └─static
│          ├─css
│          │      index.1e809171f3a961de951e3c8e6644435f.css
│          │      index.1e809171f3a961de951e3c8e6644435f.css.map
│          │      
│          └─js
│                  0.f3e74a76d92b3f6ca5ec.js
│                  0.f3e74a76d92b3f6ca5ec.js.map
│                  1.fb471d3425df8c16ac54.js
│                  1.fb471d3425df8c16ac54.js.map
│                  index.a2ba631673923f812cf1.js
│                  index.a2ba631673923f812cf1.js.map
│                  manifest.ab6461111db19541d04b.js
│                  manifest.ab6461111db19541d04b.js.map
│                  vendor.aeee805b1efff3748018.js
│                  vendor.aeee805b1efff3748018.js.map
│                  
├─images         # 这个放点文档写文档用的图片                        
├─sever            # 这里写点服务端程序，用于测试等
│      prod-view-server.js
│      
├─src            # 源文件目录
│  │  config.js
│  │  
│  ├─api        # 多端共用的 api
│  │      device-root.js
│  │      middleware.js
│  │      
│  ├─assets        # 多端共用的 资源
│  │      logo.png
│  │      
│  ├─components    # 多端共用的 组件
│  │      RootCommonComponent.vue
│  │      
│  └─device        # 设备入口 
│      ├─app    # 混合开发的放这里了，也可以分 ios 和 安卓
│      │      index.html    # app专用的html模板，打包好的东西会自动注入
│      │      index.js        # app的入口文件
│      │      
│      ├─mobile        # 这里放移动端的页面 ，下面的 index文件作用类似其他端
│      │      index.html    
│      │      index.js
│      │      
│      └─pc            # 这个目录下的都是pc端使用的，当然其他端要用也是可以的，哈哈
│          │  App.vue        # 入口组件
│          │  index.html    # 模板文件
│          │  index.js        # 入口文件
│          │  
│          ├─api            # 分离开接口
│          │      home.js    # home这个模块用的接口
│          │      middleware.js            # 一些公用的中间件
│          │      
│          ├─assets            # 资源
│          ├─components        # 组件
│          │  ├─commonComponents    # 公共组件
│          │  │      Header.vue
│          │  │      
│          │  ├─Home    # home这个模块用的组件
│          │  │      Body.vue
│          │  │      Index.vue
│          │  │      
│          │  └─Page404    # 404这个模块用的组件
│          │          Index.vue
│          │          
│          ├─router        # 路由
│          │      index.js
│          │      
│          ├─store        # vuex 的store
│          │  │  index.js    # 根级别的store + 模块组装
│          │  │  
│          │  └─modules        # store 模块
│          │          home.js    # home这个模块使用的store
│          │          
│          └─types            # 放类型名称
│                  home.js    # home这个模块使用的 types
│                  root.js    # 公用的types
│                  
├─static
│      .gitkeep
│      
└─test    # 测试相关 TODO
```

