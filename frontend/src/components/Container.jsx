
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import Form from "./Form";

function Container({
  title,
  description,
  tag,
  color,
  onDelete,
  onEdit,
  draggableId,
  columnIndex,
  index,
}) {
  const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } = useDraggable({
  id: draggableId,
  data: { columnIndex, index }
});




  const [showEditForm, setShowEditForm] = useState(false);

  const handleSave = updatedData => {
    onEdit(updatedData);
    setShowEditForm(false);
  };

  return (
    <div
      className={`w-full  h-auto p-4 rounded-[6px] mt-2 transition-opacity duration-200 ${isDragging ? "opacity-50" : ""}`}
      style={{backgroundColor:color}}
      // style={{
      //   backgroundColor: color,
      //   userSelect: 'none',     
      //   WebkitUserSelect: 'none',
      //   touchAction: 'none',     
      //   cursor: isDragging ? 'grabbing' : 'grab',
      //   opacity: isDragging ? 0.5 : 1,
      // }}
      ref={setNodeRef} {...listeners} {...attributes} 
      
    >
      <div className="flex justify-between items-center"  style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}>
        <p className="text-[16px] font-semibold font-sf-text leading-[30px] text-white">{title}</p>
        <div className="flex items-center gap-2">
          <img src="/trash.svg" alt="Delete" onClick={onDelete} className="w-4 h-4 cursor-pointer pointer-events-auto" />
          <img src="/edit-2.svg" alt="Edit" onClick={onEdit} className="w-4 h-4 cursor-pointer pointer-events-auto" />
        </div>
      </div>
      <p className="text-white text-[14px] font-light font-sf-text">{description}</p>
      {tag && (
        <div className="inline-block text-[14px] font-light px-1.5 py-0.5 rounded border mt-4">
          <p className="text-white font-sf-text">{tag}</p>
        </div>
      )}
      {showEditForm && (
        <Form
          initialData={{ title, description, tag, color }}
          onSubmit={handleSave}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}

export default Container;


