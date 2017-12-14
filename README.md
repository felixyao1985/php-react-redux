# React Kit

 
---

# 特性

- [x] react + redux + router&webpack
- [x] sass模块化
- [x] 支持异步加载

# 文件结构

```
.
├── bin                                 # 脚本文件夹
│   ├── compile.js                      # NPM commond: babel-node bin/compile
├── build                               # 构建工具文件夹
│   ├── webpack.compiler.js             # 配置：Webpack 构建脚本
│   ├── webpack.config.js               # 配置：Webpack 构建客户端渲染配置
├── config                              # 配置文件夹
│   ├── index.js                        # 主配置文件
│   └── environment.js                  # 环境配置文件
├── dist                                # 最终发布的前端资源文件夹
└── resources                           # 前端代码库
    ├── common				# 公共方法目录
    ├── containers			# 核心组件目录
    ├── page				# 主引导页面文件目录
    ├── public				# 静态公共文件目录
    ├── store				# redux store设置目录 
    └── utils				# 工具类

```

# 备忘录
```
--1、bin/complie.js   含有公共静态文件 copy  并将dist文件复制进本地服务器项目中
--2、resources/utils  异步设置store数据
--2、resources/store  reducers.js injectReducer 方法进行store注入

```


# 快速开始

## 安装

````bash
$ npm install
````

## 编译

````bash
$ npm run deploy

## 发布本机服务器

````bash
$ npm run deploy:go