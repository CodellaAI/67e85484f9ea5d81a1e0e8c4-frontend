
import { MessageSquare } from 'lucide-react'

export default function MessageList({ messages, isLoading }) {
  if (isLoading && messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="animate-pulse flex space-x-4 w-full max-w-md">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
        <p>No messages yet. Be the first to send one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div 
          key={message._id} 
          className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <p className="text-gray-800">{message.content}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
