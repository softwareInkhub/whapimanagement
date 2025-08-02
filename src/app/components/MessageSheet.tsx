"use client";

import React, { useState } from 'react';
import { X, Send, Paperclip, Smile, User, MessageSquare, Building2 } from 'lucide-react';

interface MessageSheetProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    type: 'group' | 'community' | 'user';
    memberCount?: number;
  };
}

export default function MessageSheet({ isOpen, onClose, recipient }: MessageSheetProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSending(false);
    setMessage('');
    onClose();
  };

  const handleClose = () => {
    setMessage('');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Message Preview */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            recipient.type === 'group' ? 'bg-blue-100' :
            recipient.type === 'community' ? 'bg-purple-100' : 'bg-green-100'
          }`}>
            {recipient.type === 'group' ? <MessageSquare className="w-4 h-4 text-blue-600" /> :
             recipient.type === 'community' ? <Building2 className="w-4 h-4 text-purple-600" /> :
             <User className="w-4 h-4 text-green-600" />}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
            <p className="text-xs text-gray-500">
              {recipient.type === 'group' ? `${recipient.memberCount} members` :
               recipient.type === 'community' ? `${recipient.memberCount} members` :
               'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Type your message to ${recipient.name}...`}
            className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-900 placeholder-gray-500"
            rows={8}
          />
        </div>

        {/* Message Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!message.trim() || isSending}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                message.trim() && !isSending
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 