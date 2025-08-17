import { Button } from './ui/Button'

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!text.trim()) return
    
    setIsSubmitting(true)
    
    try {
      await onAdd(text.trim())
      setText('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            disabled={isSubmitting}
            className="w-full px-4 py-3 text-lg font-bold bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_#000] focus:outline-none focus:shadow-[12px_12px_0px_0px_#000] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        <Button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="w-full py-3 text-lg font-black uppercase tracking-wider bg-yellow-400 hover:bg-yellow-300 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] active:shadow-[2px_2px_0px_0px_#000] active:translate-x-2 active:translate-y-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[6px_6px_0px_0px_#000] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
          Press Enter or click Add Task
        </p>
      </div>
    </div>
  )
}