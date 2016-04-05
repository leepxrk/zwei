export default class blink {
    constructor(params) {
        for (let target in params) {
            this[target] = {};
            for (let props in params[target]) {
                this[target][props] = params[target][props];
            }
        }
        return this;
    }
    bind(obj, props, callback) {
        var tip = new Date().getTime();
        Object.defineProperty(this[obj], props, {
            get: function() {
                return this[tip];
            },
            set: function(newValue) {
                this[tip] = newValue;
                callback(newValue);
            },
            configurable: true // 允许在稍后重定义这个属性
        });
    }
}
let dataPool = {
    live: {
        'name': 'L3ve',
        'uid': 1,
        'img': 'http://fuck.you'
    },
    master: {
        'name': 'zwei',
        'rank': 7
    }
}
let testPool = {
    live: {
        liveVal: {
            name: 'l3ve'
        }
    }
}

let dataBind = new blink(dataPool);
dataBind.bind('live', 'name', (newData) => {
    console.log('it will be changed');
});
dataBind.live.name = 'fuck';
console.log(dataBind.live.name);
// dataPool.live.name = 'Bob'
// dataBind.updata('live','name','get');
