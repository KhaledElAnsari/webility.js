var SORT_TYPES = ["ascend", "descend"];
var webility = {
  pageready: function(callback) {
    var r1 = false, r2 = false;

    document.onreadystatechange = function () {
      if (document.readyState === "complete") {
        r1 = true;
      }
    };

    window.onload = function() {
      r2 = true;
    };

    var stateCheck = setInterval(function(){
      if(r1 === true && r2 === true) {
        clearInterval(stateCheck);

        if( !(callback instanceof Function) ) {
          return "ready";
        }

        callback();
      }
    }, 0);
  },

  select: function(cssSelector) {
    // to select elements based on the CSS tags
    if(cssSelector !== undefined && typeof cssSelector === "string" && cssSelector.trim().length > 0) {
      return new select(cssSelector);
    }
    else {
      throw new Error("Please provide a valid String for the select() function");
    }
  },

  title: function(str) {
    // This was written with the help of this answer on StackOverFlow
    // http://stackoverflow.com/a/196991/4341572
    return str.replace(/\w\S*/g, function(regstr) {
      return regstr.charAt(0).toUpperCase() + regstr.substr(1).toLowerCase();
    });
  },

  quote: function(str) {
    // This was a native function in the past now it's not supported
    // Read about it at MDN:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/quote
    return '"' + str + '"';
  },

  capitalize: function(str) {
    // This will capitalize only the first character
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  },

  today: function() {
    var _IEsupport = Date.prototype.toISOString instanceof Function;
    var now = new Date();
    var today;
    if(_IEsupport) {
      today = now.toISOString().substr(0,10);
    }
    else {
      // This solution was written with the help of this answer
      // http://stackoverflow.com/a/4929629/4341572

      var month = (now.getMonth() + 1);
      var day = now.getDate();
      if(month < 10)
        month = "0" + month;
      else
        month = month.toString();
      if(day < 10)
        day = "0" + day;
      else
        day = day.toString();

      today = now.getFullYear() + '-' + month + '-' + day;
    }

    return today;
  },

  toUTC: function(date) {
    date = date.split(/[^0-9]/);

    if(!date[0] || !date[1] || !date[2]) {
      throw new Error("Please provide a valid date");
    }

    for(var i = 0; i < 6; i++) {
      if(date[i] === undefined) {
        date[i] = 0;
        continue;
      }
      date[i] = parseInt(date[i]);
    }

    var d = new Date(date[0], date[1]-1, date[2], date[3], date[4], date[5]);
    var inUTC = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));

    var yyyy = inUTC.getFullYear();
    var mm = (inUTC.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = inUTC.getDate().toString();
    var HH = inUTC.getHours().toString();
    var MM = inUTC.getMinutes().toString();
    var SS = inUTC.getSeconds().toString();

    if(mm.length == 1) {
      mm = "0" + mm;
    }
    if(dd.length == 1) {
      dd = "0" + dd;
    }
    if(HH.length == 1) {
      HH = "0" + HH;
    }
    if(MM.length == 1) {
      MM = "0" + MM;
    }
    if(SS.length == 1) {
      SS = "0" + SS;
    }
    inUTC = yyyy + "-" + mm + "-" + dd + " " + HH + ":" + MM + ":" + SS;

    return inUTC;
  },

  toLocalTime: function(date) {
    date = date.split(/[^0-9]/);

    if(!date[0] || !date[1] || !date[2]) {
      throw new Error("Please provide a valid date");
    }

    for(var i = 0; i < 6; i++) {
      if(date[i] === undefined) {
        date[i] = 0;
        continue;
      }
      date[i] = parseInt(date[i]);
    }

    var d = new Date(date[0], date[1]-1, date[2], date[3], date[4], date[5]);
    var inLocal = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));

    var yyyy = inLocal.getFullYear();
    var mm = (inLocal.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = inLocal.getDate().toString();
    var HH = inLocal.getHours().toString();
    var MM = inLocal.getMinutes().toString();
    var SS = inLocal.getSeconds().toString();

    if(mm.length == 1) {
      mm = "0" + mm;
    }
    if(dd.length == 1) {
      dd = "0" + dd;
    }
    if(HH.length == 1) {
      HH = "0" + HH;
    }
    if(MM.length == 1) {
      MM = "0" + MM;
    }
    if(SS.length == 1) {
      SS = "0" + SS;
    }
    inLocal = yyyy + "-" + mm + "-" + dd + " " + HH + ":" + MM + ":" + SS;

    return inLocal;
  },

  dayAfter: function(currentDate, days) {
    var date = new Date(currentDate.valueOf());
    date.setDate(date.getDate() + days);
    date = date.toISOString().substr(0, 10);

    return date;
  },

  getDays: function(startDate, stopDate) {
    var dateArray = [];
    stopDate = new Date(stopDate);
    var currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
      currentDate = currentDate.toISOString().substr(0, 10);
      dateArray.push(currentDate);
      currentDate = new Date(this.dayAfter(currentDate , 1));
    }

    return dateArray;
  },

  objToArray: function(objList) {
    var finalArr = [];
    for(var key in objList) {
      finalArr.push({
        "key": key,
        "value": objList[key]
      });
    }

    return finalArr;
  },

  isEmpty: function(element) {
    if(element === undefined) throw new Error("Please provide a valid Object/Array for the isEmpty() function");

    return (Object.keys(element).length === 0);
  },

  get: function(obj, key, value) {
    // Inspired by the get function in python, read more about it:
    // http://www.tutorialspoint.com/python/dictionary_get.htm

    if(obj instanceof Object) {
      throw new Error("Please provide a valid Object for the get() function");
    }
    if(key === undefined) {
      throw new Error("Please provide a valid String as a key for the get() function");
    }
    if(value === undefined) {
      value = null;
    }

    for(var k in obj) {
      if(k == key) {
        return obj[key];
      }
    }

    obj[key] = value;
    return obj[key];
  },

  sort: function(element, type, sortkey) {
    // This function will sort the Arrays, read about sort at MDN:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    if(element === undefined) throw new Error("Please provide a valid Object/Array for the sort() function");

    type = type || "ascend";
    if(SORT_TYPES.indexOf(type) === -1) throw new Error("ascend & descend are the only options for the sort() function");

    if(element instanceof Object) {
      // first we convert the Object to Array of Objects
      element = this.objToArray(element);

      if(sortkey === undefined || sortkey != "key" || sortkey != "value") {
        // take the first key to occur when you loop in the Object
        for(var key in element[0]) {
          sortkey = key;
          break;
        }
      }

      if(type == "descend") {
        element.sort(function(a, b) {
          if (a[sortkey] < b[sortkey] ) {
            return 1;
          }
          if (a[sortkey] > b[sortkey] ) {
            return -1;
          }
          return 0;
        });
      }
      else if(type == "ascend") {
        element.sort(function(a, b) {
          if (a[sortkey] > b[sortkey] ) {
            return 1;
          }
          if (a[sortkey] < b[sortkey] ) {
            return -1;
          }
          return 0;
        });
      }

      var obj = {};
      for(var i = 0; i < element.length; i++) {
        obj[element[i].key] = element[i].value;
      }

      return obj;
    }
    else if(element instanceof Array) {
      if(element[0] instanceof Object) {
        if(sortkey === undefined) {
          for(var k in element[0]) {
            sortkey = k;
            break;
          }
        }
        if(type == "descend") {
          element.sort(function(a, b) {
            if (a[sortkey] < b[sortkey] ) {
              return 1;
            }
            if (a[sortkey] > b[sortkey] ) {
              return -1;
            }
            return 0;
          });
        }
        else if(type == "ascend") {
          element.sort(function(a, b) {
            if (a[sortkey] > b[sortkey] ) {
              return 1;
            }
            if (a[sortkey] < b[sortkey] ) {
              return -1;
            }
            return 0;
          });
        }
      }
      else {
        if(type == "descend") {
          element.sort(function(a, b) {
            return b - a;
          });
        }
        else if(type == "ascend") {
          element.sort(function(a, b) {
            return b < a;
          });
        }

        return element;
      }
    }
  },

  browser: function() {
    // This function was written with the help of this answer:
    // http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    // var isBlink = (isChrome || isOpera) && !!window.CSS;

    var isUC = (window.navigator.userAgent.toLowerCase().indexOf("UCBrowser") > -1);
    var isSilk = (window.navigator.userAgent.toLowerCase().indexOf("silk") > -1);

    var browserArr = {
      "FireFox": isFirefox,
      "Silk": isSilk,
      "Chrome": isChrome,
      "Edge": isEdge,
      "Opera": isOpera,
      "Safari": isSafari,
      "IE": isIE,
      "UCBrowser": isUC,
    };

    for(var key in browserArr) {
      if(browserArr[key]) {
        if(this.ismobile()) {
          return key + " Mobile";
        }
        return key;
      }
    }

    return "Unknown Browser";
  },

  os: function() {
    // This will return the user's OS depending on the headers from userAgent
    // availabe browsers: UCBrowser, Chrome, FireFox, Safari, Opera, Edge, IE

    console.log(window.navigator.userAgent);
    if(window.navigator.userAgent.toLowerCase().indexOf("meego") > -1){
      return "MeeGo";
    }
    else if(/BlackBerry|BB10|PlayBook/i.test(window.navigator.userAgent)) {
      return "BlackBerry";
    }
    else if(/IEMobile|Edge|MSIE|Windows Phone/i.test(window.navigator.userAgent)) {
      return "Windows Phone";
    }
    else if(window.navigator.userAgent.toLowerCase().indexOf("win") > -1) {
      return "Windows";
    }
    else if(window.navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      return "Android";
    }
    else if(window.navigator.userAgent.toLowerCase().indexOf("linux") > -1) {
      return "Linux";
    }
    else if(/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
      return "iOS";
    }
    else if(window.navigator.userAgent.toLowerCase().indexOf("mac") > -1) {
      return "Mac OS";
    }
    else if(window.navigator.userAgent.toLowerCase().indexOf("x11") > -1) {
      return "Unix";
    }
    else {
      return "Unknown OS";
    }
  },

  device: function() {
    // This will return the user's device depending on the headers from userAgent

    if (/Tablet|iPad|Silk|PlayBook/i.test(window.navigator.userAgent)) {
      return "Tablet";
    }
    else if(this.ismobile()) {
      return "Mobile";
    }
    else {
      return "Desktop";
    }
  },

  ismobile: function() {
    var regX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|BB10|Windows Phone|meego/i;
    return regX.test(window.navigator.userAgent);
  },

  uuid: function(uuid) {
    if(uuid === undefined) {
      // if no UUID was sent then the funtion will generate a one
      var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
    }
    else if(typeof uuid === "string") {
      // if the user sent a UUID then he wants to check if it's a valid one
      var regX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return regX.test(uuid);
    }
  },

  protocol: function() {
    return window.location.href.split("/")[0];
  },

  domain: function() {
    return window.location.href.split("/")[2];
  },

  deepClone: function(val) {
    return JSON.parse(JSON.stringify(val));
  },

  delay: function(fn ,ms) {
    if(ms === undefined || ms < 0) ms = 1;
    setTimeout(function() {
      fn();
    }, ms);
  }
};

function select(cssSelector) {
  var _that = this;

  var elements = [].slice.call(document.querySelectorAll(cssSelector));
  elements.map(function(element, i) {
    _that[i] = element[i];
  });
  this.length = elements.length;

  return this;
}

select.prototype.hasclass = function(cls) {
  if(cls === undefined) throw new Error("Please provide a valid String for the hasclass() function");

  for(var i = 0, len = this.length; i < len; i++) {
    if(this[i].classList.contains(cls)) {
      return true;
    }
  }
  return false;
};

select.prototype.addclass = function(cls) {
  if(cls === undefined) throw new Error("Please provide a valid String for the addclass() function");
  
  if(!this.hasclass(cls)) {
    for(var i = 0, len = this.length; i < len; i++) {
      this[i].classList.add(cls);
    }
  }
  
  return this;
};

select.prototype.removeclass = function(cls) {
  if(cls === undefined) throw new Error("Please provide a valid String for the removeclass() function");

  if(this.hasclass(cls)) {
    for(var i = 0, len = this.length; i < len; i++) {
      this[i].classList.remove(cls);
    }
  }

  return this;
};

select.prototype.replaceclass = function(oldcls, newcls) {
  if(oldcls === undefined || newcls === undefined) throw new Error("Please provide a valid String for the removeclass() function");

  this.removeclass(oldcls);
  this.addclass(newcls);

  return this;
};

select.prototype.toggleclass = function(oldcls, newcls) {
  if(cls === undefined) throw new Error("Please provide a valid String for the toggleclass() function");

  if(this.hasclass(cls)) {
    this.removeclass(oldcls);
  }
  else {
    this.addclass(newcls);
  }

  return this;
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = webility;
  }
  exports.webility = webility;
}