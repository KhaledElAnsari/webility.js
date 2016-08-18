# Webility

The Front-End developers **Utility Belt**, lightweight, smooth and easy to use.

# Examples

Examples page coming soon.

# Installation

Webility got zero dependences, just inject it your project and your hooked!.

- The old school way:

  ```html
  <script type="text/javascript" src="/js/webility.js"></script>
  ```

- The NPM way:

  ```
  npm install webility.js
  ```

  Then include it in your project like the following:

  ```javascript
  var webility = require("webility.js");

  // ES6 way
  import webility from "webility.js";
  ```

# APIs Reference

Here's the list of functionalities provided by **Webility** organized by Object Type:

  - **pageready(callback)**: will check if everything in the document is ready then will the callback function will start.

  - **select(cssSelector)**: a simple & fast DOM selector with some functions chained to it.

    - **ID()**: Chained to the select function, works in three scenarios:
      1. ID(): empty parenthesis will return the current ID of the first selected element.

      2. ID("remove"): will remove any ID assigned to the selected element(s).

      3. ID("someID"): will add the string as an ID to the selected element(s).

    - **addclass("classname")**: will add the string as a class to the selected element(s).

    - **removeclass("classname")**: will remove the string from the selected element(s) classes.

    - **hasclass("classname")**: will check if the selected element(s) has the string in there classes list, it will return `true` if the class exist and `false` if not.

  - **browser()**: will return the name of the users browser.

  - **os()**: will return the name of the users Operating System.

  - **device()**: will return the type of the users device, either Desktop, Tablet or Mobile.

  - **browser()**: will return the name of the users browser.

  - **ismobile()**: will return `true` if the user is using a mobile and `false` if not.

  - **uuid()**: will generate a UUID and if you passed a string it will check if the string is valid UUID or not.

  - **get(obj, key, defaultValue)**: made to check Objects (dictionaries or associative arrays) it takes 3 arguments (inspired by Python):
    - obj (`Object`): the object you want the function to check.

    - key (`String`): the key you want to check, if exist `get()` will return it's value if not it will assign and default value to it.

    - defaultValue (`Any`): the value you want to assign to the key in case it doesn't exist, if you don't provide it the defaultValue will be `null`.

  - **isEmpty()**: it take one argument either `Array` or `Object` and it will return `true` if empty and `false` if not.

  - **sort()**: if it's an `Array`, `Object` or an Array of Objects just name it this function will sort it, it takes two arguments:

    - element: as mentioned above `Array`, `Object` or Array of Objects.

    - type (`String`): type of the sort, either `"ascend"` or `"descend"` (default to `"ascend"`).

  - **objToArray(Object)**: this will convert the object into and array of objects.

  - **today()**: it will return the date of the currenct day in ISO format (ex: 2016-08-17 10:34:54).

  - **toUTC()**: it will return the date in UTC in ISO format (ex: 2016-08-17 10:34:54).

  - **toLocalTime()**: it will return the date Local Time in ISO format (ex: 2016-08-17 10:34:54).

  - **getDays()**: this function takes two strings of two dates and retruns an `Array ` of the days between them.

  - **dayAfter()**: this function takes two arguments first is a `String` of a date and the second one is an Integer `Number` of the wanted day after that period.

  - **dateFormat()**: coming soon.

  - **title(string)**: will capitalize the first letter of each word in the string (inspired by Python)

  - **capitalize(string)**: will capitalize the first letter of the string only.

  - **quote(string)**: will add a double quotation to the string

```javascript
// Fast example
webility.pageready(function() {
  var elems = webility.select(".someclass");
  elems.addclass("anotherclass");
  console.log(elems.hasclass("someclass")); // Output: true
  elems.removeclass("someclass");

  console.log(webility.browser()); // Output: Chrome
  console.log(webility.os()); // Output: Linux
  console.log(webility.device()); // Output: Desktop
  console.log(webility.ismobile()); // Output: false
  console.log(webility.uuid()); // Output: dbac786a-7cc7-8a8c-783d-0f1f66f01d75

  var obj = {}; var arr = [0,2,8,5,3];
  console.log(webility.isEmpty(obj)); // Output: true
  console.log(webility.sort(arr, "descend")); // Output: [8,5,3,2,0]

  console.log(webility.dayAfter("2016-08-17", 2)); // Output: 2016-08-19
  console.log(webility.title("john doe")); // Output: John Doe
});
```

# License

This project is under the MIT license.
