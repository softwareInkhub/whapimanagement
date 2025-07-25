"use client";
import { FolderKanban, Plus, Building, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const namespaces = [
  "FSHIP",
  "Google Sheet",
  "ewrere",
  "Google Cloud Search",
  "pinterest",
  "Gmail",
  "Google Calender",
  "Easebuzz API",
  "Google Docs Api",
  "BRHM Project Management",
  "fintech",
  "Shopify Products",
  "shopify",
  "youtube",
  "Test AI Namespace",
  "Inkhub",
  "brmh",
  "Razorpay",
];

// Companies tab index (after Teams, before Calendar)
const COMPANIES_TAB_INDEX = 4;

export default function ContextSidebar({ activeTab = 0, onAddProject, onAddDepartments, onAddTeams, onAddSprints, onOpenCompany }: {
  activeTab?: number,
  onAddProject?: () => void,
  onAddDepartments?: () => void,
  onAddTeams?: () => void,
  onAddSprints?: () => void,
  onOpenCompany?: () => void,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside className="sticky top-0 h-screen w-[260px] bg-white border-r border-neutral-200 flex flex-col overflow-y-auto z-20">
      {activeTab === COMPANIES_TAB_INDEX ? (
        <>
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Companies</h2>
            <button className="p-1 rounded hover:bg-blue-100 text-blue-600" aria-label="Add Company">
              <Plus size={20} />
            </button>
          </div>
          <nav className="flex-1 px-2 pb-4 space-y-1 overflow-y-auto">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-blue-600 bg-blue-50 relative group"
              onClick={() => { if (onOpenCompany) onOpenCompany(); }}>
              <Building size={18} className="text-blue-400" />
              <span className="text-sm font-medium truncate flex-1">whapi project management</span>
              <button
                className="ml-2 p-1 rounded hover:bg-blue-100 text-blue-600 flex items-center"
                onClick={e => { e.stopPropagation(); setDropdownOpen(v => !v); }}
                aria-label={dropdownOpen ? "Hide company actions" : "Show company actions"}
              >
                {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute left-0 top-full w-full bg-white border border-neutral-200 rounded shadow-lg z-50 p-2 flex flex-col gap-1">
                  <button className="text-left px-3 py-2 rounded hover:bg-blue-50 text-sm" onClick={() => { setDropdownOpen(false); onAddProject && onAddProject(); }}>Add Project</button>
                  <button className="text-left px-3 py-2 rounded hover:bg-blue-50 text-sm" onClick={() => { setDropdownOpen(false); onAddDepartments && onAddDepartments(); }}>Departments</button>
                  <button className="text-left px-3 py-2 rounded hover:bg-blue-50 text-sm" onClick={() => { setDropdownOpen(false); onAddTeams && onAddTeams(); }}>Teams</button>
                  <button className="text-left px-3 py-2 rounded hover:bg-blue-50 text-sm" onClick={() => { setDropdownOpen(false); onAddSprints && onAddSprints(); }}>Sprints</button>
                </div>
              )}
            </div>
          </nav>
        </>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Namespaces</h2>
            <button className="p-1 rounded hover:bg-blue-100 text-blue-600" aria-label="Add Namespace">
              <Plus size={20} />
            </button>
          </div>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded bg-neutral-100 border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <nav className="flex-1 px-2 pb-4 space-y-1 overflow-y-auto">
            {namespaces.map((ns, idx) => (
              <div
                key={ns}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-blue-50 hover:text-blue-600 ${idx === 0 ? "bg-blue-50 text-blue-600" : ""}`}
              >
                <FolderKanban size={18} className="text-blue-400" />
                <span className="text-sm font-medium truncate">{ns}</span>
              </div>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
} 