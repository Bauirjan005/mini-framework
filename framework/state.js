/**
 * State Management System
 */

export function createStore(initialState) {
    let state = initialState;
    const listeners = [];

    /**
     * Returns the current state
     */
    const getState = () => state;

    /**
     * Updates the state and notifies subscribers
     * @param {object|function} updater 
     */
    const update = (updater) => {
        const nextState = typeof updater === 'function' ? updater(state) : updater;
        state = { ...state, ...nextState };
        listeners.forEach(listener => listener(state));
    };

    /**
     * Subscribes to state changes
     * @param {function} listener 
     * @returns {function} Unsubscribe function
     */
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    };

    return {
        getState,
        update,
        subscribe
    };
}
