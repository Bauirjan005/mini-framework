/**
 * Custom Virtual DOM implementation
 */

/**
 * Hyperscript function to create a Virtual Node
 * @param {string} tag 
 * @param {object} props 
 * @param  {...any} children 
 */
export function h(tag, props, ...children) {
    return {
        tag,
        props: props || {},
        children: children.flat().filter(child => child !== null && child !== undefined && child !== false)
    };
}

/**
 * Creates a real DOM node from a Virtual Node
 * @param {object|string|number} vnode 
 * @returns {Node}
 */
function createRealDOM(vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(String(vnode));
    }

    const { tag, props, children } = vnode;
    const element = document.createElement(tag);

    // Handle attributes and events
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
            // Custom Event API Abstraction
            // Developers use 'onclick', 'oninput', etc. in props
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, (e) => {
                // We can pass a custom event object or just the original one
                value(e);
            });
        } else if (key === 'className' || key === 'class') {
            element.setAttribute('class', value);
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    // Append children
    children.forEach(child => {
        element.appendChild(createRealDOM(child));
    });

    return element;
}

/**
 * Renders a VNode tree into a container
 * @param {object} vnode 
 * @param {HTMLElement} container 
 */
export function render(vnode, container) {
    // Basic implementation: replace all content
    // In a more advanced version, we would use a diffing algorithm
    container.innerHTML = '';
    if (vnode) {
        container.appendChild(createRealDOM(vnode));
    }
}
