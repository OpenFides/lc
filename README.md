JSON Form
=========

通过拖拽widget到布局中，选择setting进入widget配置界面。

## 业务流程

1. 到得所有元素: 正常html元素的属性中通过冒号绑定属性项，通过@绑定方法函数，<script>中可以配置schema和methods。
2. 根据绑定的属性生成对应的编辑界面，采用双向绑定技术。
3. 保存配置信息，后端生成对应访问页。

## 使用方法

通过下面的命令生成js lib (在dist目录中)
``` shell
yarn run build 
```

在html中引用js lib.
``` js
 var jsonForm = new JsonForm("#box", "#widget"); 
```

## 重点技术

1. 沙箱技术，防止非法js：with function & Proxy
2. 双向绑定技术: Object.defineProperty & vDOM & Watcher