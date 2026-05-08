export class Store {
    constructor(init) { this.state = init; this.listeners = []; }
    setState(newS) { this.state = { ...this.state, ...newS }; this.listeners.forEach(l => l()); }
    subscribe(l) { this.listeners.push(l); }
}
