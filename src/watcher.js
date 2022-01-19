

class EventBus {
    constructor() {

    }

    static clear() {
        EventBus.subs = {};
    }
    static add(completeKey, sub) {
        if (!EventBus.subs[completeKey]) {
            EventBus.subs[completeKey] = [];
        }
        EventBus.subs[completeKey].push(sub);
    }
    static notify(completeKey) {
        if (EventBus.subs[completeKey]) {
            EventBus.subs[completeKey].forEach(function (sub) {
                console.log(sub);
                sub.update();
            })
        }
    }
}

class Watcher {
    constructor(node, attribute, data, name) {
        this.node = node;
        switch (attribute) {
            case "text":
                this.attribute = "innerText";
                break;
            case "html":
                attribute = "innerHTML";
                break;
            default:
                this.attribute = attribute;
                break;
        }
        this.data = data;
        this.name = name;
        this.init();
    }
    init() {    // update model
        var keys = this.name.split('.');
        var lastKey = keys[keys.length - 1];
        keys.slice(0, keys.length - 1).reduce(function (value, key) {
            if (!value[key]) {
                value[key] = {};
            }
            return value[key];
        }, this.data)[lastKey] = this.getValue(this.node, this.attribute);
    }
    getValue(obj, fullKey) {
        var keys = fullKey.split('.')
        if (keys.length == 1) {
            return obj[fullKey];
        }
        return keys.reduce(function (value, key) {
            return value[key];
        }, obj);
    }
    update() {
        if (this.node.nodeType == 1) {
            // this.node[this.attribute] = this.data[this.name];

            // 比如 H3.innerHTML = this.data.number; 当 number 改变时，会触发这个 update 函数，保证对应的 DOM 内容进行了更新。
            var keys = this.attribute.split('.');
            var lastKey = keys[keys.length - 1];
            keys.slice(0, keys.length - 1).reduce(function (value, key) {
                return value[key];
            }, this.node)[lastKey] = this.name.split('.').reduce(function (value, key) {
                return value[key];
            }, this.data);
        }
    }
}
export { EventBus, Watcher };
