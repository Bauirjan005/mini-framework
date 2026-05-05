import { createStore } from '../framework/state.js';

const STORAGE_KEY = 'miniframework-todos';

/**
 * Load initial state from LocalStorage
 */
const loadState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
        todos: [],
        filter: '/'
    };
};

/**
 * Create the application store
 */
export const store = createStore(loadState());

/**
 * Save state to LocalStorage on every change
 */
store.subscribe((state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
});

/**
 * Actions
 */
export const actions = {
    addTodo: (text) => {
        if (!text.trim()) return;
        store.update(state => ({
            todos: [...state.todos, {
                id: Date.now(),
                text: text.trim(),
                completed: false
            }]
        }));
    },
    
    toggleTodo: (id) => {
        store.update(state => ({
            todos: state.todos.map(t => 
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        }));
    },
    
    deleteTodo: (id) => {
        store.update(state => ({
            todos: state.todos.filter(t => t.id !== id)
        }));
    },
    
    clearCompleted: () => {
        store.update(state => ({
            todos: state.todos.filter(t => !t.completed)
        }));
    },
    
    setFilter: (filter) => {
        store.update({ filter });
    }
};
