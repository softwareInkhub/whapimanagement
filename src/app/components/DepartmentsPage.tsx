import { X, Users, Briefcase } from "lucide-react";

export default function DepartmentsPage({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="w-full">
      {/* Tab Bar */}
      <div className="flex items-center gap-2 px-6 pt-4 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-blue-50 text-blue-700 font-semibold">
          <Briefcase className="text-blue-500 mr-1" size={20} />
          <span>Departments</span>
        </div>
        <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close">
          <X size={18} />
        </button>
      </div>
      {/* Content */}
      <div className="p-8 bg-white">
        <h2 className="text-xl font-bold mb-4">Departments</h2>
        <p className="text-neutral-700 mb-2">Manage your company departments here. Add, edit, and organize departments.</p>
        {/* Placeholder for department list/table */}
        <div className="mt-4 p-4 bg-neutral-50 rounded border border-neutral-200 text-neutral-500">No departments yet.</div>
      </div>
    </div>
  );
} 