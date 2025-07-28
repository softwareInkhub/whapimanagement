import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface CreateTeamModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (team: { name: string; description: string; members: string[]; whatsappGroupId?: string; whatsappGroupName?: string }) => void;
}

const members = ["Alice", "Bob", "Charlie", "David", "Emma"];

export default function CreateTeamModal({ open, onClose, onCreate }: CreateTeamModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [whatsappGroups] = useState<Array<{ id: string; name: string }>>([
    { id: "1", name: "Development Team" },
    { id: "2", name: "Design Team" },
    { id: "3", name: "Marketing Team" }
  ]);
  const [selectedGroup, setSelectedGroup] = useState<{ id: string; name: string } | null>(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const toggleMember = (member: string) => {
    setSelectedMembers(prev => prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && onCreate) {
      onCreate({ 
        name, 
        description, 
        members: selectedMembers,
        whatsappGroupId: selectedGroup?.id,
        whatsappGroupName: selectedGroup?.name
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Create New Team</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Team Name</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              rows={3} 
            />
          </div>
          
          {/* WhatsApp Group Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp Group</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                className="w-full flex items-center justify-between border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className={selectedGroup ? "text-neutral-900" : "text-neutral-500"}>
                  {selectedGroup ? selectedGroup.name : "Select a WhatsApp group"}
                </span>
                <ChevronDown size={16} className="text-neutral-400" />
              </button>
              
              {showGroupDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {whatsappGroups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowGroupDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-100 text-sm"
                    >
                      {group.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Members</label>
            <div className="flex flex-wrap gap-2">
              {members.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMember(m)}
                  className={`px-3 py-1 rounded-lg border ${selectedMembers.includes(m) ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-neutral-100 border-neutral-200 text-neutral-700'} transition`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <button 
            type="submit" 
            disabled={!name} 
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
} 