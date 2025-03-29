
import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

export default function MessageForm({ onSubmit, isLoading }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSubmit(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          New Message
        </label>
        <textarea
          id="message"
          rows="3"
          className="input-field"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary flex items-center"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  )
}
