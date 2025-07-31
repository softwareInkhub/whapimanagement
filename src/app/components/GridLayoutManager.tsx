"use client";

import React, { useState, useCallback, useRef } from "react";
import { X, Maximize2, Minimize2, GripVertical } from "lucide-react";

interface GridItem {
  id: string;
  title: string;
  component: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface GridLayoutManagerProps {
  items: GridItem[];
  onItemClose?: (id: string) => void;
  onItemMinimize?: (id: string) => void;
  onItemMaximize?: (id: string) => void;
  onItemMove?: (id: string, x: number, y: number) => void;
  onItemResize?: (id: string, width: number, height: number) => void;
}

export default function GridLayoutManager({
  items,
  onItemClose,
  onItemMinimize,
  onItemMaximize,
  onItemMove,
  onItemResize
}: GridLayoutManagerProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizingItem, setResizingItem] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDraggedItem(id);
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const item = items.find(item => item.id === id);
    if (item) {
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: item.width,
        height: item.height
      });
      setResizingItem(id);
    }
  }, [items]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggedItem && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;
      
      onItemMove?.(draggedItem, Math.max(0, newX), Math.max(0, newY));
    }

    if (resizingItem) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(300, resizeStart.width + deltaX);
      const newHeight = Math.max(200, resizeStart.height + deltaY);
      
      onItemResize?.(resizingItem, newWidth, newHeight);
    }
  }, [draggedItem, dragOffset, onItemMove, resizingItem, resizeStart, onItemResize]);

  const handleMouseUp = useCallback(() => {
    setDraggedItem(null);
    setResizingItem(null);
  }, []);

  React.useEffect(() => {
    if (draggedItem) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedItem, handleMouseMove, handleMouseUp]);

  const handleClose = useCallback((id: string) => {
    onItemClose?.(id);
  }, [onItemClose]);

  const handleMinimize = useCallback((id: string) => {
    onItemMinimize?.(id);
  }, [onItemMinimize]);

  const handleMaximize = useCallback((id: string) => {
    onItemMaximize?.(id);
  }, [onItemMaximize]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gray-100 overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute bg-white rounded-lg shadow-lg border border-gray-200"
          style={{
            left: item.x,
            top: item.y,
            width: item.isMinimized ? 300 : item.width,
            height: item.isMinimized ? 40 : item.height,
            zIndex: item.zIndex,
            display: item.isMinimized ? 'none' : 'block',
            cursor: draggedItem === item.id ? 'grabbing' : 'default'
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg cursor-move"
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            style={{ cursor: 'grab' }}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900">{item.title}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleMinimize(item.id)}
                className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                title="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMaximize(item.id)}
                className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                title="Maximize"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleClose(item.id)}
                className="p-1 hover:bg-red-100 rounded text-gray-500 hover:text-red-600"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 h-full overflow-auto relative">
            {item.component}
            
            {/* Resize Handle */}
            <div
              className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize opacity-50 hover:opacity-100"
              onMouseDown={(e) => handleResizeStart(e, item.id)}
            >
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-gray-400 absolute bottom-0 right-0"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 