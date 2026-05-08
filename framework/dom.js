export function h(tag, props, ...children) {
    return { tag, props: props || {}, children: children.flat().filter(c => c != null) };
}
export function createElement(node) {
    if (typeof node === 'string' || typeof node === 'number') return document.createTextNode(node);
    const el = document.createElement(node.tag);
    if (node.props) {
        Object.entries(node.props).forEach(([key, value]) => {
            if (key.startsWith('on')) el.addEventListener(key.substring(2).toLowerCase(), value);
            else if (key === 'className') el.setAttribute('class', value);
            else el.setAttribute(key, value);
        });
    }
    node.children.forEach(child => el.appendChild(createElement(child)));
    return el;
}
export function mount(vnode, container) {
    container.innerHTML = '';
    container.appendChild(createElement(vnode));
}
