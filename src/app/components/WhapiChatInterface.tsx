"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Image, 
  Paperclip,
  Smile,
  Mic,
  ChevronDown,
  Users,
  Building2,
  User,
  Check,
  CheckCheck,
  Clock,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share,
  Reply,
  Forward,
  Star,
  Archive,
  Trash2,
  Edit,
  Copy,
  Download,
  Filter,
  Calendar,
  Clock as ClockIcon,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

interface Entity {
  id: string;
  name: string;
  type: 'group' | 'community' | 'user';
  avatar?: string;
  description?: string;
  memberCount?: number;
}

interface SelectedEntities {
  groups: Entity[];
  communities: Entity[];
  users: Entity[];
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  isOpponent: boolean;
  reactions?: { emoji: string; count: number }[];
  isEdited?: boolean;
  replyTo?: { id: string; text: string; sender: string };
  attachments?: { type: 'image' | 'document' | 'audio'; url: string; name: string }[];
}

interface WhapiChatInterfaceProps {
  selectedEntities: SelectedEntities;
  onSendMessage: (message: string, selected: SelectedEntities) => void;
}

export default function WhapiChatInterface({ selectedEntities, onSendMessage }: WhapiChatInterfaceProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<Entity | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Mock messages for demonstration
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        text: "Welcome to Whapi Management! How can I help you today?",
        sender: 'them',
        timestamp: "10:30 AM",
        status: 'read',
        isOpponent: true,
        reactions: [{ emoji: "👍", count: 2 }]
      },
      {
        id: "2",
        text: "I need to send a message to the development team",
        sender: 'me',
        timestamp: "10:32 AM",
        status: 'read',
        isOpponent: false,
        replyTo: { id: "1", text: "Welcome to Whapi Management!", sender: "them" }
      },
      {
        id: "3",
        text: "Perfect! I can help you send messages to selected groups, communities, or users.",
        sender: 'them',
        timestamp: "10:33 AM",
        status: 'read',
        isOpponent: true
      },
      {
        id: "4",
        text: "Here's the project update document",
        sender: 'me',
        timestamp: "10:35 AM",
        status: 'delivered',
        isOpponent: false,
        attachments: [{ type: 'document', url: '#', name: 'project-update.pdf' }]
      },
      {
        id: "5",
        text: "Thanks! I'll review it and get back to you.",
        sender: 'them',
        timestamp: "10:36 AM",
        status: 'read',
        isOpponent: true,
        reactions: [{ emoji: "❤️", count: 1 }, { emoji: "👍", count: 1 }]
      }
    ];
    setMessages(mockMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        isOpponent: false
      };

      setMessages(prev => [...prev, newMessage]);
      setMessageText("");

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Message sent successfully!",
          sender: 'them',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          isOpponent: true
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTotalSelected = () => {
    return selectedEntities.groups.length + 
           selectedEntities.communities.length + 
           selectedEntities.users.length;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'read': return <CheckCheck className="w-4 h-4 text-blue-500" />;
      case 'delivered': return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'sent': return <Check className="w-4 h-4 text-gray-400" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleMessageReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions?.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      setTimeout(() => {
        setIsRecording(false);
        clearInterval(interval);
        setRecordingTime(0);
      }, 10000); // 10 second limit
    }
  };

  const filteredMessages = searchQuery 
    ? messages.filter(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Whapi Management</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  {getTotalSelected() > 0 
                    ? `${getTotalSelected()} recipients selected` 
                    : "Select recipients to start messaging"
                  }
                </p>
                {isTyping && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>typing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOpponent ? 'justify-start' : 'justify-end'}`}
            >
              <div className="relative group">
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOpponent
                      ? 'bg-white text-gray-900'
                      : 'bg-green-500 text-white'
                  } shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => setSelectedMessage(message)}
                >
                  {/* Reply Message */}
                  {message.replyTo && (
                    <div className={`mb-2 p-2 rounded text-xs ${
                      message.isOpponent ? 'bg-gray-100' : 'bg-green-400'
                    }`}>
                      <div className="font-medium">{message.replyTo.sender}</div>
                      <div className="truncate">{message.replyTo.text}</div>
                    </div>
                  )}
                  
                  <p className="text-sm">{message.text}</p>
                  
                  {/* Attachments */}
                  {message.attachments && (
                    <div className="mt-2">
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-xs">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={`flex items-center gap-1 mt-1 ${
                    message.isOpponent ? 'justify-start' : 'justify-end'
                  }`}>
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                    {!message.isOpponent && getStatusIcon(message.status)}
                    {message.isEdited && <span className="text-xs opacity-70">(edited)</span>}
                  </div>
                  
                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {message.reactions.map((reaction, index) => (
                        <button
                          key={index}
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                          onClick={() => handleMessageReaction(message.id, reaction.emoji)}
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Message Actions Menu */}
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-1">
                    <button className="p-1 hover:bg-gray-100 rounded text-xs">Reply</button>
                    <button className="p-1 hover:bg-gray-100 rounded text-xs">Forward</button>
                    <button className="p-1 hover:bg-gray-100 rounded text-xs">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Selected Recipients Display */}
      {getTotalSelected() > 0 && (
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sending to:</span>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {getTotalSelected()} recipients
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-blue-600 hover:text-blue-800">Schedule</button>
              <button className="text-xs text-blue-600 hover:text-blue-800">Template</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedEntities.groups.map((group) => (
              <div key={group.id} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                <Users className="w-3 h-3" />
                <span>{group.name}</span>
                <span className="text-blue-500">({group.memberCount || 0})</span>
              </div>
            ))}
            {selectedEntities.communities.map((community) => (
              <div key={community.id} className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                <Building2 className="w-3 h-3" />
                <span>{community.name}</span>
                <span className="text-purple-500">({community.memberCount || 0})</span>
              </div>
            ))}
            {selectedEntities.users.map((user) => (
              <div key={user.id} className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                <User className="w-3 h-3" />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Image className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button 
              onClick={handleVoiceRecord}
              className={`p-2 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isRecording ? <Pause className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-2 flex items-center gap-2 text-red-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Recording... {recordingTime}s</span>
          </div>
        )}
      </div>

      {/* Enhanced Attachment Menu */}
      {showAttachmentMenu && (
        <div className="absolute bottom-20 left-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-4 gap-4">
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Image className="w-6 h-6 mx-auto text-blue-500 mb-1" />
              <span className="text-xs text-gray-600">Photo</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Paperclip className="w-6 h-6 mx-auto text-green-500 mb-1" />
              <span className="text-xs text-gray-600">Document</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Users className="w-6 h-6 mx-auto text-purple-500 mb-1" />
              <span className="text-xs text-gray-600">Contact</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Building2 className="w-6 h-6 mx-auto text-orange-500 mb-1" />
              <span className="text-xs text-gray-600">Location</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Calendar className="w-6 h-6 mx-auto text-indigo-500 mb-1" />
              <span className="text-xs text-gray-600">Event</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Star className="w-6 h-6 mx-auto text-yellow-500 mb-1" />
              <span className="text-xs text-gray-600">Poll</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Play className="w-6 h-6 mx-auto text-red-500 mb-1" />
              <span className="text-xs text-gray-600">Video</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg text-center transition-colors">
              <Volume2 className="w-6 h-6 mx-auto text-pink-500 mb-1" />
              <span className="text-xs text-gray-600">Audio</span>
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-8 gap-2">
            {['😀', '😂', '❤️', '👍', '🎉', '🔥', '💯', '✨', '😍', '🤔', '😢', '😡', '👏', '🙏', '💪', '🎯'].map((emoji, index) => (
              <button
                key={index}
                onClick={() => {
                  setMessageText(prev => prev + emoji);
                  setShowEmojiPicker(false);
                }}
                className="p-2 hover:bg-gray-100 rounded text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 