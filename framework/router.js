export class Router {
    constructor(routes, container) {
        this.routes = routes;
        this.container = container;
        window.onpopstate = () => this.resolve();
    }
    navigate(path) {
        window.history.pushState({}, '', path);
        this.resolve();
    }
    async resolve() {
        const path = window.location.pathname;
        const component = this.routes[path] || this.routes['/'];
        const { mount } = await import('./dom.js');
        mount(component(), this.container);
    }
}
