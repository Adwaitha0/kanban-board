
// import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Form from "./Form";

// function Container({
//   title,
//   description,
//   tag,
//   color,
//   onDelete,
//   onEdit,
//   draggableId,
//   columnIndex,
//   index,
// }) {
//   const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } = useDraggable({
//   id: draggableId,
//   data: { columnIndex, index }
// });
function Container({ card, onDelete, onEdit }) {
const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id, 
  });
const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: card.color,
  };


  const [showEditForm, setShowEditForm] = useState(false);

  const handleSave = updatedData => {
    onEdit(updatedData);
    setShowEditForm(false);
  };

  return (
    <div
      className={`w-full  h-auto p-4 rounded-[6px] mt-2 transition-opacity duration-200 ${isDragging ? "opacity-50" : ""}`}
      // style={{backgroundColor:color}}
        style={style}
      
      ref={setNodeRef} {...listeners} {...attributes} 
      
    >
      <div className="flex justify-between items-center"  style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}>
        <p className="text-[16px] font-semibold font-sf-text leading-[30px] text-white">{card.title}</p>
        <div className="flex items-center gap-2">
          <img src="/trash.svg" alt="Delete" onClick={onDelete} className="w-4 h-4 cursor-pointer pointer-events-auto" />
          <img src="/edit-2.svg" alt="Edit" onClick={onEdit} className="w-4 h-4 cursor-pointer pointer-events-auto" />
        </div>


        
      </div>
      <p className="text-white text-[14px] font-light font-sf-text">{card.description}</p>
      {card.tag && (
        <div className="inline-block text-[14px] font-light px-1.5 py-0.5 rounded border mt-4">
          <p className="text-white font-sf-text">{card.tag}</p>
        </div>
      )}
      {showEditForm && (
        <Form
          initialData={{ title:card.title, description:card.description, tag:card.tag, color:card.color }}
          onSubmit={handleSave}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}

export default Container;


