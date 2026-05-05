import { h, render } from './vdom.js';
import { createStore } from './state.js';
import { createRouter } from './router.js';

/**
 * Mini-Framework Entry Point
 */
export const MiniFramework = {
    h,
    render,
    createStore,
    createRouter
};

export { h, render, createStore, createRouter };
