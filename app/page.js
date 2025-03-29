
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MessageCircle, Send, Loader2, RefreshCw } from 'lucide-react'
import MessageList from '@/components/MessageList'
import MessageForm from '@/components/MessageForm'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`)
      setMessages(response.data)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to load messages. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (message) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, { content: message })
      setMessages(prev => [...prev, response.data])
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Simple Fullstack Demo</h1>
        <p className="text-gray-600">A minimalist application with NextJS and Express</p>
      </header>

      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-primary-500" />
            Messages
          </h2>
          <button 
            onClick={fetchMessages}
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1" />
            )}
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      <MessageForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-primary-600 hover:text-primary-800 text-sm"
        >
          About this demo
        </button>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    About Simple Fullstack Demo
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This is a minimalist fullstack application built with NextJS for the frontend and Express/MongoDB for the backend. It demonstrates a simple messaging system with real-time updates.
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Technologies used:</span>
                    </p>
                    <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                      <li>NextJS with App Router</li>
                      <li>TailwindCSS for styling</li>
                      <li>HeadlessUI for components</li>
                      <li>Lucide React for icons</li>
                      <li>Express for the backend API</li>
                      <li>MongoDB with Mongoose for data storage</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn-primary w-full"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
