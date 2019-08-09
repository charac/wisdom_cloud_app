
/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 修改页面title
 */
export const setTitle = function(title) {
    // title = (title ? title + ' - ' : '') + window.project.title;
    window.document.title = title;
};

/**
 * 存储localStorage
 */
export const setStore = (user, content) => {
    if (!user) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(user, content);
}

/**
 * 获取localStorage
 */
export const getStore = user => {
    if (!user) return;
    return window.localStorage.getItem(user);
}

/**
 * 获取localStorage
 */
export const getStoreForJson = user => {
    if (!user) return;
    var content = window.localStorage.getItem(user);
    return JSON.parse(content);
}

/**
 * 删除localStorage
 */
export const removeStore = user => {
    if (!user) return;
    window.localStorage.removeItem(user);
}




var class2type = {
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Date]": "date",
    "[object Function]": "function",
    "[object Number]": "number",
    "[object Object]": "object",
    "[object RegExp]": "regexp",
    "[object String]": "string"
};
var _typeof = function(o) {
    return o == null ?
        String(o) :
        class2type[toString.call(o)] || "object"
};

// // 1.将json对象转化为json字符串，再判断该字符串是否为"{}"
// var data = {};
// var b = (JSON.stringify(data) == "{}");
// alert(b);//true


// // 2.for in 循环判断
// var obj = {};
// var b = function() {
// for(var key in obj) {
// return false;
// }
// return true;
// }
// alert(b());//true


// // 3.jquery的isEmptyObject方法
// // 此方法是jquery将2方法(for in)进行封装，使用时需要依赖jquery
// var data = {};
// var b = $.isEmptyObject(data);
// alert(b);//true


// // 4.Object.getOwnPropertyNames()方法
// // 此方法是使用Object对象的getOwnPropertyNames方法，获取到对象中的属性名，存到一个数组中，返回数组对象，我们可以通过判断数组的length来判断此对象是否为空
// // 注意：此方法不兼容ie8，其余浏览器没有测试
// var data = {};
// var arr = Object.getOwnPropertyNames(data);
// alert(arr.length == 0);//true


// // 5.使用ES6的Object.keys()方法
// // 与4方法类似，是ES6的新方法, 返回值也是对象中属性名组成的数组
// var data = {};
// Object.keys(obj).length === 0 && obj.constructor === Object 

// 数据类型判断、深克隆、时间戳转换等工具
export const util = {
    trim: function(text) {
        return text == null ?
            "" :
            text.toString().replace(/^\s+/, "").replace(/\s+$/, "");
    },
    type(o) {
        return _typeof(o);
    },
    /**
     * 测试对象是否是窗口（有可能是Frame）
     */
    isWindow(o) {
        return o != null && o == o.window;
    },
    /**
     * 测试对象是否是布尔（Boolean）类型值
     */
    isBoolean(o) {
        return _typeof(o) == "boolean";
    },
    /**
     * 测试对象是否是字符串（String）类型值
     */
    isString(o) {
        return _typeof(o) == "string";
    },
    /**
     * 测试对象是否是日期（Date）类型值
     */
    isDate(o) {
        return _typeof(o) == "date";
    },
    /**
     * 测试对象是否是正则表达式（RegExp）
     */
    isRegExp(o) {
        return _typeof(o) == "regexp";
    },
    /**
     * 测试传入的参数是否是一个 javascript 对象
     */
    isObject(o) {
        return _typeof(o) == "object";
    },
    /**
     * 测试对象是否是数组（Array）
     */
    isArray(o) {
        return _typeof(o) == "array";
    },
    /**
     * 测试对象是否是函数
     */
    isFunction(o) {
        return _typeof(o) == "function";
    },
    /**
     * 判断对象是否是数值类型
     */
    isNumber(o) {
        return _typeof(o) == "number";
    },
    /**
     * 判断对象是否为空(Null)值
     */
    isNull(o) {
        return o === null;
    },
    /**
     * 判断对象是否为 "未定义" 值(即 undefined)
     */
    isUndefined(o) {
        return o === undefined || typeof o === "undefined";
    },
    /**
     * 判断对象是否为 "未定义" 值(即 undefined)或空(Null)值
     */
    isNullOrUndefined(o) {
        return util.isNull(o) || util.isUndefined(o);
    },
    isPlainObject(o) {
        if (!obj || util.type(obj) !== "object" || obj.nodeType || util.isWindow(obj)) {
            return false;
        }
        try {
            // Not own constructor property must be Object
            if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }
    },
    /**
     * 判断传入的字符串是否为Null或者为空字符串
     */
    isNullOrEmpty(str) {
        return str === undefined || str === null || str === "";
    },
    /**
     * 判断传入的字符串是否为Null或者为空字符串或者全是空格
     */
    isNullOrWhiteSpace(str) {
        return util.isNullOrEmpty(str) || util.trim(str) === ""
    },
    isEmptyObject(obj) {
        if (!obj) return false;
        for (var name in obj) {
            return false;
        }
        return true;
    },
    /**
     * 测试对象是否为空（不包含任何属性的空对象、null、undefined、空字符串、全空格）。
     * 这个方法既检测对象本身的属性，也检测从原型继承的属性（因此没有使用hasOwnProperty）。
     */
    isEmptyObjectOrNull: function(obj) {
        switch (util.type(obj)) {
            case "string":
                return util.isNullOrWhiteSpace(obj);
            case "array":
                return obj.length === 0;
            case "date":
                return Date.parse(obj) === 0;
            case "object":
                return util.isEmptyObject(obj);
        }
        return obj == null || obj == undefined;
    },
    getElementPos(target) {
        var pos = {
            x: 0,
            y: 0
        };
        while (target) {
            pos.x += target.offsetLeft;
            pos.y += target.offsetTop;
            target = target.offsetParent
        }
        return pos;
    },
    // 计算时间差
    computedTime(strDateStart,strDateEnd,strSeparator){
        if(strSeparator==undefined){
            var strSeparator = "-"; //日期分隔符
        }
        var oDate1;
        var oDate2;
        var iDays;
        oDate1= strDateStart.split(strSeparator);
        oDate2= strDateEnd.split(strSeparator);
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
        var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
        iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数
        return iDays ;
    },
    // 设置时间
    setDate (endDate,startDate) {
        var newDate = new Date(endDate);
        var start = new Date(startDate);
        var D = newDate.getDate();
        var S = start.getDate();
        var aDate = [];
        for(var i=S; i<=D; i++){
            aDate.push([i]+'日');
        }
        return aDate;
    },
    // 深克隆
    deepCopy: function copy(obj){
        var str, newObj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //系列化对象
            newObj = JSON.parse(str); //还原
        } else {
            for(var i in obj){
                newObj[i] = typeof obj[i] === 'object' ?
                cloneObj(obj[i]) : obj[i];
            }
        }
        return newObj;
    },
    // 数字转为中文
    EnglishConvert: function(num) {
        num = num.toString();
        var china = new Array('一','二','三','四','五','六','七','八','九','十');
        var arr = new Array();
        var english = num.split("");
        for(var i=0;i<english.length;i++){
            arr[i] = china[english[i]];
        };
        return arr.join("");
    },
    // 时间戳转时间 yyyy-mm-dd HH:mm:ss
    formatDateTime: function(timeStamp) {
        // var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var date = new Date(timeStamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        // return y + '-' + m + '-' + d +' '+h+':'+minute+':'+second;
        return y + '年' + m + '月' + d +'日 '+h+':'+minute;
    },
    // 对象遍历
    getList(data) {
        let params = '?';
        for (let key in data) {
            params += key + '=' + data[key] + '&';
        }
        params = params.slice(0, params.length - 1);
        return params;
    },
    // 替换全局所有
    replaceAll(str,regExp,target) {
        let reg = new RegExp( regExp , "g" )
        return str.replace(reg,target);
    },
    // 统计数组中对象出现的次数；
    countTimes(arr) {
        let counts = {};
        arr.map((item) => { 
            counts[item] = (counts[item] || 0) + 1; 
        }); 
        return counts;   
    },
    // 数组中的多行数字模糊搜索
    queryArrKeys(arr, q,) {
        return arr.filter(v => Object.values(v['serveName']).some(v => new RegExp(q + '').test(v)))
    },
    

}
// 数组模糊筛选
export const filterByName = a => b => {
    return b.c.indexOf(a) > -1
}

// 判断参数是否是其中之一
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
};


/**
 * @description [数据变化页面请求]
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }
    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/**
 * 生成随机字符串(可指定长度)
 * @param len
 * @returns {string}
 */
export const randomString = (len) => {
    len = len || 8;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

/**
 * randomWord 产生任意长度随机字母数字组合
 * @param randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 * @param min
 * @param max
 * @returns {string}
 * 调用方法:
 * 生成 3 - 32 位随即字符串
 * randomWord(true,3,32);    例如：olyOXUF5oDsuMmXl3Mi48
 * 生成 32 位随机字符串
 * randomWord(false,32);     例如：fjpnWj29Bb8boiXbLeDF0nxkR4aYcLRl
 */
export const randomWord = (randomFlag, min, max) => {
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
};

/**
 * 获取url后参数
 */
export const GetRequest = () => {
    let url = location.search; //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
};

/**
 * 生成随机颜色值
 */
export const getRandomColor = () => {
    const rgb = [];
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16);
        color = color.length === 1 ? '0' + color : color;
        rgb.push(color)
    }
    return '#' + rgb.join('')
};

/**
 * 验证身份证号
 * @param el 号码输入input
 * @returns {boolean}
 */
export const checkCardNo = (el) => {
    let txtVal = el.value;
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(txtVal);
};

/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
export const checkLength = (v) => {
    let realLength = 0;
    let len = v.length;
    for (let i = 0; i < len; i++) {
        let charCode = v.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};

/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
export const isWeiXin = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
};

/**
 * 写cookies
 */
export const setCookie = (name, value, time) => {
    let strs = getMsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + time * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

/**
 * 读取cookies
 */
export const getCookie = (name) => {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return (arr[2]);
    else return null;
};

/**
 * 删除cookies
 */
export const delCookie = (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + rval + ";expires=" + exp.toGMTString();
};

/**
 * 浏览器判断
 * 用法示例——多套页面判断是否显示移动端：
 *   let ua = parseUA();
 *   if (!ua.mobile) {
 *       location.href = './pc.html';
 *   }
 */
export const parseUA = () => {
    let u = navigator.userAgent;
    let u2 = navigator.userAgent.toLowerCase();
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        //IE内核
        presto: u.indexOf('Presto') > -1,
        //opera内核
        webKit: u.indexOf('AppleWebKit') > -1,
        //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('IHTML') == -1,
        //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1,
        //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,
        //是否iPad
        webApp: u.indexOf('Safari') == -1,
        //是否web应该程序，没有头部与底部
        ivs: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) == "micromessenger",
        ali: u.indexOf('AliApp') > -1,
    };
};

/**
 * 生成UUID
 * @returns {string}
 */
export const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * 删除左右两端的空格
 * @param str
 * @returns {string | * | void}
 */
export const trim = (str) =>{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 删除左边的空格
 * @param str
 * @returns {string | * | void}
 */
export const latria = (str) => {
    return str.replace(/(^\s*)/g, "");
}

/**
 * 删除右边的空格
 * @param str
 * @returns {string | * | void}
 */
export const rtrim = (str) => {
    return str.replace(/(\s*$)/g, "");
}

/**
 * 对象数组转二维数组
 * @param objArr
 */
export const obj2Arr = (objArr) => {
    objArr.length > 0 && objArr.map(item => {
        return Object.values(item);
    })
}

/**
 * 找出对象数组中某属性的最大值
 * @param array
 * @param item
 * @returns val
 */
export const maxItemInObjArr = (array, item) => {
    let max = Math.max.apply(Math, array.map(function (obj) {
        return obj[item];
    }));
    return max;
}

/**
 * 判断当前网络环境
 */
export const isWifi = () => {
    try {
        let wifi = true;
        let ua = window.navigator.userAgent;
        let con = window.navigator.connection;
        // 如果是微信
        if (/MicroMessenger/.test(ua)) {
            if (ua.indexOf('WIFI') >= 0) {
                return true
            } else {
                wifi = false
            }
            // 如果支持navigator.connection
        } else if (con) {
            let network = con.type;
            if (network !== 'wifi' && network !== '2' && network !== 'unknown') {
                wifi = false
            }
        }
        return wifi
    } catch (e) {
        return false
    }
};

/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
export const fistLetterUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 过滤非法字符串
 */
export const illegalFilter = (str) => {
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    if (regEn.test(str) || regCn.test(str)) return false;
    return true;
};

/**
 * 动画垂直滚动到页面指定位置
 * @param { Number } currentY 当前位置
 * @param { Number } targetY 目标位置
 */
export const scrollAnimation = (currentY, targetY) =>{
    // 获取当前位置方法
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop

    // 计算需要移动的距离
    let needScrollTop = targetY - currentY
    let _currentY = currentY
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        window.scrollTo(_currentY, currentY)
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
            scrollAnimation(_currentY, targetY)
        } else {
            window.scrollTo(_currentY, targetY)
        }
    }, 1)
}

/**
 * 防抖函数  用于无需多次执行
 */
export const debounceFunction = (func, wait) => {
    let timeout = '';
    return (v) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(v);
        }, wait);
    }
};

/**
 *  下载文件
 * @data 文件url @fileName 文件名
 */
export const fileDownload = (data, fileName) => {
    let blob = new Blob([data], {
        type: "application/octet-stream"
    });
    // || "filename.xls"  未指定文件类型
    let filename = fileName;
    if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        // var blobURL = window.URL.createObjectURL(blob);
        var blobURL = window.URL.createObjectURL(blob);
        blobURL = blobURL.substring(5,blobURL.length);
        var arr = blobURL.split('/');
        arr[arr.length-1] = 'upload/'+arr[arr.length-1];
        blobURL = arr.join('/');
        blobURL = `${blobURL}/${fileName}`;
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        alert(blobURL)
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        // window.URL.revokeObjectURL(blobURL);
    }
}

/**
 * 动态创建iframe
 * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
 * @param src iframe中打开的网页路径
 * @param onload iframe载入完后触发该事件。能够为空
 * @return 返回创建的iframe对象
*/
function createIframe(dom, src, onload){
	//在document中创建iframe
	var iframe = document.createElement("iframe");
	
	//设置iframe的样式
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.margin = '0';
	iframe.style.padding = '0';
	iframe.style.overflow = 'hidden';
	iframe.style.border = 'none';
	
	//绑定iframe的onload事件
	if(onload && Object.prototype.toString.call(onload) === '[object Function]'){
		if(iframe.attachEvent){
			iframe.attachEvent('onload', onload);
		}else if(iframe.addEventListener){
			iframe.addEventListener('load', onload);
		}else{
			iframe.onload = onload;
		}
	}
	
	iframe.src = src;
	//把iframe载入到dom以下
	dom.appendChild(iframe);
	return iframe;
}

/**
 * 销毁iframe，释放iframe所占用的内存。

 * @param iframe 须要销毁的iframe对象
*/
function destroyIframe(iframe){
	//把iframe指向空白页面，这样能够释放大部分内存。
	iframe.src = 'about:blank';
	try{
		iframe.contentWindow.document.write('');
		iframe.contentWindow.document.clear();
	}catch(e){}
	//把iframe从页面移除
	iframe.parentNode.removeChild(iframe);
}


function bubble_sort(arr, fn) {
    let len = arr.length
    while (len--) {
        for (let i = 0; i < len; i++) {
            if (fn(arr[i], arr[i + 1]) > 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
            }
        }
    }
}

let arr = [7, 4, 3, 67, 34, 1, 8]
bubble_sort(arr, (a, b)=> a - b) // [1, 3, 4, 7, 8, 34, 67]
bubble_sort(arr, (a, b)=> b - a) // [67, 34, 8, 7, 4, 3, 1]