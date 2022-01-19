import { EventBus, Watcher } from "./watcher";

export default class ViewModel {
    constructor(model, node, el) {
        this.data = Object.assign({}, model.data);
        this.schema = Object.assign({
            default: {
                type: "string",
                title: "默认",
                description: "请输入默认值！",
            },
            title: {
                type: "string",
                title: "标题",
                description: "请输入标题！",
            }, placeholder: {
                type: "string",
                title: "占位",
                description: "请输入占位！",
                examples: "当输入框中没有信息显示，可以提示用户输入。",
            },
        }, model.schema);
        this.methods = Object.assign({}, model.methods);
        EventBus.clear();
        this.compile(node, this);
        console.log(this.data);
        var df = this.config(this);
        el.appendChild(df);
        this.observe(this.data);
    }
    //编织
    compile(root, vm) {
        var nodes = root.children;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            // 对所有元素进行遍历，并进行处理
            if (node.children.length) {
                this.compile(node, vm);
            }
            // 绑定属性和事件
            for (let item of node.getAttributeNames()) {
                //属性
                if (item.startsWith(":")) {
                    let name = node.getAttribute(item);
                    console.log("name:", name)
                    let attribute = item.substr(1);
                    console.log("attribute:", attribute);
                    // window.EventBus = EventBus;
                    EventBus.add(name, new Watcher(node, attribute, vm.data, name));
                    continue;
                }
                //事件
                if (item.startsWith("@")) {
                    let method = node.getAttribute(item);
                    if (vm.methods[method]) {
                        let event = item.substr(1);
                        node.addEventListener(event, (e) => {
                            vm.methods[method](vm, e);
                        });
                    }
                    continue;
                }
            }
        }
    }
    //配置
    config(vm, df) {
        var df = df || document.createDocumentFragment();
        Object.keys(vm.data).forEach(key => {
            var schema = {
                type: "string",
                title: key,
            };
            if (vm.schema[key]) {
                schema = Object.assign(schema, vm.schema[key]);
            }
            var div = document.createElement("div");
            var label = document.createElement("label");
            label.innerText = schema.title;
            if (schema.examples) {
                var path = document.querySelector("#svg").cloneNode(true);
                path.title = schema.examples;
                label.appendChild(path);
            }
            label.htmlFor = key;
            div.appendChild(label);
            df.appendChild(div);
            div = document.createElement("div");
            switch (schema.type) {
                case "string":
                    var input = document.createElement("input")
                    input.id = key;
                    if (schema.description) {
                        input.placeholder = schema.description;
                    }
                    div.appendChild(input);
                    var keys = key.split('.');
                    input.value = keys.reduce(function (value, key) {
                        return value[key];
                    }, vm.data);

                    input.addEventListener('input', function (e) {
                        var lastKey = keys[keys.length - 1];
                        keys.slice(0, keys.length - 1).reduce(function (value, key) {
                            return value[key];
                        }, vm.data)[lastKey] = e.target.value;
                        EventBus.notify(key);
                    });
                    break;

                case "number":
                    var input = document.createElement("input");
                    input.id = key;
                    input.type = "number";
                    div.appendChild(input);
                    var keys = key.split('.');
                    input.value = keys.reduce(function (value, key) {
                        return value[key];
                    }, vm.data);

                    input.addEventListener('input', function (e) {
                        var lastKey = keys[keys.length - 1];
                        keys.slice(0, keys.length - 1).reduce(function (value, key) {
                            return value[key];
                        }, vm.data)[lastKey] = e.target.value;
                        EventBus.notify(key);
                    });
                    break;

            }
            df.appendChild(div);
        });
        return df;
    }
    observe(currentObj, completeKey) {
        var _this = this;
        Object.keys(currentObj).forEach(function (key) {
            if (currentObj.hasOwnProperty(key)) {
                var fullKey = completeKey ? completeKey + '.' + key : key;
                var value = currentObj[key];
                // 如果值还是对象，则遍历处理
                if (typeof value === 'object') {
                    _this.observe(value, fullKey);
                }
                // 双向数据绑定的关键
                Object.defineProperty(currentObj, key, {
                    get: function () {
                        console.log(key + '获取' + JSON.stringify(value));
                        return value;
                    },
                    set: function (newVal) {
                        if (value !== newVal) {
                            console.log(fullKey + '更新' + JSON.stringify(newVal));
                            value = newVal;
                            EventBus.notify(fullKey);
                        }
                    }
                });
            }
        });
    }
}
