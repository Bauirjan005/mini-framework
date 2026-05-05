import { MiniFramework } from '../framework/index.js';
const { h, render, createRouter } = MiniFramework;
import { store, actions } from './store.js';

/**
 * Todo Item Component
 */
const TodoItem = (todo) => h('li', { 
    className: `todo-item ${todo.completed ? 'completed' : ''}`,
    key: todo.id 
}, [
    h('input', {
        className: 'toggle',
        type: 'checkbox',
        checked: todo.completed ? 'checked' : null,
        onclick: () => actions.toggleTodo(todo.id)
    }),
    h('label', {
        onclick: () => actions.toggleTodo(todo.id)
    }, todo.text),
    h('button', {
        className: 'destroy',
        onclick: (e) => {
            e.stopPropagation();
            actions.deleteTodo(todo.id);
        }
    }, '×')
]);

/**
 * Main App Component
 */
const App = (state) => {
    const { todos, filter } = state;
    
    // Filter todos
    const filteredTodos = todos.filter(t => {
        if (filter === '/active') return !t.completed;
        if (filter === '/completed') return t.completed;
        return true;
    });

    const activeCount = todos.filter(t => !t.completed).length;
    const hasCompleted = todos.some(t => t.completed);

    return h('div', { className: 'todo-app' }, [
        h('header', {}, [
            h('h1', {}, 'todos'),
            h('div', { className: 'new-todo-container' }, [
                h('input', {
                    className: 'new-todo',
                    placeholder: 'What needs to be done?',
                    autofocus: true,
                    onkeydown: (e) => {
                        if (e.key === 'Enter') {
                            actions.addTodo(e.target.value);
                            e.target.value = '';
                        }
                    }
                })
            ])
        ]),
        
        todos.length > 0 ? h('section', { className: 'main' }, [
            h('ul', { className: 'todo-list' }, 
                filteredTodos.map(TodoItem)
            )
        ]) : h('div', { className: 'empty-state' }, 'No tasks yet. Add one above!'),

        todos.length > 0 ? h('footer', { className: 'footer' }, [
            h('span', { className: 'todo-count' }, [
                h('strong', {}, activeCount),
                ` ${activeCount === 1 ? 'item' : 'items'} left`
            ]),
            h('ul', { className: 'filters' }, [
                h('li', {}, h('a', { 
                    href: '#/', 
                    className: filter === '/' ? 'selected' : '' 
                }, 'All')),
                h('li', {}, h('a', { 
                    href: '#/active', 
                    className: filter === '/active' ? 'selected' : '' 
                }, 'Active')),
                h('li', {}, h('a', { 
                    href: '#/completed', 
                    className: filter === '/completed' ? 'selected' : '' 
                }, 'Completed'))
            ]),
            hasCompleted ? h('button', {
                className: 'clear-completed',
                onclick: actions.clearCompleted
            }, 'Clear completed') : null
        ]) : null
    ]);
};

/**
 * Initialize Application
 */
const root = document.getElementById('app');

// Initial render
const update = () => {
    const state = store.getState();
    render(App(state), root);
};

// Subscribe to state changes for re-rendering
store.subscribe(update);

// Initialize Router
createRouter({
    '/': 'all',
    '/active': 'active',
    '/completed': 'completed'
}, (route, path) => {
    actions.setFilter(path);
});

// Run initial render
update();
