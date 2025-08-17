
const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all', // all, active, completed
      
      addTodo: (text) => {
        const newTodo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        }
        
        set((state) => ({
          todos: [...state.todos, newTodo]
        }))
      },
      
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }))
      },
      
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }))
      },
      
      editTodo: (id, newText) => {
        const trimmedText = newText.trim()
        if (!trimmedText) {
          get().deleteTodo(id)
          return
        }
        
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: trimmedText } : todo
          )
        }))
      },
      
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed)
        }))
      },
      
      toggleAll: () => {
        const { todos } = get()
        const allCompleted = todos.every((todo) => todo.completed)
        
        set((state) => ({
          todos: state.todos.map((todo) => ({
            ...todo,
            completed: !allCompleted
          }))
        }))
      },
      
      setFilter: (filter) => {
        set({ filter })
      },
      
      getFilteredTodos: () => {
        const { todos, filter } = get()
        
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed)
          case 'completed':
            return todos.filter((todo) => todo.completed)
          default:
            return todos
        }
      },
      
      getTodoStats: () => {
        const { todos } = get()
        return {
          total: todos.length,
          completed: todos.filter((todo) => todo.completed).length,
          active: todos.filter((todo) => !todo.completed).length,
        }
      },
    }),
    {
      name: 'neo-brutalism-todos',
      version: 1,
    }
  )
)

export default useTodoStore