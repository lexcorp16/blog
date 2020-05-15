---
title: Inversion of Control
date: "2019-11-11T22:12:03.284Z"
description: "Better APIs, better abstractions"
---

Wikipedia has this to say about inversion of control;

> in traditional programming, the custom code that expresses the purpose of the program calls into reusable libraries to take care of generic tasks, but with inversion of control, it is the framework that calls into the custom, or task-specific, code.

The point of IoC is to achieve abstractions that are simple and easy to customize without resulting in an API that is difficult to use; in the end, your abstractions remain clean and small, and the onus is on the user to customize the behavior of that abstraction as they see fit. 

Consider the following example;

`1.0`
```js
// let's pretend that Array.prototype.filter does not exist
function filter(array) {
  let newArray = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (element !== null && element !== undefined) {
      newArray[newArray.length] = element
    }
  }
  return newArray
}

// now we have a function that can remove `null` and `undefined` values from an array.

// use case:
filter([0, 1, undefined, 2, null, 3, 'four', ''])
// [0, 1, 2, 3, 'four', '']
```

Imagine we now have multiple new use cases for our newly created filter function. In addition to filtering out `null`  and `undefined` values We need to be able to filter out `zero` values and empty strings. One way to approach this could be;

```js
function filter(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
  } = {},
) {
  let newArray = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (
      (filterNull && element === null) ||
      (filterUndefined && element === undefined) ||
      (filterZero && element === 0) ||
      (filterEmptyString && element === '')
    ) {
      continue
    }
    newArray[newArray.length] = element
  }
  return newArray
}

// use cases: 
filter([0, 1, undefined, 2, null, 3, 'four', ''])
// [0, 1, 2, 3, 'four', '']
filter([0, 1, undefined, 2, null, 3, 'four', ''], {filterNull: false})
// [0, 1, 2, null, 3, 'four', '']
filter([0, 1, undefined, 2, null, 3, 'four', ''], {filterUndefined: false})
// [0, 1, 2, undefined, 3, 'four', '']
filter([0, 1, undefined, 2, null, 3, 'four', ''], {filterZero: true})
// [1, 2, 3, 'four', '']
filter([0, 1, undefined, 2, null, 3, 'four', ''], {filterEmptyString: true})
// [0, 1, 2, 3, 'four']
```

We have been able to accomplish what we set out to do but you will agree that this function has become overly complex and is now a nightmare to test as there are multiple combinations of props that we need to test to ensure that the function works as we expect. We will definitely still get more feature requests and this function will continue to grow and eventually become a `god function` that no one dares change for fear of breaking certain use cases.

We can apply inversion of control here and instead, have the user pass us a filter function that determines what should be kept in the array and what should be removed. (this is pretty much how `Array.prototype.filter` actually works).

`1.2`
```js
function filter(array, filterFn) {
  let newArray = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (filterFn(element)) {
      newArray[newArray.length] = element
    }
  }
  return newArray
}


filter(
  [0, 1, undefined, 2, null, 3, 'four', ''],
  el => el !== null && el !== undefined,
)
// [0, 1, 2, 3, 'four', '']
filter([0, 1, undefined, 2, null, 3, 'four', ''], el => el !== undefined)
// [0, 1, 2, null, 3, 'four', '']
filter([0, 1, undefined, 2, null, 3, 'four', ''], el => el !== null)
// [0, 1, 2, undefined, 3, 'four', '']
filter(
  [0, 1, undefined, 2, null, 3, 'four', ''],
  el => el !== undefined && el !== null && el !== 0,
)
// [1, 2, 3, 'four', '']
filter(
  [0, 1, undefined, 2, null, 3, 'four', ''],
  el => el !== undefined && el !== null && el !== '',
)
// [0, 1, 2, 3, 'four']
```

Now our function is significantly simpler and we can support as many use cases as is required. Testing is also trivial to do now as we do not have to worry about prop combinations. We can even go as far as building more abstractions on top of this abstraction to handle special use cases as required.

We can reimplement case `1.1` trivially like so
```js
function filterWithOptions(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
  } = {},
) {
  return filter(
    array,
    element =>
      !(
        (filterNull && element === null) ||
        (filterUndefined && element === undefined) ||
        (filterZero && element === 0) ||
        (filterEmptyString && element === '')
      ),
  )
}
```

Quick React example

 
Say we have a `Button` component implemented like this;

`2.0`
```jsx
import React from 'react';

const Button = ({ text }) => {
  return (
    <button>{text}</button>
  )
}

export default Button;
```

And then we realise that some buttons can have font awesome icons. One way to extend this button to support that  is to accept a new `iconName` prop and default it to an empty string or `null`;

`2.1`
```js
import React from 'react';

const Button = ({ text, iconName = null }) => {
	return (
    <button>
      {text}
      {iconName && <i className=`${iconName}`></i>}
    </button>
  )
}

export default Button;

// use case:
<Button text="Click Me" iconName="fa fa-angle-right"/>
```

We can apply the principle of inversion of control to solve this same problem by having the user of this button tell us exactly what they want to render using `render props`

`2.2`
```jsx
import React from 'react';

const Button = ({ children }) => {
  return (
    <button>
      {children()}
    </button>
  )
}

export default Button;

// user case: 
<Button>
{() => <>Click Me <i className="fa fa-angle-right"></i></>}
</Button>
```

So as we build libraries, reusable components, and functions, Inversion of control is one technique to keep in our arsenal. Before you reach for that `if` statement, or accept that new prop, see if inversion of control could be a better solution. 

Be careful though, if a function has just one use case, applying inversion control techniques will simply introduce unnecessary complexity. Remember, premature optimization is the root of all evil. 👹