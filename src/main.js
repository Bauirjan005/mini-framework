import { h, mount } from '../framework/dom.js';
import { Store } from '../framework/store.js';

const store = new Store({ 
    todos: [], 
    editingId: null,
    editValue: '' 
});

function App() {
    const { todos, editingId, editValue } = store.state;

    return h('div', { className: 'todoapp' }, [
        h('header', {}, [
            h('h1', {}, 'todos'),
            h('input', { 
                className: 'new-todo',
                placeholder: 'What needs to be done?',
                autoFocus: true,
                onkeydown: (e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                        const newTodo = { id: Date.now(), text: e.target.value, completed: false };
                        store.setState({ todos: [...todos, newTodo] });
                        e.target.value = '';
                    }
                }
            })
        ]),
        h('section', { className: 'main' }, [
            h('ul', { className: 'todo-list' }, todos.map(todo => {
                const isEditing = editingId === todo.id;
                
                return h('li', { className: `${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}` }, [
                    h('div', { className: 'view' }, [
                        h('input', { 
                            className: 'toggle', 
                            type: 'checkbox', 
                            checked: todo.completed,
                            onchange: () => {
                                const newTodos = todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t);
                                store.setState({ todos: newTodos });
                            }
                        }),
                        h('label', { 
                            ondblclick: () => store.setState({ editingId: todo.id, editValue: todo.text }) 
                        }, todo.text),
                        h('button', { 
                            className: 'destroy', 
                            onclick: () => store.setState({ todos: todos.filter(t => t.id !== todo.id) }) 
                        }, '×')
                    ]),
                    isEditing ? h('input', {
                        className: 'edit',
                        value: editValue,
                        oninput: (e) => store.setState({ editValue: e.target.value }),
                        onblur: () => store.setState({ editingId: null }),
                        onkeydown: (e) => {
                            if (e.key === 'Enter') {
                                const updated = todos.map(t => t.id === todo.id ? { ...t, text: editValue } : t);
                                store.setState({ todos: updated, editingId: null });
                            } else if (e.key === 'Escape') {
                                store.setState({ editingId: null });
                            }
                        }
                    }) : null
                ]);
            }))
        ]),
        todos.length > 0 ? h('footer', { className: 'footer' }, [
            h('span', {}, `${todos.filter(t => !t.completed).length} items left`)
        ]) : null
    ]);
}

const root = document.getElementById('app');
store.subscribe(() => mount(App(), root));
mount(App(), root);
