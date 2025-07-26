import React, { useState } from "react";
import { X } from "lucide-react";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const assignees = ["Alice", "Bob", "Charlie", "David"];
const statuses = ["To Do", "In Progress", "Done"];

export default function CreateTaskModal({ open, onClose }: CreateTaskModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState(assignees[0]);
  const [status, setStatus] = useState(statuses[0]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Task Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Assignee</label>
              <select value={assignee} onChange={e => setAssignee(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2">
                {assignees.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-neutral-200 rounded-lg px-3 py-2">
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create Task</button>
        </div>
      </div>
    </div>
  );
} 