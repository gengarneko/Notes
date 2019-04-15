# Vue cli3 通用多页面脚手架

目前 vue-cli3 生成的配置是做单页面的，然而，我们有时也会有多页面的需求 。比如我们最常见的一个项目跑多个独立的小型的H5页面，这些页面不可能每一次都开一个新项目.但是在实际的项目中，我们需要这样的脚手架，参考了很多大牛的脚手架，这里提供了一种我的单页面脚手架转换为多页面脚手架的方案，供大家参考。

### 要求：

- 1.首页显示项目所有的H5链接列表；
- 2.支持小型本地收据mock,方便本地测试接口【我个人不推荐，建议mock和项目分离】

### 准备

使用vue-cli生成一个你需要的单页面项目脚手架，然后我们就可以为所欲为了，目录我就不说明了，默认大家都知道。



![img](https://user-gold-cdn.xitu.io/2018/12/8/1678d29a41b5fd4b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> 每一次新开的页面都在pages里面起一个文件夹,**文件夹名字就是H5页面名字,入口文件是文件夹的index.html和index.js**。

修改vue.config.js

```
let path = require('path')
let glob = require('glob')
let mock = require('./src/mock/index.json');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {};
	glob.sync(globPath).forEach(function(entry) {
		var tmp = entry.split('/').splice(-3);
		entries[tmp[1]] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.html',
			filename: tmp[1]
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');

module.exports = {
	lintOnSave: false, 
	baseUrl: process.env.NODE_ENV === "production" ? 'https://www.baidu.com/' : '/',
	productionSourceMap: false,
	pages,
	devServer: {
		index: '/', 
		open: process.platform === 'darwin',
		host: '',
		port: 9527,
		https: false,
		hotOnly: false,
		proxy: {
			'/xrf/': {
				target: 'http://reg.tool.hexun.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/xrf': ''
				}
			},
		}, // 设置代理
		before: app => {     
			app.get('/', (req, res, next) => {
				for(let i in pages){
					res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
				}
				res.end()
			});
			app.get('/goods/list', (req, res, next) => {  //mock数据
				res.status(299).json(mock)
			})
		}
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				options.limit = 100
				return options
			})
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if(process.env.NODE_ENV === "production") {
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);
		}
	},
	configureWebpack: config => {
		//		if(process.env.NODE_ENV === "production") {
		//			config.output = {
		//				path: path.join(__dirname, "./dist"),
		//				filename: "js/[name].[contenthash:8].js"			
		//			};
		//		}
	}
}
复制代码
```

启动项目，显示项目所有H5连接



![img](https://user-gold-cdn.xitu.io/2018/12/8/1678d2f9044a7114?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



最主要的是修改：

> before第一个参数express实例。

```
	before: app => {     
			app.get('/', (req, res, next) => {
				for(let i in pages){    //遍历项目链接
					res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
				}
				res.end()
			});
			app.get('/goods/list', (req, res, next) => {  //mock数据
				res.status(299).json(mock)
			})
		}
复制代码
```

行了，不说了，这几天北京太冷了，打字都不利索，暂且到此为止吧！

------

# vue-cli3 全面配置(持续更新)

### 其他系列

★ [Nuxt.js 全面配置](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fstaven630%2Fnuxt-config)

目录

- [√ CSS浏览器兼容前缀](https://juejin.im/post/5c0b8d74f265da6115109d68#css)
- [√ 配置多环境变量](https://juejin.im/post/5c0b8d74f265da6115109d68#env)
- [√ 配置基础 vue.config.js](https://juejin.im/post/5c0b8d74f265da6115109d68#base)
- [√ 配置 proxy 跨域](https://juejin.im/post/5c0b8d74f265da6115109d68#proxy)
- [√ 修复 HMR(热更新)失效](https://juejin.im/post/5c0b8d74f265da6115109d68#hmr)
- [√ 修复 Lazy loading routes Error： Cyclic dependency](https://juejin.im/post/5c0b8d74f265da6115109d68#lazyloading)
- [√ 添加别名](https://juejin.im/post/5c0b8d74f265da6115109d68#alias)
- [√ 压缩图片](https://juejin.im/post/5c0b8d74f265da6115109d68#compressimage)
- [√ 去除多余无效的 css](https://juejin.im/post/5c0b8d74f265da6115109d68#removecss)
- [√ 添加打包分析](https://juejin.im/post/5c0b8d74f265da6115109d68#analyze)
- [√ 配置 externals](https://juejin.im/post/5c0b8d74f265da6115109d68#externals)
- [√ 去掉 console.log](https://juejin.im/post/5c0b8d74f265da6115109d68#log)
- [√ 开启 gzip 压缩](https://juejin.im/post/5c0b8d74f265da6115109d68#gzip)
- [√ 为 sass 提供全局样式，以及全局变量](https://juejin.im/post/5c0b8d74f265da6115109d68#globalscss)
- [√ 为 stylus 提供全局变量](https://juejin.im/post/5c0b8d74f265da6115109d68#globalstylus)
- [√ 添加 IE 兼容](https://juejin.im/post/5c0b8d74f265da6115109d68#ie)
- [√ 文件上传 ali oss](https://juejin.im/post/5c0b8d74f265da6115109d68#alioss)
- [√ 完整依赖](https://juejin.im/post/5c0b8d74f265da6115109d68#allconfig)

### ☞ CSS浏览器兼容前缀

```
大家改一下看下自己package.json中的，即可。"browserslist": [
  "> 1%",
  "last 2 versions",
  "last 10 Chrome versions",
  "last 5 Firefox versions",
  "Safari >= 6",
  "ie > 8"
]
复制代码
browserList: [
		"last 20 Chrome versions",
		"last 20 Firefox versions",
		"last 20 Opera versions",
		"Explorer >= 11",
		"Safari >= 8",
		"Android >= 4.4",
		"iOS >= 8"
	],

复制代码
```

### ☞ 配置多环境变量

  通过在 package.json 里的 scripts 配置项中添加--mode xxx 来选择不同环境

  在项目根目录中新建.env, .env.production, .env.analyz 等文件

  只有以 VUE_APP 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，代码中可以通过 process.env.VUE_APP_BASE_API 访问

  NODE_ENV 和 BASE_URL 是两个特殊变量，在代码中始终可用

##### .env serve 默认的环境变量

```
NODE_ENV = 'development'
VUE_APP_BASE_API = 'https://demo.cn/api'
复制代码
```

##### .env.production build 默认的环境变量

  如果开启 ali oss,VUE_APP_SRC 配置为 ali oss 资源 url 前缀，如：'https://staven.oss-cn-hangzhou.aliyuncs.com/demo'

```
NODE_ENV = 'production'

VUE_APP_BASE_API = 'https://demo.com/api'
VUE_APP_SRC = '/'

ACCESS_KEY_ID = ''
ACCESS_KEY_SECRET = ''
REGION = 'oss-cn-hangzhou'
BUCKET = 'staven'
PREFIX = 'demo'
复制代码
```

##### .env.analyz 用于 webpack-bundle-analyzer 打包分析

  如果开启 ali oss,VUE_APP_SRC 配置为 ali oss 资源 url 前缀，如：'https://staven.oss-cn-hangzhou.aliyuncs.com/demo'

```
NODE_ENV = 'production'
IS_ANALYZ = 'analyz'

VUE_APP_BASE_API = 'https://demo.com/api'
VUE_APP_SRC = '/'

ACCESS_KEY_ID = ''
ACCESS_KEY_SECRET = ''
REGION = 'oss-cn-hangzhou'
BUCKET = 'staven'
PREFIX = 'demo'
复制代码
```

  修改 package.json

```
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "analyz": "vue-cli-service build --mode analyz",
  "lint": "vue-cli-service lint"
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 配置基础 vue.config.js

```
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
  baseUrl: './', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '',  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false,  // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {}
};
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 配置 proxy 跨域

```
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
module.exports = {
    devServer: {
        // overlay: {
        //   warnings: true,
        //   errors: true
        // },
        open: IS_PROD,
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        proxy: {
          '/api': {
            target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
            changeOrigin: true
          }
        }
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 修复 HMR(热更新)失效

```
module.exports = {
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 修复 Lazy loading routes Error： Cyclic dependency [github.com/vuejs/vue-c…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-cli%2Fissues%2F1669)

```
module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].chunksSortMode = 'none';
            return args;
        });
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 添加别名

```
const path =  require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set('@', resolve('src'))
          .set('assets', resolve('src/assets'))
          .set('components', resolve('src/components'))
          .set('layout', resolve('src/layout'))
          .set('base', resolve('src/base'))
          .set('static', resolve('src/static'));
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 压缩图片

```
npm i -D image-webpack-loader
复制代码
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: "65-90", speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      });
  }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 去除多余无效的 css

- 方案一：@fullhuman/postcss-purgecss

```
npm i -D postcss-import @fullhuman/postcss-purgecss
复制代码
```

  更新 postcss.config.js

```
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const purgecss = require("@fullhuman/postcss-purgecss");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
let plugins = [];

if (IS_PROD) {
  plugins.push(postcssImport);
  plugins.push(
    purgecss({
      content: ["./src/**/*.vue"],
      extractors: [
        {
          extractor: class Extractor {
            static extract(content) {
              const validSection = content.replace(
                /<style([\s\S]*?)<\/style>+/gim,
                ""
              );
              return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
            }
          },
          extensions: ["vue"]
        }
      ]
    })
  );
}

module.exports = {
  plugins: [...plugins, autoprefixer]
};

复制代码
```

- 方案二：purgecss-webpack-plugin

```
npm i --save-dev glob-all purgecss-webpack-plugin
复制代码
const path = require("path");
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const resolve = dir => path.resolve(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([resolve("./**/*.vue")]),
          extractors: [
            {
              extractor: class Extractor {
                static extract(content) {
                  const validSection = content.replace(
                    /<style([\s\S]*?)<\/style>+/gim,
                    ""
                  );
                  return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
                }
              },
              extensions: ["vue"]
            }
          ],
          whitelist: ["html", "body"]
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  }
};
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 添加打包分析

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    chainWebpack: config => {
        // 打包分析
        if (process.env.IS_ANALYZ) {
          config.plugin('webpack-report')
            .use(BundleAnalyzerPlugin, [{
              analyzerMode: 'static',
            }]);
        }
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 配置 externals

  防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖

```
module.exports = {
    configureWebpack: config => {
        config.externals = {
          'vue': 'Vue',
          'element-ui': 'ELEMENT',
          'vue-router': 'VueRouter',
          'vuex': 'Vuex',
          'axios': 'axios'
        }
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 去掉 console.log

##### 方法一：

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']//移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    }
}
复制代码
```

##### 方法二：使用 babel-plugin-transform-remove-console 插件

```
npm i --save-dev babel-plugin-transform-remove-console
复制代码
```

在 babel.config.js 中配置

```
const plugins = [];
if(['production', 'prod'].includes(process.env.NODE_ENV)) {
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  plugins: plugins
};

复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 开启 gzip 压缩

```
npm i --save-dev compression-webpack-plugin
复制代码
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    }
}
复制代码
```

  还可以开启比 gzip 体验更好的 Zopfli 压缩详见[webpack.js.org/plugins/com…](https://link.juejin.im/?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fcompression-webpack-plugin)

```
npm i --save-dev @gfx/zopfli brotli-webpack-plugin
复制代码
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const zopfli = require("@gfx/zopfli");
const BrotliPlugin = require("brotli-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    algorithm(input, compressionOptions, callback) {
                      return zopfli.gzip(input, compressionOptions, callback);
                    },
                    compressionOptions: {
                      numiterations: 15
                    },
                    minRatio: 0.99,
                    test: productionGzipExtensions
                })
            );
            plugins.push(
                new BrotliPlugin({
                    test: productionGzipExtensions,
                    minRatio: 0.99
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 为 sass 提供全局样式，以及全局变量

  可以通过在 main.js 中 Vue.prototype.![src = process.env.VUE_APP_SRC;挂载环境变量中的配置信息，然后在js中使用](https://juejin.im/equation?tex=src%20%3D%20process.env.VUE_APP_SRC%3B%E6%8C%82%E8%BD%BD%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E4%B8%AD%E7%9A%84%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%EF%BC%8C%E7%84%B6%E5%90%8E%E5%9C%A8js%E4%B8%AD%E4%BD%BF%E7%94%A8)src 访问。

  css 中可以使用注入 sass 变量访问环境变量中的配置信息

```
module.exports = {
    css: {
        modules: false,
        extract: IS_PROD,
        sourceMap: false,
        loaderOptions: {
          sass: {
            // 向全局sass样式传入共享的全局变量
            data: `@import "~assets/scss/variables.scss";$src: "${process.env.VUE_APP_SRC}";`
          }
        }
    }
}
复制代码
```

在 scss 中引用

```
.home {
    background: url($src + '/images/500.png');
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 为 stylus 提供全局变量

```
npm i -D style-resources-loader
复制代码
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const addStylusResource = rule => {
  rule
    .use('style-resouce')
    .loader('style-resources-loader')
    .options({
      patterns: [resolve('src/assets/stylus/variable.styl')]
    })
}
module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStylusResource(config.module.rule('stylus').oneOf(type))
    )
  }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 添加 IE 兼容

```
npm i --save @babel/polyfill
复制代码
```

  在 main.js 中添加

```
import '@babel/polyfill';
复制代码
```

配置 babel.config.js

```
const plugins = [];

module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  plugins: plugins
};

复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 文件上传 ali oss

  开启文件上传 ali oss，需要将 baseUrl 改成 ali oss 资源 url 前缀,也就是修改 VUE_APP_SRC

```
npm i --save-dev webpack-oss
复制代码
const AliOssPlugin = require('webpack-oss');

module.exports = {
    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            // 上传文件到oss
            if (process.env.ACCESS_KEY_ID || process.env.ACCESS_KEY_SECRET || process.env.REGION || process.env.BUCKET || process.env.PREFIX) {
                plugins.push(
                    new AliOssPlugin({
                        accessKeyId: process.env.ACCESS_KEY_ID,
                        accessKeySecret: process.env.ACCESS_KEY_SECRET,
                        region: process.env.REGION,
                        bucket: process.env.BUCKET,
                        prefix: process.env.PREFIX,
                        exclude: /.*\.html$/,
                        deleteAll: false
                    })
                );
            }
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    }
}
复制代码
```

[▲ 回顶部](https://juejin.im/post/5c0b8d74f265da6115109d68#top)

### ☞ 完整配置

- 安装依赖

```
npm i -D compression-webpack-plugin babel-plugin-transform-remove-console style-resources-loader
复制代码
```

  其他依赖(@gfx/zopfli、brotli-webpack-plugin、webpack-oss、glob-all、purgecss-webpack-plugin、postcss-import、@fullhuman/postcss-purgecss、image-webpack-loader)根据需求选择安装

- 环境配置

.env

```
NODE_ENV = 'development'
VUE_APP_BASE_API = 'https://demo.cn/api'
复制代码
```

.env.production

  如果开启 ali oss,VUE_APP_SRC 配置为 ali oss 资源 url 前缀，如：'https://staven.oss-cn-hangzhou.aliyuncs.com/demo'

```
NODE_ENV = 'production'

VUE_APP_BASE_API = 'https://demo.com/api'
VUE_APP_SRC = '/'

ACCESS_KEY_ID = ''
ACCESS_KEY_SECRET = ''
REGION = 'oss-cn-hangzhou'
BUCKET = 'staven'
PREFIX = 'demo'
复制代码
```

.env.analyz

  如果开启 ali oss,VUE_APP_SRC 配置为 ali oss 资源 url 前缀，如：'https://staven.oss-cn-hangzhou.aliyuncs.com/demo'

```
NODE_ENV = 'production'
IS_ANALYZ = 'analyz'

VUE_APP_BASE_API = 'https://demo.com/api'
VUE_APP_SRC = VUE_APP_SRC = '/'

ACCESS_KEY_ID = ''
ACCESS_KEY_SECRET = ''
REGION = 'oss-cn-hangzhou'
BUCKET = 'staven'
PREFIX = 'demo'
复制代码
```

- package.json

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "analyz": "vue-cli-service build --mode analyz",
    "lint": "vue-cli-service lint"
}
复制代码
```

- babel.config.js

```
const plugins = [];
// if(['production', 'prod'].includes(process.env.NODE_ENV)) {
//   plugins.push("transform-remove-console")
// }

module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  plugins: plugins
};
复制代码
```

- postcss.config.js

```
const autoprefixer = require("autoprefixer");
// const postcssImport = require("postcss-import");
// const purgecss = require("@fullhuman/postcss-purgecss");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
let plugins = [];

if (IS_PROD) {
  // plugins.push(postcssImport);
  // plugins.push(
  //   purgecss({
  //     content: ["./src/**/*.vue"],
  //     extractors: [
  //       {
  //         extractor: class Extractor {
  //           static extract(content) {
  //             const validSection = content.replace(
  //               /<style([\s\S]*?)<\/style>+/gim,
  //               ""
  //             );
  //             return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
  //           }
  //         },
  //         extensions: ["vue"]
  //       }
  //     ]
  //   })
  // );
}

module.exports = {
  plugins: [...plugins, autoprefixer]
};
复制代码
```

- vue.config.js

```
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const zopfli = require("@gfx/zopfli");
// const BrotliPlugin = require("brotli-webpack-plugin");
const AliOssPlugin = require("webpack-oss");

const path = require("path");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");

const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

// 添加stylus规则
// const addStylusResource = rule => {
//   rule
//     .use('style-resouce')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [resolve('src/assets/stylus/variable.styl')]
//     })
// }

module.exports = {
  baseUrl: IS_PROD ? process.env.VUE_APP_SRC || "/" : "./", // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map

  configureWebpack: config => {
    // cdn引用时配置externals
    // config.externals = {
    //     'vue': 'Vue',
    //     'element-ui': 'ELEMENT',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex',
    //     'axios': 'axios'
    // }

    if (IS_PROD) {
      const plugins = [];

      // 去除多余css
      // plugins.push(
      //   new PurgecssPlugin({
      //     paths: glob.sync([path.join(__dirname, "./**/*.vue")]),
      //     extractors: [
      //       {
      //         extractor: class Extractor {
      //           static extract(content) {
      //             const validSection = content.replace(
      //               /<style([\s\S]*?)<\/style>+/gim,
      //               ""
      //             );
      //             return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
      //           }
      //         },
      //         extensions: ["vue"]
      //       }
      //     ],
      //     whitelist: ["html", "body"]
      //   })
      // );

      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );

      // 上传文件到oss
      //if (process.env.ACCESS_KEY_ID || process.env.ACCESS_KEY_SECRET || process.env.REGION || process.env.BUCKET || process.env.PREFIX) {
      //    plugins.push(
      //        new AliOssPlugin({
      //            accessKeyId: process.env.ACCESS_KEY_ID,
      //            accessKeySecret: process.env.ACCESS_KEY_SECRET,
      //            region: process.env.REGION,
      //            bucket: process.env.BUCKET,
      //            prefix: process.env.PREFIX,
      //            exclude: /.*\.html$/,
      //            deleteAll: false
      //        })
      //    );
      //}

      // Zopfli压缩，需要响应VC库 https://webpack.js.org/plugins/compression-webpack-plugin/
      // plugins.push(
      //     new CompressionWebpackPlugin({
      //         algorithm(input, compressionOptions, callback) {
      //             return zopfli.gzip(input, compressionOptions, callback);
      //         },
      //         compressionOptions: {
      //             numiterations: 15
      //         },
      //         minRatio: 0.99,
      //         test: productionGzipExtensions
      //     })
      // );
      // plugins.push(
      //     new BrotliPlugin({
      //         test: productionGzipExtensions,
      //         minRatio: 0.99
      //     })
      // );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);

    // 修复Lazy loading routes Error： Cyclic dependency  [https://github.com/vuejs/vue-cli/issues/1669]
    config.plugin("html").tap(args => {
      args[0].chunksSortMode = "none";
      return args;
    });

    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("static", resolve("src/static"));

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }

    // 压缩图片
    // config.module
    //   .rule("images")
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: "65-90", speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   });

    // stylus
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type =>
    //   addStylusResource(config.module.rule('stylus').oneOf(type))
    // )

    // 多页面配置，为js添加hash
    // config.output.chunkFilename(`js/[name].[chunkhash:8].js`)

    // 修改图片输出路径
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //       name: path.join('../assets/', 'img/[name].[ext]')
    //   })
  },
  css: {
    modules: false,
    extract: IS_PROD,
    // 为css后缀添加hash
    // extract: {
    //  filename: 'css/[name].[hash:8].css',
    //  chunkFilename: 'css/[name].[hash:8].css'
    //}，
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量
        // data: `@import "~assets/scss/variables.scss";$src: "${process.env.VUE_APP_SRC}";`
        data: `$src: "${process.env.VUE_APP_SRC}";`
      }
      // px转换为rem
      // postcss: {
      //   plugins: [
      //     require('postcss-pxtorem')({
      //       rootValue : 1, // 换算的基数
      //       selectorBlackList  : ['weui', 'el'], // 忽略转换正则匹配项
      //       propList   : ['*']
      //     })
      //   ]
      // }
    }
  },
  pluginOptions: {
    // 安装vue-cli-plugin-style-resources-loader插件
    // 添加全局样式global.scss
    // "style-resources-loader": {
    //   preProcessor: "scss",
    //   patterns: [
    //     resolve(__dirname, "./src/scss/scss/variables.scss")
    //   ]
    // }
  },
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    open: IS_PROD,
    host: "0.0.0.0",
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API || "http://127.0.0.1:8080",
        changeOrigin: true
      }
    }
  }
};
```