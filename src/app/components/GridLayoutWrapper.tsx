'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { 
  Grid3X3, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Settings,
  Save,
  Download,
  Upload,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

interface GridLayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
  onLayoutChange?: (layout: any, layouts: any) => void;
  onSaveLayout?: (layouts: any) => void;
  onLoadLayout?: () => any;
  defaultLayout?: GridItem[];
  className?: string;
  showControls?: boolean;
  isEditable?: boolean;
  compact?: boolean;
  storageKey?: string;
}

export default function GridLayoutWrapper({
  children,
  title = "Grid Layout",
  onLayoutChange,
  onSaveLayout,
  onLoadLayout,
  defaultLayout = [],
  className = "",
  showControls = true,
  isEditable = true,
  compact = false,
  storageKey
}: GridLayoutWrapperProps) {
  const [layouts, setLayouts] = useState<any>({});
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGridControls, setShowGridControls] = useState(false);

  // Default responsive breakpoints
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  // Use storageKey or generate one based on title
  const storageKeyFinal = storageKey || `grid-layout-${title}`;

  // Initialize layouts
  useEffect(() => {
    if (defaultLayout.length > 0) {
      const initialLayouts = {
        lg: defaultLayout,
        md: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 10) })),
        sm: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 6) })),
        xs: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 4) })),
        xxs: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 2) }))
      };
      setLayouts(initialLayouts);
    }
  }, [defaultLayout]);

  // Handle layout changes
  const handleLayoutChange = useCallback((layout: any, layouts: any) => {
    setLayouts(layouts);
    onLayoutChange?.(layout, layouts);
  }, [onLayoutChange]);

  // Handle breakpoint changes
  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  // Save layout to localStorage
  const handleSaveLayout = useCallback(() => {
    try {
      const layoutData = {
        layouts,
        timestamp: new Date().toISOString(),
        title
      };
      localStorage.setItem(storageKeyFinal, JSON.stringify(layoutData));
      onSaveLayout?.(layouts);
    } catch (error) {
      console.error('Failed to save layout:', error);
    }
  }, [layouts, title, storageKeyFinal, onSaveLayout]);

  // Load layout from localStorage
  const handleLoadLayout = useCallback(() => {
    try {
      const savedLayout = localStorage.getItem(storageKeyFinal);
      if (savedLayout) {
        const layoutData = JSON.parse(savedLayout);
        setLayouts(layoutData.layouts);
        onLoadLayout?.();
      }
    } catch (error) {
      console.error('Failed to load layout:', error);
    }
  }, [storageKeyFinal, onLoadLayout]);

  // Reset to default layout
  const handleResetLayout = useCallback(() => {
    if (defaultLayout.length > 0) {
      const resetLayouts = {
        lg: defaultLayout,
        md: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 10) })),
        sm: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 6) })),
        xs: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 4) })),
        xxs: defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 2) }))
      };
      setLayouts(resetLayouts);
    }
  }, [defaultLayout]);

  // Export layout as JSON
  const handleExportLayout = useCallback(() => {
    const layoutData = {
      layouts,
      timestamp: new Date().toISOString(),
      title
    };
    const dataStr = JSON.stringify(layoutData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}-layout.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [layouts, title]);

  // Import layout from JSON
  const handleImportLayout = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const layoutData = JSON.parse(e.target?.result as string);
            setLayouts(layoutData.layouts);
          } catch (error) {
            console.error('Failed to import layout:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, []);

  if (compact) {
    return (
      <div className={`grid-layout-wrapper-compact ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
        {/* Compact Controls */}
        <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGridControls(!showGridControls)}
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Grid Controls"
            >
              <Grid3X3 size={16} />
            </button>
            {showGridControls && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Toggle Grid"
                >
                  {showGrid ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={handleSaveLayout}
                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Save Layout"
                >
                  <Save size={14} />
                </button>
                <button
                  onClick={handleLoadLayout}
                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Load Layout"
                >
                  <Upload size={14} />
                </button>
                <button
                  onClick={handleResetLayout}
                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Reset Layout"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
            {currentBreakpoint.toUpperCase()}
          </span>
        </div>

        {/* Grid Container */}
        <div className={`grid-container ${isFullscreen ? 'h-full' : 'min-h-[400px]'}`}>
          <ResponsiveReactGridLayout
            className={`layout ${showGrid ? 'show-grid' : ''}`}
            layouts={layouts}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={30}
            margin={[10, 10]}
            containerPadding={[10, 10]}
            onLayoutChange={handleLayoutChange}
            onBreakpointChange={handleBreakpointChange}
            isDraggable={isEditable}
            isResizable={isEditable}
            isBounded={true}
            preventCollision={false}
            compactType="vertical"
            useCSSTransforms={true}
            transformScale={1}
            droppingItem={{ i: '__dropping-elem__', h: 1, w: 1 }}
          >
            {children}
          </ResponsiveReactGridLayout>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`grid-layout-wrapper ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Header with Controls */}
      {showControls && (
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Grid3X3 size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              {currentBreakpoint.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle Grid"
            >
              {showGrid ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>

            {/* Save Layout */}
            <button
              onClick={handleSaveLayout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Save Layout"
            >
              <Save size={16} />
            </button>

            {/* Load Layout */}
            <button
              onClick={handleLoadLayout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Load Layout"
            >
              <Upload size={16} />
            </button>

            {/* Export Layout */}
            <button
              onClick={handleExportLayout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export Layout"
            >
              <Download size={16} />
            </button>

            {/* Import Layout */}
            <button
              onClick={handleImportLayout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Import Layout"
            >
              <Settings size={16} />
            </button>

            {/* Reset Layout */}
            <button
              onClick={handleResetLayout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset Layout"
            >
              <RotateCcw size={16} />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* Grid Container */}
      <div className={`grid-container ${isFullscreen ? 'h-full' : 'min-h-[600px]'}`}>
        <ResponsiveReactGridLayout
          className={`layout ${showGrid ? 'show-grid' : ''}`}
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={30}
          margin={[10, 10]}
          containerPadding={[10, 10]}
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={handleBreakpointChange}
          isDraggable={isEditable}
          isResizable={isEditable}
          isBounded={true}
          preventCollision={false}
          compactType="vertical"
          useCSSTransforms={true}
          transformScale={1}
          droppingItem={{ i: '__dropping-elem__', h: 1, w: 1 }}
        >
          {children}
        </ResponsiveReactGridLayout>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
} 