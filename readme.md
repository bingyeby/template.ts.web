## 使用typescript建立项目
### 初始化
    # 项目初始化，生成package.json
    npm init

    # 设置目录结构
    src  存放项目的开发资源
        assets 资源
        template 页面模板
        utils 公共方法
    build
    typings 模块声明文件

    # 安装相关工具
    npm i typescript
    npm i webpack webpack-cli webpack-dev-server 
    npm i clean-webpack-plugin html-webpack-plugin
    npm i ts-loader cross-env
    npm i tslint

    # typescript 初始化，生成tsconfig.json
    tsc --init

    # tslint 初始化配置，生成 tslint.json
    tslint -i

### tsconfig.json
    tsconfig.json 里默认有 4 项没有注释的配置
    "lib"这个配置项，他是一个数组，他用来配置需要引入的声明库文件，我们后面会用到ES6语法，和DOM相关内容，所以我们需要引入两个声明库文件，需要在这个数组中添加"es6"和"dom"

### tslint.json
    tslint.json
    {
        "defaultSeverity": "error",
        "extends": [
            "tslint:recommended"
        ],
        "jsRules": {},
        "rules": {},
        "rulesDirectory": []
    }

    defaultSeverity是提醒级别，如果为error则会报错，如果为warning则会警告，如果设为off则关闭，那TSLint就关闭了；
    extends可指定继承指定的预设配置规则；
    jsRules用来配置对.js和.jsx文件的校验，配置规则的方法和下面的rules一样；
    rules是重点了，我们要让TSLint根据怎样的规则来检查代码，都是在这个里面配置，比如当我们不允许代码中使用eval方法时，就要在这里配置"no-eval": true；
    rulesDirectory可以指定规则配置文件，这里指定相对路径。

### webpack使用
    安装webpack相关的npm包：webpack webpack-cli webpack-dev-server
    通过cross-env NODE_ENV=development来设置环境参数，以便在 webpack.config.js 里通过 process.env.NODE_ENV 来获取当前是开发环境还是生产环境

    配置相关使用指令：
    {
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "cross-env NODE_ENV=development webpack-dev-server --mode=development",
            "build": "cross-env NODE_ENV=production webpack --mode=production"
        }
    }

### 使用jquery
    npm i jquery
    npm i @types/jquery

