import React, { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";

export default function CreateTaskPage({ onClose }: { onClose?: () => void }) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onClose?.();
  };

  const handleCreate = (task: any) => {
    console.log("Creating task:", task);
    // Here you would typically save the task to your state or API
    handleClose();
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex items-center justify-center">
      <CreateTaskModal
        open={showModal}
        onClose={handleClose}
        context={{ company: "Whapi Project Management" }}
      />
    </div>
  );
} 