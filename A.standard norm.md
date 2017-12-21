# 我常忽略的代码规范
* shorthand properties at the beginning
```javascript
// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```
* Prefer the spread operator(...) over Object.assign
```
// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```
* To convert an array-like object to an array, use Array.from.
```
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```
* Use return statements in array method callbacks(要有return 可以无意义）
```
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```
* Use default parameter syntax and always put default parameters last.
```
// good
function handleThings(name, opts = {}) {
  // ...
}
```
* Use Object.prototype.hasOwnProperty.call(object, key)
```javascript
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
/* or */
import has from 'has';
// ...
console.log(has.call(object, key));
```
* Arrow function 参数单行无括号 折行有 =>不与 > < 混用
```
// good
[1, 2, 3].map(x => x * x);
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);
```
* Methods can return this to help with method chaining.
```
// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}
```
* prefer default export over named export
```
// bad
export function foo() {}

// good
export default function foo() {}
```
* Use /** ... */ for multi-line comments.
```
// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}
```
* Use // FIXME: to annotate problems. use // TODO: to annotate solutions to problems.






















