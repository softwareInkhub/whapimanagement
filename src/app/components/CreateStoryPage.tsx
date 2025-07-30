import React, { useState } from "react";
import CreateStoryModal from "./CreateStoryModal";

export default function CreateStoryPage({ onClose }: { onClose?: () => void }) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onClose?.();
  };

  const handleCreate = (story: {
    title: string;
    description: string;
    project: string;
    sprint: string;
    status: string;
    priority: string;
    storyPoints: string;
    assignee: string;
    startDate: string;
    dueDate: string;
    acceptanceCriteria: string[];
    teamMembers: string[];
  }) => {
    console.log("Creating story:", story);
    // Here you would typically save the story to your state or API
    handleClose();
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex items-center justify-center">
      <CreateStoryModal
        open={showModal}
        onClose={handleClose}
        onCreate={handleCreate}
      />
    </div>
  );
} 