import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTodos = localStorage.getItem('neo-brutal-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('neo-brutal-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
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
    <div className="min-h-screen bg-yellow-300 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-black mb-4 transform -rotate-2 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            TODO
          </h1>
          <p className="text-xl font-bold text-black bg-white px-4 py-2 border-4 border-black transform rotate-1 inline-block">
            Neo Brutal Task Manager
          </p>
        </div>

        {/* Add Todo Section */}
        <div className="bg-white border-4 border-black p-6 mb-6 transform -rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <div className="flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 text-lg font-bold border-4 border-black bg-yellow-100 focus:outline-none focus:bg-white transform hover:scale-105 transition-transform"
            />
            <Button
              onClick={addTodo}
              className="px-6 py-3 text-lg font-black bg-green-400 hover:bg-green-300 border-4 border-black transform hover:scale-110 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            >
              ADD!
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-400 border-4 border-black p-4 text-center transform rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl font-black text-black">{todos.length}</div>
            <div className="text-sm font-bold text-black">TOTAL</div>
          </div>
          <div className="bg-orange-400 border-4 border-black p-4 text-center transform -rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl font-black text-black">{activeTodosCount}</div>
            <div className="text-sm font-bold text-black">ACTIVE</div>
          </div>
          <div className="bg-pink-400 border-4 border-black p-4 text-center transform rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl font-black text-black">{completedTodosCount}</div>
            <div className="text-sm font-bold text-black">DONE</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {['all', 'active', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={cn(
                "px-4 py-2 font-black border-4 border-black transform hover:scale-110 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]",
                filter === filterType
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-200"
              )}
            >
              {filterType.toUpperCase()}
            </Button>
          ))}
          {completedTodosCount > 0 && (
            <Button
              onClick={clearCompleted}
              className="px-4 py-2 font-black bg-red-400 hover:bg-red-300 border-4 border-black transform hover:scale-110 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              CLEAR DONE
            </Button>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="bg-white border-4 border-black p-8 text-center transform rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <div className="text-2xl font-black text-gray-400">
                {todos.length === 0 ? "NO TASKS YET!" : "NO TASKS HERE!"}
              </div>
              <div className="text-sm font-bold text-gray-400 mt-2">
                {todos.length === 0 ? "Add your first task above" : "Try a different filter"}
              </div>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className={cn(
                  "bg-white border-4 border-black p-4 flex items-center gap-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all",
                  index % 2 === 0 ? "transform rotate-1" : "transform -rotate-1",
                  todo.completed && "opacity-75"
                )}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={cn(
                    "w-8 h-8 border-4 border-black font-black text-sm transform hover:scale-110 transition-all",
                    todo.completed
                      ? "bg-green-400 text-black"
                      : "bg-white hover:bg-gray-100"
                  )}
                >
                  {todo.completed && "✓"}
                </button>
                <div className="flex-1">
                  <div className={cn(
                    "text-lg font-bold text-black",
                    todo.completed && "line-through"
                  )}>
                    {todo.text}
                  </div>
                </div>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  className="w-10 h-10 font-black bg-red-400 hover:bg-red-300 border-4 border-black transform hover:scale-110 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  ×
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-black text-white px-6 py-3 border-4 border-black transform -rotate-1 inline-block font-bold">
            STAY PRODUCTIVE! 💪
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;