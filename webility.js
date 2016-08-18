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
    if(cssSelector !== undefined && cssSelector.constructor === String &&
      cssSelector.trim().length > 0) {
      return new select(cssSelector);
    }
    else {
      throw new Error("Please provide a valid String for the select() function");
    }
  },

  title: function(str) {
    // This was written with the help of this answer on StackOverFlow
    // http://stackoverflow.com/a/196991/4341572

    var _current = str;
    var _final = _current.replace(/\w\S*/g, function(str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });

    return _final;
  },

  quote: function(str) {
    // This was a native function in the past now it's not supported
    // Read about it at MDN:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/quote

    if(str.constructor !== String) {
      str = str.toString();
    }
    var _current = str;
    var _final = '"' + _current + '"';

    return _final;
  },

  capitalize: function(str) {
    // This will capitalize only the first character

    var _current = str;
    var _final = _current.charAt(0).toUpperCase() + str.substr(1).toLowerCase();

    return _final;
  },

  today: function() {
    var _IEsupport = Date.prototype.toISOString instanceof Function;
    var now = new Date();
    var today;
    if(_IEsupport) {
      today = now.toISOString().substr(0,10);

      return today;
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

      return today;
    }
  },

  toUTC: function(date) {
    date = date.replace(" ", "T");
    var d = new Date(date);
    var inUTC = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
    inUTC = inUTC.toISOString().substr(0,16).replace("T"," ");

    return inUTC;
  },

  toLocalTime: function(date) {
    date = date.replace("T", " ");
    var d = new Date(date + " UTC");
    var inLocal = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
    inLocal = inLocal.toISOString().substr(0,16).replace("T"," ");

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
    if(element === undefined) {
      throw new Error("Please provide a valid Object/Array for the isEmpty() function");
    }

    if(Object.keys(element).length === 0) {
      return true;
    }
    else {
      return false;
    }
  },

  get: function(obj, key, value) {
    // Inspired by the get function in python, read more about it:
    // http://www.tutorialspoint.com/python/dictionary_get.htm

    if(obj.constructor !== Object) {
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

    if(element === undefined) {
      throw new Error("Please provide a valid Object/Array for the sort() function");
    }

    if(type === undefined) {
      type = "ascend";
    }
    else if(type != "ascend" || type != "descend") {
      throw new Error("ascend & descend are the only options for the sort() function");
    }

    if(element.constructor === Object) {
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
    else if(element.constructor === Array) {
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
          element.sort();
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
    var regX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|BB10|Windows Phone/i;
    if( regX.test(window.navigator.userAgent) ) {
      return true;
    }
    else {
      return false;
    }
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
    else if(uuid.constructor === String) {
      // if the user sent a UUID then he wants to check if it's a valid one
      var regX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      return regX.test(uuid);
    }
  },

};

function select(cssSelector) {
  var selectorChars = [].slice.call(cssSelector, 0);
  var id = 0, cls = 0, space = 0;

  for(var i = 0; i < selectorChars.length; i++) {
    switch (selectorChars[i]) {
      case "#":
        id += 1;
        break;
      case ".":
        cls += 1;
        break;
      case " ":
        space += 1;
        break;
      default:
        break;
    }
  }

  var element;
  if(cls === 0 && id === 0) {
    element = document.getElementsByTagName(cssSelector);
  }
  else if(cls === 0 && space === 0 && id == 1) {
    cssSelector = cssSelector.replace("#","");
    element = document.getElementById(cssSelector);
  }
  else if(cls == 1 && space === 0 && id === 0) {
    cssSelector = cssSelector.replace(".","");
    element = document.getElementsByClassName(cssSelector);
  }
  else {
    element = document.querySelectorAll(cssSelector);
  }

  if(cls === 0 && space === 0 && id == 1) {
    var elem = element;
    element = [].slice.call(element, 0);
    element.push(elem);
  }
  else {
    element = [].slice.call(element, 0);
  }


  for(i = 0; i < element.length; i++) {
    this[i] = element[i];
  }
  this.length = element.length;

  return this;
}

select.prototype.ID = function(option) {
  var i;
  if(!this[0]) {
    // if the selector returned nothing
    throw new Error("No element was selected");
  }

  if(option === undefined) {
    return this[0].id || "No ID";
  }
  else if(option === "remove") {
    for(i = 0; i < this.length; i++) {
      this[i].id = "";
    }
    return this;
  }
  else if(option.constructor === String) {
    for(i = 0; i < this.length; i++) {
      this[i].id = option;
    }
    return this;
  }
};

select.prototype.hasclass = function(cls) {
  // depend on select function above
  if(!this[0]) {
    // if the selector returned nothing
    throw new Error("No element was selected");
  }

  if(cls === undefined) {
    throw new Error("Please provide a valid String for the hasclass() function");
  }
  var i;
  if(("classList" in document.createElement("_"))) {
    // if classList is supported
    for(i = 0; i < this.length; i++) {
      if(this[i].classList.contains(cls)) {
        return true;
      }
    }

    return false;

  }
  else {
    // for browsers that doesn't support classList
    var regX = new RegExp("\\b" + cls + "\\b", "g");
    for(i = 0; i < this.length; i++) {
      if(regX.test(" " + this[i].className + " ")) {
        return true;
      }
    }

    return false;
  }
};

select.prototype.addclass = function(cls) {
  // depend on select function above
  if(cls === undefined) {
    throw new Error("Please provide a valid String for the hasclass() function");
  }

  for(var i = 0; i < this.length; i++) {
    this[i].className += (" " + cls);
  }
  return this;
};

select.prototype.removeclass = function(cls) {
  // depend on select function above
  if(cls === undefined) {
    throw new Error("Please provide a valid String for the hasclass() function");
  }

  var regX = new RegExp("\\b" + cls + "\\b", "g");

  for(var i = 0; i < this.length; i++) {
    this[i].className = (" " + this[i].className + " ");
    this[i].className = this[i].className.replace(regX, "");
  }

  return this;
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = webility;
  }
  exports.webility = webility;
} else {
  root.webility = webility;
}

// module.exports = webility;
