/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _json_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json_form */ \"./src/json_form.js\");\n\r\n\r\nwindow.JsonForm = _json_form__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n//var jsonForm = new JsonForm(\"#box\", \"#component\");\r\n\n\n//# sourceURL=webpack://jsonform/./src/index.js?");

/***/ }),

/***/ "./src/json_form.js":
/*!**************************!*\
  !*** ./src/json_form.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _vm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vm */ \"./src/vm.js\");\n\r\nclass JsonForm {\r\n    constructor(box, widget) {\r\n        JsonForm.counter = JsonForm.counter ? JsonForm.counter++ : 0;\r\n        this.init(document.querySelector(box), Array.from(document.querySelector(widget).children));\r\n    }\r\n    init(box, widgets) {\r\n        var _this = this;\r\n        //经过事件\r\n        box.ondragover = function (e) {\r\n            e.preventDefault();\r\n        };\r\n\r\n        //放下事件  \r\n        box.ondrop = function (e) {\r\n            console.log(\"event: \", e);\r\n            var node = document.querySelector(\"#\" + e.dataTransfer.getData(\"sid\"));\r\n            if (!node.cloned) {\r\n                console.log(\"clone\", node);\r\n                node = node.cloneNode(true);\r\n                node.cloned = true;\r\n                node.id = \"item\" + JsonForm.counter++;\r\n                console.log(\"id\", node.id);\r\n                node.ondragstart = function (e) {\r\n                    console.log(\"sid\", e.target.id);\r\n                    e.dataTransfer.setData(\"sid\", e.target.id);\r\n                };\r\n                node.className = node.className.replace(\" selected\", \"\")\r\n                node.onclick = e => {\r\n                    _this.bind(e, node);\r\n                };\r\n            }\r\n\r\n            if (e.target != this) {\r\n                var parent = _this.getParent(e.target, this);\r\n                var root = this;\r\n                setTimeout(function () {\r\n                    root.insertBefore(node, parent);\r\n                }, 0);\r\n            } else {\r\n                this.appendChild(node);\r\n            }\r\n        }\r\n        //启动拖拽\r\n        widgets.forEach(item => {\r\n            if (!item.draggable) {\r\n                item.draggable = true;\r\n                item.id = \"sid\" + JsonForm.counter++;\r\n                item.ondragstart = function (e) {\r\n                    console.log(\"sid\", e.target.id);\r\n                    e.dataTransfer.setData(\"sid\", item.id);\r\n                };\r\n                item.onmouseover = e => {\r\n                    item.className += \" selected\";\r\n                }\r\n                item.onmouseout = e => {\r\n                    item.className = item.className.replace(\" selected\", \"\")\r\n                }\r\n            }\r\n        });\r\n    }\r\n\r\n    createProxy() {\r\n        const proxy = new Proxy({}, {\r\n            // 拦截所有属性，防止到 Proxy 对象以外的作用域链查找。\r\n            has(target, key) {\r\n                if (key === \"schema\" || key === \"data\" || key === \"methods\") {\r\n                    return true;\r\n                }\r\n                return false;\r\n            },\r\n            set(target, key, value) {\r\n                if (this.has(target, key)) {\r\n                    return Reflect.set(target, key, value);\r\n                }\r\n            },\r\n            get(target, key, receiver) {\r\n                // 加固，防止逃逸\r\n                if (key === Symbol.unscopables) {\r\n                    return undefined;\r\n                }\r\n                if (key === \"target\") {\r\n                    return target;\r\n                }\r\n                if (this.has(target, key)) {\r\n                    return Reflect.get(target, key, receiver);\r\n                }\r\n                return undefined;\r\n            },\r\n        });\r\n        return proxy;\r\n    }\r\n    compileCode(code) {\r\n        code = `with(sandbox) { ${code} }`;\r\n        const fn = new Function('sandbox', code);\r\n        return fn;\r\n    }\r\n\r\n    bind(e, node) {\r\n        var settings = document.querySelector(\"#app\");\r\n        settings.innerText = \"\";\r\n        var options = this.createProxy();\r\n\r\n        var script = node.querySelector(\"script\");\r\n        if (script) {\r\n            this.compileCode(script.innerText).call(options, options);\r\n        }\r\n        var vm = new _vm__WEBPACK_IMPORTED_MODULE_0__[\"default\"](options.target, node, settings);\r\n    }\r\n\r\n    getParent(child, parent) {\r\n        if (!child.parentNode) {\r\n            return child;\r\n        }\r\n        if (child.parentNode == parent) {\r\n            return child;\r\n        }\r\n        return this.getParent(child.parentNode, parent);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JsonForm);\n\n//# sourceURL=webpack://jsonform/./src/json_form.js?");

/***/ }),

/***/ "./src/vm.js":
/*!*******************!*\
  !*** ./src/vm.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ViewModel)\n/* harmony export */ });\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watcher */ \"./src/watcher.js\");\n\n\nclass ViewModel {\n    constructor(model, node, el) {\n        this.data = Object.assign({}, model.data);\n        this.schema = Object.assign({\n            default: {\n                type: \"string\",\n                title: \"默认\",\n                description: \"请输入默认值！\",\n            },\n            title: {\n                type: \"string\",\n                title: \"标题\",\n                description: \"请输入标题！\",\n            }, placeholder: {\n                type: \"string\",\n                title: \"占位\",\n                description: \"请输入占位！\",\n                examples: \"当输入框中没有信息显示，可以提示用户输入。\",\n            },\n        }, model.schema);\n        this.methods = Object.assign({}, model.methods);\n        _watcher__WEBPACK_IMPORTED_MODULE_0__.EventBus.clear();\n        this.compile(node, this);\n        console.log(this.data);\n        var df = this.config(this);\n        el.appendChild(df);\n        this.observe(this.data);\n    }\n    //编织\n    compile(root, vm) {\n        var nodes = root.children;\n        for (var i = 0; i < nodes.length; i++) {\n            var node = nodes[i];\n            // 对所有元素进行遍历，并进行处理\n            if (node.children.length) {\n                this.compile(node, vm);\n            }\n            // 绑定属性和事件\n            for (let item of node.getAttributeNames()) {\n                //属性\n                if (item.startsWith(\":\")) {\n                    let name = node.getAttribute(item);\n                    console.log(\"name:\", name)\n                    let attribute = item.substr(1);\n                    console.log(\"attribute:\", attribute);\n                    // window.EventBus = EventBus;\n                    _watcher__WEBPACK_IMPORTED_MODULE_0__.EventBus.add(name, new _watcher__WEBPACK_IMPORTED_MODULE_0__.Watcher(node, attribute, vm.data, name));\n                    continue;\n                }\n                //事件\n                if (item.startsWith(\"@\")) {\n                    let method = node.getAttribute(item);\n                    if (vm.methods[method]) {\n                        let event = item.substr(1);\n                        node.addEventListener(event, (e) => {\n                            vm.methods[method](vm, e);\n                        });\n                    }\n                    continue;\n                }\n            }\n        }\n    }\n    //配置\n    config(vm, df) {\n        var df = df || document.createDocumentFragment();\n        Object.keys(vm.data).forEach(key => {\n            var schema = {\n                type: \"string\",\n                title: key,\n            };\n            if (vm.schema[key]) {\n                schema = Object.assign(schema, vm.schema[key]);\n            }\n            var div = document.createElement(\"div\");\n            var label = document.createElement(\"label\");\n            label.innerText = schema.title;\n            if (schema.examples) {\n                var path = document.querySelector(\"#svg\").cloneNode(true);\n                path.title = schema.examples;\n                label.appendChild(path);\n            }\n            label.htmlFor = key;\n            div.appendChild(label);\n            df.appendChild(div);\n            div = document.createElement(\"div\");\n            switch (schema.type) {\n                case \"string\":\n                    var input = document.createElement(\"input\")\n                    input.id = key;\n                    if (schema.description) {\n                        input.placeholder = schema.description;\n                    }\n                    div.appendChild(input);\n                    var keys = key.split('.');\n                    input.value = keys.reduce(function (value, key) {\n                        return value[key];\n                    }, vm.data);\n\n                    input.addEventListener('input', function (e) {\n                        var lastKey = keys[keys.length - 1];\n                        keys.slice(0, keys.length - 1).reduce(function (value, key) {\n                            return value[key];\n                        }, vm.data)[lastKey] = e.target.value;\n                        _watcher__WEBPACK_IMPORTED_MODULE_0__.EventBus.notify(key);\n                    });\n                    break;\n\n                case \"number\":\n                    var input = document.createElement(\"input\");\n                    input.id = key;\n                    input.type = \"number\";\n                    div.appendChild(input);\n                    var keys = key.split('.');\n                    input.value = keys.reduce(function (value, key) {\n                        return value[key];\n                    }, vm.data);\n\n                    input.addEventListener('input', function (e) {\n                        var lastKey = keys[keys.length - 1];\n                        keys.slice(0, keys.length - 1).reduce(function (value, key) {\n                            return value[key];\n                        }, vm.data)[lastKey] = e.target.value;\n                        _watcher__WEBPACK_IMPORTED_MODULE_0__.EventBus.notify(key);\n                    });\n                    break;\n\n            }\n            df.appendChild(div);\n        });\n        return df;\n    }\n    observe(currentObj, completeKey) {\n        var _this = this;\n        Object.keys(currentObj).forEach(function (key) {\n            if (currentObj.hasOwnProperty(key)) {\n                var fullKey = completeKey ? completeKey + '.' + key : key;\n                var value = currentObj[key];\n                // 如果值还是对象，则遍历处理\n                if (typeof value === 'object') {\n                    _this.observe(value, fullKey);\n                }\n                // 双向数据绑定的关键\n                Object.defineProperty(currentObj, key, {\n                    get: function () {\n                        console.log(key + '获取' + JSON.stringify(value));\n                        return value;\n                    },\n                    set: function (newVal) {\n                        if (value !== newVal) {\n                            console.log(fullKey + '更新' + JSON.stringify(newVal));\n                            value = newVal;\n                            _watcher__WEBPACK_IMPORTED_MODULE_0__.EventBus.notify(fullKey);\n                        }\n                    }\n                });\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://jsonform/./src/vm.js?");

/***/ }),

/***/ "./src/watcher.js":
/*!************************!*\
  !*** ./src/watcher.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventBus\": () => (/* binding */ EventBus),\n/* harmony export */   \"Watcher\": () => (/* binding */ Watcher)\n/* harmony export */ });\n\n\nclass EventBus {\n    constructor() {\n\n    }\n\n    static clear() {\n        EventBus.subs = {};\n    }\n    static add(completeKey, sub) {\n        if (!EventBus.subs[completeKey]) {\n            EventBus.subs[completeKey] = [];\n        }\n        EventBus.subs[completeKey].push(sub);\n    }\n    static notify(completeKey) {\n        if (EventBus.subs[completeKey]) {\n            EventBus.subs[completeKey].forEach(function (sub) {\n                console.log(sub);\n                sub.update();\n            })\n        }\n    }\n}\n\nclass Watcher {\n    constructor(node, attribute, data, name) {\n        this.node = node;\n        switch (attribute) {\n            case \"text\":\n                this.attribute = \"innerText\";\n                break;\n            case \"html\":\n                attribute = \"innerHTML\";\n                break;\n            default:\n                this.attribute = attribute;\n                break;\n        }\n        this.data = data;\n        this.name = name;\n        this.init();\n    }\n    init() {    // update model\n        var keys = this.name.split('.');\n        var lastKey = keys[keys.length - 1];\n        keys.slice(0, keys.length - 1).reduce(function (value, key) {\n            if (!value[key]) {\n                value[key] = {};\n            }\n            return value[key];\n        }, this.data)[lastKey] = this.getValue(this.node, this.attribute);\n    }\n    getValue(obj, fullKey) {\n        var keys = fullKey.split('.')\n        if (keys.length == 1) {\n            return obj[fullKey];\n        }\n        return keys.reduce(function (value, key) {\n            return value[key];\n        }, obj);\n    }\n    update() {\n        if (this.node.nodeType == 1) {\n            // this.node[this.attribute] = this.data[this.name];\n\n            // 比如 H3.innerHTML = this.data.number; 当 number 改变时，会触发这个 update 函数，保证对应的 DOM 内容进行了更新。\n            var keys = this.attribute.split('.');\n            var lastKey = keys[keys.length - 1];\n            keys.slice(0, keys.length - 1).reduce(function (value, key) {\n                return value[key];\n            }, this.node)[lastKey] = this.name.split('.').reduce(function (value, key) {\n                return value[key];\n            }, this.data);\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://jsonform/./src/watcher.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;