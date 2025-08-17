import { Button } from './ui/Button';
import { cn } from '../lib/utils';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('neo-brutal-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('neo-brutal-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Add Todo Section */}
      <div className="bg-yellow-300 border-4 border-black p-6 mb-6 shadow-[8px_8px_0px_0px_#000000]">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ADD A NEW TASK..."
            className="flex-1 px-4 py-3 text-lg font-bold bg-white border-4 border-black focus:outline-none focus:ring-0 placeholder:text-gray-500 uppercase"
          />
          <Button
            onClick={addTodo}
            className="px-8 py-3 text-lg font-black bg-pink-400 hover:bg-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150"
          >
            ADD
          </Button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {['all', 'active', 'completed'].map((filterType) => (
          <Button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={cn(
              "px-6 py-2 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150",
              filter === filterType 
                ? "bg-blue-400 text-black" 
                : "bg-white text-black hover:bg-gray-100"
            )}
          >
            {filterType}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-green-300 border-4 border-black p-4 mb-6 shadow-[8px_8px_0px_0px_#000000]">
        <div className="flex justify-between items-center text-lg font-black uppercase">
          <span>ACTIVE: {activeTodosCount}</span>
          <span>COMPLETED: {completedTodosCount}</span>
          <span>TOTAL: {todos.length}</span>
        </div>
      </div>

      {/* Todo Items */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="bg-gray-200 border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_#000000]">
            <p className="text-2xl font-black uppercase text-gray-600">
              {filter === 'all' ? 'NO TASKS YET!' : 
               filter === 'active' ? 'NO ACTIVE TASKS!' : 'NO COMPLETED TASKS!'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "border-4 border-black p-4 shadow-[6px_6px_0px_0px_#000000] transition-all duration-200",
                todo.completed 
                  ? "bg-gray-300 opacity-75" 
                  : "bg-white hover:shadow-[8px_8px_0px_0px_#000000]"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={cn(
                      "w-8 h-8 border-4 border-black font-black text-lg flex items-center justify-center transition-colors duration-150",
                      todo.completed 
                        ? "bg-green-400 text-black" 
                        : "bg-white hover:bg-gray-100"
                    )}
                  >
                    {todo.completed ? '✓' : ''}
                  </button>
                  <span className={cn(
                    "text-lg font-bold flex-1 break-words",
                    todo.completed 
                      ? "line-through text-gray-600" 
                      : "text-black"
                  )}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 border-4 border-black font-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150"
                >
                  DELETE
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear Completed Button */}
      {completedTodosCount > 0 && (
        <div className="mt-6 text-center">
          <Button
            onClick={clearCompleted}
            className="px-8 py-3 bg-orange-400 hover:bg-orange-500 border-4 border-black font-black text-lg shadow-[6px_6px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-150 uppercase"
          >
            Clear Completed ({completedTodosCount})
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoList;