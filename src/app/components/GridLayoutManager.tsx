"use client";

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
  X,
  Plus,
  Layout,
  Monitor
} from 'lucide-react';

// Import actual sheet components
import DashboardPage from './DashboardPage';
import ProjectsPage from './ProjectsPage';
import TeamsPageSheet from './TeamsPageSheet';
import DepartmentsPage from './DepartmentsPage';
import SprintsPage from './SprintsPage';
import StoriesPage from './StoriesPage';
import CalendarPage from './CalendarPage';
import ReportsPage from './ReportsPage';
import SettingsPage from './SettingsPage';
import NotificationsPage from './NotificationsPage';
import CompaniesPage from './CompaniesPage';
import ProjectsAnalyticsPage from './ProjectsAnalyticsPage';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface GridSheet {
  id: string;
  type: string;
  title: string;
  component: React.ComponentType<Record<string, unknown>>;
  project?: Record<string, unknown>;
  context?: Record<string, unknown>;
  layout: {
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
  };
}

interface GridLayoutManagerProps {
  children?: React.ReactNode;
  onOpenTab?: (type: string, title?: string, context?: Record<string, unknown>) => void;
  draggedItem?: Record<string, unknown>;
  onDropItem?: (item: Record<string, unknown>) => void;
}

export default function GridLayoutManager({ onOpenTab, draggedItem, onDropItem }: GridLayoutManagerProps) {
  const [sheets, setSheets] = useState<GridSheet[]>([]);
  const [layouts, setLayouts] = useState<Record<string, unknown>>({});
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showControls] = useState(true);
  const [isGridMode, setIsGridMode] = useState(true);
  const [showSheetSelector, setShowSheetSelector] = useState(false);
  const [sheetZoomLevels, setSheetZoomLevels] = useState<Record<string, number>>({});

  // Available sheet types
  const availableSheets = [
    { type: 'dashboard', title: 'Dashboard', component: DashboardPage },
    { type: 'projects', title: 'Projects', component: ProjectsPage },
    { type: 'teams', title: 'Teams', component: TeamsPageSheet },
    { type: 'departments', title: 'Departments', component: DepartmentsPage },
    { type: 'sprints', title: 'Sprints', component: SprintsPage },
    { type: 'stories', title: 'Stories', component: StoriesPage },
    { type: 'calendar', title: 'Calendar', component: CalendarPage },
    { type: 'reports', title: 'Reports', component: ReportsPage },
    { type: 'settings', title: 'Settings', component: SettingsPage },
    { type: 'notifications', title: 'Notifications', component: NotificationsPage },
    { type: 'companies', title: 'Companies', component: CompaniesPage },
    { type: 'projects-analytics', title: 'Projects Analytics', component: ProjectsAnalyticsPage },
  ];

  // Handle drop from sidebar or tabs
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && onDropItem) {
      // Check if it's a tab drop (has component property)
      if ((draggedItem as Record<string, unknown>).component) {
        // This is a tab drop - use the component directly
        addSheet(
          (draggedItem as Record<string, unknown>).type as string, 
          (draggedItem as Record<string, unknown>).component as React.ComponentType<Record<string, unknown>>, 
          (draggedItem as Record<string, unknown>).context as Record<string, unknown>
        );
        onDropItem(draggedItem);
      } else {
        // This is a sidebar drop - find the component
        const sheetType = (draggedItem as Record<string, unknown>).type as string;
        const sheetInfo = availableSheets.find(sheet => sheet.type === sheetType);
        
        if (sheetInfo) {
          addSheet(sheetInfo.type, sheetInfo.component);
          onDropItem(draggedItem);
        }
      }
    }
  }, [draggedItem, onDropItem, availableSheets]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  // Default responsive breakpoints
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  // Initialize with default sheets
  useEffect(() => {
    const defaultSheets: GridSheet[] = [
      {
        id: 'dashboard',
        type: 'dashboard',
        title: 'Dashboard',
        component: DashboardPage,
        layout: { x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 }
      },
      {
        id: 'projects',
        type: 'projects',
        title: 'Projects',
        component: ProjectsPage,
        layout: { x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3 }
      },
      {
        id: 'teams',
        type: 'teams',
        title: 'Teams',
        component: TeamsPageSheet,
        layout: { x: 0, y: 4, w: 6, h: 4, minW: 4, minH: 3 }
      }
    ];

    setSheets(defaultSheets);
    
    // Initialize layouts for all breakpoints
    const initialLayouts = {
      lg: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout })),
      md: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 10) })),
      sm: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 6) })),
      xs: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 4) })),
      xxs: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 2) }))
    };
    setLayouts(initialLayouts);
  }, []);

  // Handle layout changes
  const handleLayoutChange = useCallback((layout: Record<string, unknown>, layouts: Record<string, unknown>) => {
    setLayouts(layouts);
  }, []);

  // Handle breakpoint changes
  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  // Add new sheet
  const addSheet = useCallback((type: string, component: React.ComponentType<Record<string, unknown>>, context?: Record<string, unknown>) => {
    const newSheet: GridSheet = {
      id: `${type}-${Date.now()}`,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      component,
      context,
      layout: { 
        x: 0, 
        y: Math.max(...sheets.map(s => s.layout.y + s.layout.h), 0), 
        w: 6, 
        h: 4, 
        minW: 4, 
        minH: 3 
      }
    };

    setSheets(prev => [...prev, newSheet]);
    
    // Update layouts
    const newLayout = { i: newSheet.id, ...newSheet.layout };
    setLayouts(prev => ({
      lg: [...(prev.lg || []), newLayout],
      md: [...(prev.md || []), { ...newLayout, w: Math.min(newLayout.w, 10) }],
      sm: [...(prev.sm || []), { ...newLayout, w: Math.min(newLayout.w, 6) }],
      xs: [...(prev.xs || []), { ...newLayout, w: Math.min(newLayout.w, 4) }],
      xxs: [...(prev.xxs || []), { ...newLayout, w: Math.min(newLayout.w, 2) }]
    }));
  }, [sheets]);

  // Remove sheet
  const removeSheet = useCallback((sheetId: string) => {
    setSheets(prev => prev.filter(sheet => sheet.id !== sheetId));
    setLayouts(prev => ({
      lg: prev.lg?.filter((item: any) => item.i !== sheetId) || [],
      md: prev.md?.filter((item: any) => item.i !== sheetId) || [],
      sm: prev.sm?.filter((item: any) => item.i !== sheetId) || [],
      xs: prev.xs?.filter((item: any) => item.i !== sheetId) || [],
      xxs: prev.xxs?.filter((item: any) => item.i !== sheetId) || []
    }));
    // Remove zoom level when sheet is removed
    setSheetZoomLevels(prev => {
      const newLevels = { ...prev };
      delete newLevels[sheetId];
      return newLevels;
    });
  }, []);

  // Zoom functions
  const zoomIn = useCallback((sheetId: string) => {
    setSheetZoomLevels(prev => ({
      ...prev,
      [sheetId]: Math.min((prev[sheetId] || 1) + 0.1, 2)
    }));
  }, []);

  const zoomOut = useCallback((sheetId: string) => {
    setSheetZoomLevels(prev => ({
      ...prev,
      [sheetId]: Math.max((prev[sheetId] || 1) - 0.1, 0.5)
    }));
  }, []);

  const resetZoom = useCallback((sheetId: string) => {
    setSheetZoomLevels(prev => ({
      ...prev,
      [sheetId]: 1
    }));
  }, []);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const activeElement = document.activeElement;
        const sheetId = activeElement?.closest('[data-sheet-id]')?.getAttribute('data-sheet-id');
        
        if (sheetId) {
          switch (e.key) {
            case '=':
            case '+':
              e.preventDefault();
              zoomIn(sheetId);
              break;
            case '-':
              e.preventDefault();
              zoomOut(sheetId);
              break;
            case '0':
              e.preventDefault();
              resetZoom(sheetId);
              break;
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetZoom]);

  // Save layout to localStorage
  const handleSaveLayout = useCallback(() => {
    try {
      const layoutData = {
        sheets,
        layouts,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('grid-layout-manager', JSON.stringify(layoutData));
    } catch (error) {
      console.error('Failed to save layout:', error);
    }
  }, [sheets, layouts]);

  // Load layout from localStorage
  const handleLoadLayout = useCallback(() => {
    try {
      const savedLayout = localStorage.getItem('grid-layout-manager');
      if (savedLayout) {
        const layoutData = JSON.parse(savedLayout);
        setSheets(layoutData.sheets);
        setLayouts(layoutData.layouts);
      }
    } catch (error) {
      console.error('Failed to load layout:', error);
    }
  }, []);

  // Reset to default layout
  const handleResetLayout = useCallback(() => {
    const defaultSheets: GridSheet[] = [
      {
        id: 'dashboard',
        type: 'dashboard',
        title: 'Dashboard',
        component: DashboardPage,
        layout: { x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 }
      },
      {
        id: 'projects',
        type: 'projects',
        title: 'Projects',
        component: ProjectsPage,
        layout: { x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3 }
      },
      {
        id: 'teams',
        type: 'teams',
        title: 'Teams',
        component: TeamsPageSheet,
        layout: { x: 0, y: 4, w: 6, h: 4, minW: 4, minH: 3 }
      }
    ];

    setSheets(defaultSheets);
    
    const resetLayouts = {
      lg: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout })),
      md: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 10) })),
      sm: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 6) })),
      xs: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 4) })),
      xxs: defaultSheets.map(sheet => ({ i: sheet.id, ...sheet.layout, w: Math.min(sheet.layout.w, 2) }))
    };
    setLayouts(resetLayouts);
  }, []);

  // Export layout as JSON
  const handleExportLayout = useCallback(() => {
    const layoutData = {
      sheets,
      layouts,
      timestamp: new Date().toISOString()
    };
    const dataStr = JSON.stringify(layoutData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grid-layout-manager.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [sheets, layouts]);

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
            setSheets(layoutData.sheets);
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

  const renderSheetContent = (sheet: GridSheet) => {
    const SheetComponent = sheet.component;
    const zoomLevel = sheetZoomLevels[sheet.id] || 1;
    
    return (
      <div 
        className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden" 
        data-sheet-id={sheet.id}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Sheet Header */}
        <div 
          className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900">{sheet.title}</h3>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              {currentBreakpoint.toUpperCase()}
            </span>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Zoom Controls */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                zoomOut(sheet.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
              title="Zoom Out"
            >
              <Minimize2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                resetZoom(sheet.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 text-gray-400 hover:text-gray-600 rounded text-xs"
              title="Reset Zoom"
            >
              100%
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                zoomIn(sheet.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
              title="Zoom In"
            >
              <Maximize2 size={14} />
            </button>
            
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenTab && onOpenTab(sheet.type, sheet.title, sheet.context);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
              title="Open in full tab"
            >
              <Maximize2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeSheet(sheet.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 text-red-400 hover:text-red-600 rounded"
              title="Remove sheet"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        
        {/* Sheet Content */}
        <div 
          className="h-full overflow-auto relative sheet-content"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="h-full w-full"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <SheetComponent
              open={true}
              onClose={() => removeSheet(sheet.id)}
              onOpenTab={onOpenTab}
              project={sheet.project}
              context={sheet.context}
            />
          </div>
        </div>
      </div>
    );
  };

  if (!isGridMode) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Layout size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Grid Layout Mode</h3>
          <p className="text-gray-600 mb-4">Switch to grid mode to arrange multiple sheets</p>
          <button
            onClick={() => setIsGridMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enable Grid Layout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
            {/* Grid Controls */}
      {showControls && (
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Grid3X3 size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Grid Layout Manager</h2>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              {sheets.length} Sheets
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

            {/* Add Sheet */}
            <button
              onClick={() => setShowSheetSelector(!showSheetSelector)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Add Sheet"
            >
              <Plus size={16} />
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

            {/* Toggle Grid Mode */}
            <button
              onClick={() => setIsGridMode(false)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Exit Grid Mode"
            >
              <Monitor size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Sheet Selector */}
      {showSheetSelector && (
        <div className="absolute top-16 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Add Sheet</h3>
            <button
              onClick={() => setShowSheetSelector(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {availableSheets.map((sheet) => (
              <button
                key={sheet.type}
                onClick={() => {
                  addSheet(sheet.type, sheet.title, sheet.component);
                  setShowSheetSelector(false);
                }}
                className="flex items-center gap-3 p-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{sheet.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid Container */}
      <div 
        className={`grid-container ${isFullscreen ? 'h-full' : 'h-full'} ${
          draggedItem ? 'border-2 border-dashed border-blue-400 bg-blue-50' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
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
          isDraggable={true}
          isResizable={true}
          isBounded={true}
          preventCollision={false}
          compactType="vertical"
          useCSSTransforms={true}
          transformScale={1}
          droppingItem={{ i: '__dropping-elem__', h: 1, w: 1 }}
        >
          {sheets.map(sheet => (
            <div key={sheet.id} className="h-full">
              {renderSheetContent(sheet)}
            </div>
          ))}
        </ResponsiveReactGridLayout>
        
        {/* Drop Zone Indicator */}
        {draggedItem && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-8 text-center">
              <div className="text-blue-600 font-medium mb-2">Drop to add sheet</div>
              <div className="text-blue-500 text-sm">{draggedItem.label}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 