import ViewModel from "./vm";
class JsonForm {
    constructor(box, widget) {
        JsonForm.counter = JsonForm.counter ? JsonForm.counter++ : 0;
        this.init(document.querySelector(box), Array.from(document.querySelector(widget).children));
    }
    init(box, widgets) {
        var _this = this;
        //经过事件
        box.ondragover = function (e) {
            e.preventDefault();
        };

        //放下事件  
        box.ondrop = function (e) {
            console.log("event: ", e);
            var node = document.querySelector("#" + e.dataTransfer.getData("sid"));
            if (!node.cloned) {
                console.log("clone", node);
                node = node.cloneNode(true);
                node.cloned = true;
                node.id = "item" + JsonForm.counter++;
                console.log("id", node.id);
                node.ondragstart = function (e) {
                    console.log("sid", e.target.id);
                    e.dataTransfer.setData("sid", e.target.id);
                };
                node.className = node.className.replace(" selected", "")
                node.onclick = e => {
                    _this.bind(e, node);
                };
            }

            if (e.target != this) {
                var parent = _this.getParent(e.target, this);
                var root = this;
                setTimeout(function () {
                    root.insertBefore(node, parent);
                }, 0);
            } else {
                this.appendChild(node);
            }
        }
        //启动拖拽
        widgets.forEach(item => {
            if (!item.draggable) {
                item.draggable = true;
                item.id = "sid" + JsonForm.counter++;
                item.ondragstart = function (e) {
                    console.log("sid", e.target.id);
                    e.dataTransfer.setData("sid", item.id);
                };
                item.onmouseover = e => {
                    item.className += " selected";
                }
                item.onmouseout = e => {
                    item.className = item.className.replace(" selected", "")
                }
            }
        });
    }

    createProxy() {
        const proxy = new Proxy({}, {
            // 拦截所有属性，防止到 Proxy 对象以外的作用域链查找。
            has(target, key) {
                if (key === "schema" || key === "data" || key === "methods") {
                    return true;
                }
                return false;
            },
            set(target, key, value) {
                if (this.has(target, key)) {
                    return Reflect.set(target, key, value);
                }
            },
            get(target, key, receiver) {
                // 加固，防止逃逸
                if (key === Symbol.unscopables) {
                    return undefined;
                }
                if (key === "target") {
                    return target;
                }
                if (this.has(target, key)) {
                    return Reflect.get(target, key, receiver);
                }
                return undefined;
            },
        });
        return proxy;
    }
    compileCode(code) {
        code = `with(sandbox) { ${code} }`;
        const fn = new Function('sandbox', code);
        return fn;
    }

    bind(e, node) {
        var settings = document.querySelector("#app");
        settings.innerText = "";
        var options = this.createProxy();

        var script = node.querySelector("script");
        if (script) {
            this.compileCode(script.innerText).call(options, options);
        }
        var vm = new ViewModel(options.target, node, settings);
    }

    getParent(child, parent) {
        if (!child.parentNode) {
            return child;
        }
        if (child.parentNode == parent) {
            return child;
        }
        return this.getParent(child.parentNode, parent);
    }
}

export default JsonForm;