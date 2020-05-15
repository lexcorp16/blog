---
title: Practical tips for writing clean code
date: "2019-12-02T22:12:03.284Z"
description: "The topic of clean code is one that is quite controversial, this article outlines simple, and practical tips for getting started"
---

The topic of clean coding is one that is probably quite controversial as different people have different definitions of what this means. Some people even think it is just one of those things that have nothing to do with the art of coding itself. As I have grown as a developer, writing and reviewing a lot of code, the importance of clean, expressive and easy to understand code has become very obvious to me.

Someone once said, as developers, we spend more time reading code than we do writing it, so it is crucial that the code we write is easy for our future selves and other developers to read and understand.

In the timeless words of the great Martin Fowler;

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand. *- Martin Fowler*

This article aims to present clean coding practices in an intuitive manner with examples that are easy to follow. After reading this article, you can begin to apply a lot of the principles highlighted here and see a dramatic improvement in the quality and 'cleanliness' of code you write.


### **Variable and Function naming**

We have all been there; you know precisely the code to write, heck you have written it, and it works like a charm, but now you are stuck on how to name that variable or that function. At this point, you are probably thinking, is it that important?? Then you go ahead and write `const d` and call it a day. (If you are writing `Golang`, this might even be desired but... I rest my case).

It is impossible to overstate how important it is to use clear and intention revealing names for variables and functions; remember, the computer is not the only consumer of the code you write. Always aim to write code in a manner where the purpose of the code is immediately apparent from first glance and one of the ways to ensure this is by using descriptive variable and function names. These names can potentially be lengthy, but better long that incomprehensible, in which case you will most likely regret it in the not too distant future.

Some characteristics of proper naming are;

- They are not vague and hence cannot be interpreted as something else. You probably do not want to name a variable `hp` even though it represents the hypotenuse of a triangle as this can be interpreted as a million other things.
- The names are easily pronounceable. Programming is often a social activity, and there is often the need to have a conversation about code; think how much easier it is to say `UserAccount` than it is to say `UsrAcct`.
- Typically, variables are named as nouns, while functions as verbs; this makes sense as variables typically `are` things and functions typically `do` things.
- The names are searchable. Issues with searchability are another reason why single name variables are a problem; imagine trying to find a variable named `e` in your code, that will probably result in 2million hits making it almost impossible to find what you need.
- They are not anagrams, puns or jokes; c'mon guys, it's hard enough as it is.
- They are consistent with approved conventions and patterns within the codebase. If functions to 'get something' are prefixed with `get`, try to resist the urge to prefix yours with `fetch` , `retrieve` or `acquire`.

The next time you need to name a variable or function, take the few extra minutes to come up with a meaningful, clear and descriptive name, your future self and your colleagues will thank you.

>**Pro Tip:** if you are finding it difficult to name a function because it is hard to summarise what it does, or you find yourself needing to use `and` or `or` in the function name, it might be an indication that the function is doing too much and should be simplified or broken down.


### Functions

Characteristics of good functions include;

**Small in size**

Functions should be **SMALL!!!** Sorry for shouting. A function is a logical grouping of functionality (see what I did there 😉) so it makes sense that it be small because that means the purpose and function of that function (last one I promise 😉) is easy to grasp and digest, which is always a plus.

Lengthy functions help no one and should be avoided like the plague. That begs the question, how long is too long? This is a difficult question to answer as there are no hard rules, but I'd say the sweet spot is probably between 4 and 7 lines. I know this is laughable in most real-world conditions but as much as you can, keep your functions as short as possible.

**Do one thing (Single Responsibility Principle)**

We have probably all come across `god functions` in some codebases that we have been cursed with; these are functions that do so many things and are so complex that they eventually become untouchable, untestable and no one dares refactor it as no one really knows what it does anyway.

Good functions do one, and only one thing, this has the benefit of making the function small, easy to name, easy to understand and consequently easy to test. Below is a prevalent example of a function that tries to do too much;

```js
const registerUser = (user) => {
	if (!user) {
		Throw new Error('Please provide a user');
	}
	
	if (// user already exists) {
		Throw new Error('User already exists')
	}

	/** If all is well, go ahead and create the user **/
}
```

This is a widespread pattern where we attempt to do some validation before performing a specific action. This function is clearly doing more that one thing and a good way to fix this is to create a `validateUser` function and invoke that in the `registerUser` function, that way, the validation function can be as robust as required without bloating the registration function and we will benefit from code reuse as the validation function can be used in other places.

>**Pro Tip:** You are probably violating the Single Responsibility Principle if your function name includes conjunction or if your function accepts a `boolean` or what we sometimes call a `flag`.

 **Have few arguments** 

The fewer the number of arguments a function accepts, the better, this is true because the more arguments a function has, the more difficult it becomes to test that function as there are many combinations of arguments to be accounted for to achieve full test coverage of that function. If a function needs to accept many arguments, check to see if;

- The function isn't attempting to do too much.
- The arguments are not all related to the same concept, in which case the function should accept an object.
- See if you could employ `Inversion of Control`

`createUser` `1.0` should be refactored to `createUser` `2.0`

```ts
// 1.0
const createUser = (id, name, email, age, height) => {
	// create user
}

interface User {
	id: number;
	name: string;
	email: string;
	height: number;
}

// 2.0
const createUser = (user: User) => {
	// create user
}
```

**Purity**

Pure functions are functions that do not have side effects (return the same output for the same set of input every single time), do not access, much less mutate shared state. Sadly, not all functions in a program can be pure as some functions invariably need to access `IO`, make network calls, log output the console, etc. As much as you can, prefer pure functions over impure ones and dependency injection over globals.

```ts
// Examples of some impure functions

// This function is impure because it will not always return 
// the same result when called as it depends on a random value
const coin = () => {
  return Math.random() < 0.5 ? 'heads' : 'tails'
}

// This uppercaseName function is also impure as it 
// depends on a variable that is  out of its control
let firstName = 'krzysztof'

const uppercaseName = (lastName) => {
  return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`
}

// Here is a pure version of uppercaseName, it acceps firstName as a variable
const uppercaseName = (lastName, firstName) => {
  return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`
}

// This is a super contrived examples but it shows a common practice. 
// addToArray is impure because it mutates someArray
const addToArray = (someArray, value) => {
	return someArray.push(value);
}

// Here is a pure version of addToArray. We create and return a new array
const addToArray = (someArray, value) => {
	return [...someArray, value];
}
```

Pure functions are clear, concise, predictable and ridiculously easy to test. As if all that is not enough, pure functions can provide performance gains through memoization as their output is the same for the same combination of inputs. What more can I say, be pure my friends, be pure.


### In code comments

From the title of this section, you might be inclined to think I am recommending the use of in code comments; you are very wrong. I believe that probably `80%` of the comments we add to code are unnecessary, and are even potentially harmful.

> The truth is in the code and nowhere else

I have seen code comments go from slightly incorrect to wildly misleading. Here are some examples from some pieces of code I have reviewed recently.

`Listing 1`

```jsx
import React, { useState } from 'react';

function App() {
	// Local state for the selected movie object
  const [movie, setMovie] = useState(null);
	
	....
}
```

This particular piece screams the fact that variables could probably be named better. The `state` in question is not just for any `movie`; it is for the movie a user has selected. I would refactor this by removing the comment and replacing `movie` and `setMovie` with `selectedMovie` and `setSelectedMovie`

`Listing 2`

This was the initial state of the code;

```jsx
export default {
	data() {...}
	methods() {
		requery() {
			// Always requery after 5 seconds
			const timeout = 5000;
			setTimeout(() => this.handleRequery, timeout);
		}
	}
}
```

and then a change in logic was introduced making it such that the timeout is determined by the state of the transaction but the comment remained the same, we have introduced a lie.

```jsx
export default {
	data() {...}
	methods() {
		requery() {
			// Always requery after 5 seconds
			const timeout = this.transaction.test ? 5000 : 0;
			setTimeout(() => this.handleRequery, timeout);
		}
	}
}
```

I eventually recommended that the comment be removed entirely and the variable name optionally change to `requeryTimeout`. The comment added no value and became an extra thing to maintain.

`Listing 3`

This is a classic case of a `doc block` that fell far behind reality. It says the function accepts an `id` and returns a `promise`, but in reality, the function accepts an `account` (which is quite ambiguous actually) and returns an `object`.

```js
/**	   
     * @description .....
     *
     * @param id
     * @return {Promise<*>}
*/
convertAssignmentArrayToObject: (account) => {	    
   ......

   const accountDetails = { ...account, assignment };
   return accountDetails;	
},
```

If we had `Typescript`, refactoring this would be as easy as removing the doc block and using type annotations to communicate the same information; in this case however, it will never be wrong. Even with plain `Javascript` , by using better names for the function and arguments, keeping the function short, we could do away with the doc block completely.

In code comments are problematic for a number of reasons;

- They are an extra thing we need to maintain along with the code and they often fall behind.
- They can sometimes become noisy and distracting.
- They can become an escape hatch for poorly written code.
- They can often be misleading and propagate 'lies'.

There are some good comments though, they include; Legal comments, Warning of consequences, Clarifications, etc.

>**Pro Tip:** When you feel the need to write a comment, first try to refactor the code so that any comment becomes superfluous.

### Implicit vs Explicit code

Always aim to over-communicate when coding. It is crucial to be as clear as possible so that at a glance, all the relevant context can be gleaned, making the code incredibly easy to understand and work with. 

Consider the code snippet below; in `form.vue`, we want to get an array of valid providers.

```js
// validator.js
export const networkProviders = [
  { name: 'DEFAULT' },
  { name: 'MTN', value: 'MTN', prefix: ['+23354', '+23355', '+23324'] },
  { name: 'VOD', value: 'Vodafone', prefix: ['+23320', '+23350'] },
];

// form.vue
import { networkProviders } from 'validator';

export default {
	...
	computed {
		providers() {
            return networkProviders.slice(1);
        },
	}
}
```

The code, as it is currently written, requires you to take a look at `validator.js` to understand why we are removing the first element. Also, if the order of the `networkProviders` array changes, the code will break. The code was eventually refactored as shown below where we can immediately tell that we want all providers that are not named `DEFAULT`;

```js
// validator.js
export const networkProviders = [
  { name: 'DEFAULT' },
  { name: 'MTN', value: 'MTN', prefix: ['+23354', '+23355', '+23324'] },
  { name: 'VOD', value: 'Vodafone', prefix: ['+23320', '+23350'] },
];

// form.vue
import { networkProviders } from 'validator';

export default {
	...
	computed {
		providers() {
            return networkProviders
                    .filter(networkProvider => networkProvider.name !== 'DEFAULT');
        },
	}
}
```

Let your code speak clearly friends.

### Globals and Shared state

Ever heard the saying, *"The love of money is the root of all evil"*? Well, they were wrong. Globals and shared state are the roots of all evil.

The problems with globals and shared state are similar in that they can be accessed and potentially modified from an unreasonably large number of sources introducing levels of unpredictability that the best thrillers will be proud of. Bugs become impossible to trace, and the entire application flow difficult to follow.

Some technologies like `sails.js` encourage the use of globals but I would argue that business logic in our code should not be tightly coupled to library code and so we could potentially do away with harmful patterns even if we are allowed to use them. This is why libraries like `Redux.js` were created because in frontend code especially, it is crucial that state changes are predictable and traceable.

Avoid globals and shared state like a plague, save yourself the headache.

>**Pro Tip**: Go a step further from eliminating shared state to taking advantage of state colocation. Keep application state as close as possible to the component that needs it. Not all pieces of state need to be available globally.


### Conclusion

There is so not covered in this article and I highly recommend `Clean Code` by Robert C. Martin as good further reading. 

Whether you believe in the concept of 'clean code' or not, I hope you at least agree that there should be some structure and sanity to the code we write. The tips highlighted above can be a great place to start.

**Resources**

`Clean Code` by Robert C. Martin

[https://medium.com/dailyjs/functional-js-2-functions-duh-70bf22f87bb8](https://medium.com/dailyjs/functional-js-2-functions-duh-70bf22f87bb8)