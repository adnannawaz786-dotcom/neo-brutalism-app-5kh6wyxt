import { Button } from './ui/Button'
import { cn } from '../lib/utils'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    }
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={cn(
      "bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 mb-4 transition-all duration-200 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]",
      todo.completed && "bg-gray-100 opacity-75"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 mr-4">
          <button
            onClick={() => onToggle(todo.id)}
            className={cn(
              "w-6 h-6 border-3 border-black mr-4 flex items-center justify-center font-black text-lg transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
              todo.completed 
                ? "bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            )}
          >
            {todo.completed && "✓"}
          </button>
          
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="flex-1 bg-white border-2 border-black px-3 py-2 text-lg font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all duration-200"
              autoFocus
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              className={cn(
                "flex-1 text-lg font-bold cursor-pointer hover:bg-yellow-200 px-2 py-1 transition-colors duration-200",
                todo.completed && "line-through text-gray-500"
              )}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-400 hover:bg-green-500 text-black font-black px-3 py-1 text-sm"
              >
                SAVE
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-red-400 hover:bg-red-500 text-black font-black px-3 py-1 text-sm"
              >
                CANCEL
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-400 hover:bg-blue-500 text-black font-black px-3 py-1 text-sm"
              >
                EDIT
              </Button>
              <Button
                onClick={() => onDelete(todo.id)}
                className="bg-red-400 hover:bg-red-500 text-black font-black px-3 py-1 text-sm"
              >
                DELETE
              </Button>
            </>
          )}
        </div>
      </div>
      
      {todo.createdAt && (
        <div className="mt-2 text-xs font-bold text-gray-600 border-t-2 border-black pt-2">
          CREATED: {new Date(todo.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}