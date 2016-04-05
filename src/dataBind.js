class blink {
    constructor(params) {
        for (let target in params) {
            this[target] = {};
            this[target].dataPool = {};
            for (let props in params[target]) {
                this[target].dataPool[props] = params[target][props];
            }
        }
        return this;
    }
    updata(target,props,val) {
        console.log(this[target].dataPool[props]);
        this[target].dataPool[props] = val;
    }
    bind(obj, props, callback) {
        Object.defineProperty(this[obj].dataPool, props, {
            get: function() {
                console.log(this);
                return this[obj].dataPool[props];
            },
            set: function(newValue) {
                this[obj].dataPool[props] = newValue;
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
    // console.log(val,newVal);
    // val = newVal;
    console.log('it will be changed');
})

console.log(dataBind.live.dataPool.name);
// dataPool.live.name = 'Bob'
// dataBind.updata('live','name','get');
