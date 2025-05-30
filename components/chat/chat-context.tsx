"use client";

import React, { createContext, useContext, useState } from 'react';
import { getGeminiResponse } from '@/lib/gemini';

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, isUser: boolean) => Promise<void>;
  isLoading: boolean;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: async () => {},
  isLoading: false
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = async (content: string, isUser: boolean) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    if (isUser) {
      setIsLoading(true);
      try {
        const aiResponse = await getGeminiResponse(content);
        const responseMessage = {
          id: Date.now().toString(),
          content: aiResponse,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, responseMessage]);
      } catch (error) {
        console.error("Error getting AI response:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}