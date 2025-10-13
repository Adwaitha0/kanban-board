
// function Container({ title, description, tag, color, onDelete }) {
//    console.log(title,description,tag)
//     return (   
//     <div className="w-full h-auto p-2 rounded-[6px] mt-2" style={{ backgroundColor: color }}>
//       <div className="flex justify-between items-center">
//       <p className="font-bold leading-[30px] text-white">{title}</p>
//       <div className="flex items-center gap-2">
//       <img src="/trash.svg" alt="Delete icon"  onClick={onDelete} className="w-5 h-5 cursor-pointer mr-0.5"/>
//       <img src="/edit-2.svg" alt="Edit icon" className="w-5 h-5 cursor-pointer"/>
//       </div>  
//       </div>  
//       <p className="text-white">{description}</p>
//       {tag && (
//         <div className="inline-block px-1.5 py-0.5 rounded border">
//           <p className="text-white">{tag}</p>
//         </div>
//       )}     
//     </div>
//   );
// }

// export default Container;


import { useState } from "react";
import Form from "./Form";

function Container({ title, description, tag, color, onDelete, onEdit }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleSave = (updatedData) => {
    onEdit(updatedData);
    setShowEditForm(false);
  };

  return (
    <div className="w-full h-auto p-4 rounded-[6px] mt-2" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-semibold font-sf-text leading-[30px] text-white">{title}</p>
        <div className="flex items-center gap-2">
          <img src="/trash.svg" alt="Delete" onClick={onDelete} className="w-4 h-4 cursor-pointer"/>
          <img src="/edit-2.svg" alt="Edit" onClick={onEdit} className="w-4 h-4 cursor-pointer"/>
        </div>
      </div>

      <p className="text-white text-[14px] font-light font-sf-text ">{description}</p>
      {tag && <div className="inline-block text-[14px] font-light  px-1.5 py-0.5 rounded border mt-4"><p className="text-white font-sf-text">{tag}</p></div>}

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
