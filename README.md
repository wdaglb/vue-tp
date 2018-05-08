ThinkPHP 5.1 + Vue
===============

ThinkPHP5.1 + Vue多页面应用


> 环境要求：ThinkPHP > 5.1


## 目录结构

初始的目录结构如下：

~~~
www  WEB部署目录（或者子目录）
├─application           应用目录
│
├─config                应用配置目录
│
├─public                WEB目录（对外访问目录）
│  └─lib                编译后资源目录
│
├─thinkphp              Thinkphp核心目录
│
├─resources             web资源目录
│  │ assets             js/css等未编译目录
│  └─views              模板目录
~~~

> 须知

1. 每个模板都需要引入__LIB__/vendor.js
2. assets里的文件会原样编译到/public/lib/
3. 使用webpack 编译js
4. 使用webpack --watch 监听修改,热更新js
