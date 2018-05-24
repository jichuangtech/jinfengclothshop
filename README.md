1.flex:设置为了大于0的整数，本布局和子组件才可以进行伸缩变化；
（1）当父布局设置为flex:1，每个子布局中都设置了flex:a(b,c),则有设置flex:x属性的子布局进行按比例扩展到父布局的剩余空间
    为什么说是剩余空间呢？因为父布局中的某些布局可以没有设置flex:x属性，则该子布局是按照默认的大小，然后父布局减去其大小后
    才把剩余的大小给有设置flex:x属性的子布局们进行评分；

2.关于 React 组件的生命周期详细介绍
（1）参考 CarInfoView 组件

3.关于ES6语言的 成员变量，属性的定规方式
（1）参考 HomeScene 组件

4.为什么要使用babel
（1）因为目前部分浏览器不支持ES6语法，但大部分都是支持ES5，因此可以使用 babel将ES6转换为ES5供浏览器解析

5.关于UI界面适配的问题，目前先采用（1）方案
（1）使用Px.js工具类，
    Px.layout(number), 用来设置 width,height,paddding,margin 等尺寸，number代表美工设计的像素尺寸
    Px.text(number) 用来设置 字体大小 ,number代表美工设计的像素尺寸

6.软件版本升级-增量热更新，热更新
（1）制作增量包的命令
   react-native bundle --platform android --dev false --reset-cache --entry-file index.android.js --bundle-output ~/Downloads/index.android.bundle   --assets-dest ~/Downloads/

（2）增量热更新, 图片资源 和 脚本的热更新

7.React Native中的组件的样式只能使用 style,而 react中可以使用 className 和 style 属性;
    style的属性key值 使用驼峰式
    className属性 使用 中间斜杠