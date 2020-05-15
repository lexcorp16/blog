---
title: State management in React
date: "2019-11-20T22:12:03.284Z"
description: "Is state management really such a big deal?"
---

When we hear state management in React, things like React context, Redux, etc immediately come to mind and this makes sense as these are the popular ways that we handle state management in React but it turns out that there are even more ways that we can manage state in React applications and most of these methods do not have anything to do with React. They are simply implementations of common design patterns like Higher-order functions, Render props, etc. and so understanding them gives us a better understanding of general programming design patterns.

I will try to keep this piece short by adding links for further reading as opposed to full on explanations.


**What exactly is application state?**

In its simplest form, state describes the status of the entire program or an individual object. There is absolutely nothing special about it as it is simply used to determine how an application looks and behaves at any point in time. Knowing this makes it easier to see that state management is nothing more than a mechanism for us to create, read, and update an application's looks and behavior as desired.

Some 'not so obvious' ways of managing state in React applications include;

  - The render props pattern
  - Higher order components
  - Custom hooks


### Higher Order Components

A higher-order component (HOC) is simply a React component that wraps another one and can hence be used to supercharge the wrapped component. HOCs can be implemented as ***Props proxies*** or as a means to achieve ***Inheritance Inversion.***

Some of the applications of HOCs include;

- Code reuse, logic and bootstrap abstraction
- Render Highjacking
- State abstraction and manipulation
- Props manipulation

The HOC pattern is becoming less popular in React in favor of hooks as they could lead to added complexities and what is often called 'wrapper hell' but it remains a very important design pattern in Javascript.

**Highly recommended further reading:** [React Higher Order Components in depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)


### Render Props

The Render props pattern in React provides a way for us to create a component that provides some kind of data to a child component. This essentially gives us a similar behaviour as HOCs but with a different syntax. According to the React docs; 

*"the term render prop refers to a technique for sharing code between React components using a prop whose value is a function"* 

Render props can be implemented by;

- Passing functions as `props`
- Passing a function as the `children` prop

With the Render Props pattern, we are able to achieve pretty much all the uses cases we can with HOCs which also includes managing application state.

**Recommended further reading:** [React Render Props](https://tylermcginnis.com/react-render-props/)

### Custom hooks

A lot of React developers (myself included) think that the introduction of hooks to React is the best thing since sliced bread. React hooks are awesome for a number of reasons;

- We are now able to write entire React applications using the functional programming paradigm.
- Hooks make reusability a lot easier than it ever was.
- React applications written using hooks are now easier to test as the entire application is simply a composition of functions.
- Using hooks potentially makes React code more readable and abstraction is easier without needing to resort to complicated syntax like Render props.
- React hooks remove the ambiguity around component lifecycle methods and now code related to the same concern need not be spread across multiple lifecycle methods.

The list goes on and on. Through the use of custom hooks we are able to achieve the same benefits as HOCs and Render props without any complicated syntax or new API.

> Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function. *- John Carmack. Oculus VR CTO*.

**Nice read on React Hooks:** [Why React Hooks?](https://tylermcginnis.com/why-react-hooks/)

In conclusion, I have found that understanding things from first principles and studying native solutions to common problems gives us a deeper understanding of the subject matter and can help us make better decisions when writing our applications. A new library, framework or API may not be the answer; it could just be a common design pattern.