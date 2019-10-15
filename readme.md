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

### 类型
#### 8种数据类型
    number string boolean 
    array object 
    null undefined
    symbol

    let num:number = 111;
    let arr:number[] = [1,2,3];
    let brr:Array<number> = [1,2,3];

    let obj: object;
    obj = { name: 'test' }
    obj = 111 // error 不能将类型“123”分配给类型“object”
    console.log(obj.name) // error 类型“object”上不存在属性“name”

    当你希望一个值必须是对象而不是数值等类型时，比如我们定义一个函数，参数必须是对象，这个时候就用到object类型了

#### TS 中补充的6个类型
```js
// tuple 元组
let tuple: [string, number, boolean];
tuple = ["a", 2, false];     

// enum 枚举
enum duke{
    name,
    age
}
console.log(duke.name,duke.age);    // 0 1

enum Roles {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  USER = 2
}
Roles.SUPER_ADMIN; // 0

enum Roles {
  SUPER_ADMIN = 1,
  ADMIN = 3,
  USER = 7
}
Roles[3] // 'ADMIN'
// 1. 如果某个字段使用了计算值或常量，那么该字段后面紧接着的字段必须设置初始值
// 2. TS 中定义的枚举，在编译后其实是对象 {SUPER_ADMIN:1, 1:'SUPER_ADMIN'}

// any 任意类型
let value: any;
value = 123;
value = "abc";
value = false;

const array: any[] = [1, "a", true];


// viod 无类型 
// void 和 any 相反，表示没有任意类型，就是什么类型都不是，这在我们定义函数，函数没有返回值时会用到

const consoleText = (text: string): void => {
  console.log(text);
};


// never 类型
// 指那些永不存在的值的类型，它是那些总会抛出异常或根本不会有返回值的函数表达式的返回值类型，当变量被永不为真的类型保护所约束时，该变量也是 never 类型
const errorFunc = (message:string):never=>{
    throw new Error(message);
}
const infiniteFunc = ():never=>{
    while(true){}
}
// never 类型是任何类型的子类型，所以它可以赋值给任何类型；而没有类型是 never 的子类型，所以除了它自身没有任何类型可以赋值给 never 类型，any 类型也不能赋值给 never 类型


// unknown 未知类型
// unknown 相对于 any 是安全的，当你指定值为 unknown 类型的时候，如果没有通过基于控制流的类型断言来缩小范围的话，是不能对他进行任何操作的，unknown 类型的值不是可以随意操作的
```

#### 交叉类型
    交叉类型就是取多个类型的并集，使用&符号定义，被&链接的过个类型构成一个交叉类型，表示这个类型同事具备这几个连接起来的类型的特点
```js
const merge=<T,U>(arg1:T,arg2:U):T & U =>{
    // 这里指定返回值的类型兼备T和U两个类型变量代表的类型的特点;
    let res = <T & U>{};
    // 这里使用Object.assign方法，返回一个合并后的对象；
    res = Object.assign(arg1,arg2);
    return res;
}
const info1={
    name:"duke"
}
const info2={
    age:18
}
const dukeinfo=merge(info1,info2);
console.log(dukeinfo.address);
//error 类型“{ name: string; } & { age: number; }”上不存在属性“address”
```

#### 联合类型
    联合类型实际是几个类型的结合，但是和交叉类型不同，联合类型是要求只要符合联合类型中任意一种类型即可，它使用|符号定义。
    当我们的程序具有多样性，元素类型不唯一时，即使用联合类型
```js
const getLength=(content:string|number):number=>{
    if(typeof content === "string"){
        return content.length
    }else{
        return content.toString().length;
    }
}
console.log(getLength("abc"))//3
console.log(getLength(123))//3
```


