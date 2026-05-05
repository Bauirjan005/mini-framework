# Mini-Framework Documentation

Welcome to **Mini-Framework**, a lightweight, custom JavaScript framework designed to demonstrate the core principles of modern web frameworks: **Inversion of Control**, **Declarative UI**, and **Reactive State Management**.

## Table of Contents
1. [Core Features](#core-features)
2. [Getting Started](#getting-started)
3. [API Reference](#api-reference)
    - [Creating Elements](#creating-elements)
    - [Nesting Elements](#nesting-elements)
    - [Handling Events](#handling-events)
    - [Attributes and Styles](#attributes-and-styles)
4. [State Management](#state-management)
5. [Routing System](#routing-system)
6. [Why it works (The Rationale)](#why-it-works-the-rationale)

---

## Core Features

- **Virtual DOM Abstraction**: Uses a Virtual DOM to represent the UI, allowing for declarative component definitions.
- **Inversion of Control**: The framework manages the rendering cycle. You define *what* the UI should look like, and the framework handles *how* to update the real DOM.
- **Reactive State**: A simple observer-based state management system that triggers UI updates whenever the state changes.
- **Hash-based Routing**: Synchronizes the application state with the URL for a seamless Single Page Application (SPA) experience.
- **Custom Event API**: Abstraction over native DOM events for cleaner component code.

---

## Getting Started

To use the framework, import the `MiniFramework` object or individual utilities from the framework directory:

```javascript
import { h, render, createStore } from './framework/index.js';
```

---

## API Reference

### Creating Elements
Use the `h(tag, props, ...children)` function (Hyperscript) to create a Virtual Node.

```javascript
const element = h('div', { className: 'container' }, 'Hello World');
```

### Nesting Elements
Children can be strings, numbers, other Virtual Nodes, or an array of Virtual Nodes.

```javascript
const list = h('ul', { className: 'list' }, [
    h('li', {}, 'Item 1'),
    h('li', {}, 'Item 2'),
    h('li', {}, 'Item 3')
]);
```

### Handling Events
Events are passed in the `props` object using the `on[EventName]` convention.

```javascript
const button = h('button', {
    onclick: () => alert('Clicked!')
}, 'Click Me');
```
*Note: Behind the scenes, the framework maps these to native `addEventListener` calls, but keeps your component logic clean and declarative.*

### Attributes and Styles
Standard HTML attributes are passed in the props object. Special handling is provided for `className` and `style`.

```javascript
const styledBox = h('div', {
    className: 'box active',
    style: {
        backgroundColor: '#6366f1',
        padding: '20px',
        borderRadius: '8px'
    }
}, 'Styled Content');
```

---

## State Management

The framework provides a `createStore` function to manage application state.

```javascript
const store = createStore({ count: 0 });

// Update state
store.update(state => ({ count: state.count + 1 }));

// Subscribe to changes
store.subscribe((state) => {
    console.log('New count:', state.count);
    // Usually, you would trigger a re-render here
    render(App(state), document.getElementById('app'));
});
```

---

## Routing System

The routing system synchronizes the URL hash with your application state.

```javascript
const router = createRouter({
    '/': 'home',
    '/about': 'about'
}, (route, path) => {
    // This callback runs whenever the hash changes
    console.log(`Navigated to ${path}`);
    store.update({ currentRoute: path });
});

// Programmatic navigation
router.navigate('/about');
```

---

## Why it works (The Rationale)

### 1. Inversion of Control (Framework vs. Library)
In a library (like jQuery), you call the library's methods to manipulate the DOM directly. You are in control of when and how the DOM changes.
In this **Mini-Framework**, control is inverted. You provide the framework with a "blueprint" (the Virtual DOM) and a state. The framework decides when to call your components and how to update the DOM. This leads to more predictable and maintainable code.

### 2. The Virtual DOM
Directly manipulating the DOM is expensive and error-prone. By using a Virtual DOM (a plain JS object representation), we can calculate changes in memory and apply them to the real DOM in a controlled manner. In this version, we replace the container content for simplicity, but the architecture allows for efficient diffing.

### 3. Reactive Data Flow
By centralizing state in a "Store," we ensure a "single source of truth." When the state changes, all subscribers (like the main renderer) are notified, ensuring the UI is always in sync with the data.

### 4. Semantic Abstraction
The custom Event API and Attribute handling provide a cleaner developer experience (DX). By abstracting `addEventListener` and `setAttribute`, we allow developers to write code that looks like HTML but behaves like JavaScript.
