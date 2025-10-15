
import axios from 'axios';
import { useDroppable } from "@dnd-kit/core";
import Container from "./Container";
import Form from "./Form";
import { useState } from "react";
import Swal from "sweetalert2";


function Content({ heading, containers, setContainers, columnIndex ,searchTerm, selectedTag}) {
  const [showForm, setShowForm] = useState(false);
  
  const [color, setColor] = useState("#e6a9dbff");
  const [editingIndex, setEditingIndex] = useState(null);
  const { setNodeRef } = useDroppable({
    id: `droppable-${columnIndex}`,
    data: { columnIndex },
  });

  const toggleForm = () => setShowForm(prev => !prev);

const filteredCards = containers.filter((card) => {
  const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesTag = selectedTag ? card.tag === selectedTag : true;
  return matchesSearch && matchesTag;
});


  const handleDelete = async (indexToDelete) => {
  const cardToDelete = containers[indexToDelete];
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `Do you really want to delete "${cardToDelete.title}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    background:'#1b1212ff',
    cancelButtonText: "Cancel",
  });
  if (result.isConfirmed) {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:4000/user/board/card/${cardToDelete._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setContainers(containers.filter((_, ind) => ind !== indexToDelete));
      Swal.fire({
        title: "Deleted!",
        text: "Your card has been deleted.",
        background:'#1b1212ff',
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the card.",
        icon: "error",
        background:'#1b1212ff',
      });
    }
  }
};


  const handleAddCard= async (data)=>{
    try{
      const token=sessionStorage.getItem('token');  
      const res=await axios.post('http://localhost:4000/user/board/card/add',
        {
          ...data,
          categoryId:heading._id,
        },
        {
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`,
          }
        }
      )   
      setContainers([...containers,res.data.card])
    }catch(error){
      alert(error.response?.data?.message || 'something went wrong')
    }finally{
      setShowForm(false)
      setColor('#ffffff')
    }
  }

  const handleEdit = async (updatedData) => {
  const cardToEdit = containers[editingIndex]; 
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.put(`http://localhost:4000/user/board/card/${cardToEdit._id}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}`, },
      }
    );
    const updatedCard = res.data.card; 
    setContainers(
      containers.map((c, i) => (i === editingIndex ? updatedCard : c))
    );
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to update the card.",
      icon: "error",
      background: "#1b1212ff",
    });
  } finally {
    setEditingIndex(null); 
  }
};


  return (
    <div
      className="bg-[#262626] w-1/4 rounded-[10px] p-[20px_25px] shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
      ref={setNodeRef}
    >
      <div className="flex justify-between items-center pb-[3px]">
        <p className="text-[25px] font-sf-display font-bold">{heading.name}</p>
        <img src="/add-circle.svg" alt="Add icon" className="w-6 h-6 cursor-pointer" onClick={toggleForm} />
      </div>

      {filteredCards .map((c, index) => (


        <div key={index}>
          <Container
          key={index}
          title={c.title}
          description={c.description}
          tag={c.tag}
          color={c.color}
          onDelete={() => handleDelete(index)}
          onEdit={() => setEditingIndex(index)}
          draggableId={`card-${columnIndex}-${index}`}
          columnIndex={columnIndex}
          index={index}
        />

         {editingIndex === index && (
          <div className='mt-3'>
             <Form
          initialData={containers[editingIndex]}
          onSubmit={handleEdit}
        />
          </div>

       
      )}


        </div>
       



        
      ))}

     
      <div className="mt-[10px]">
        {showForm && (
          <Form 
              initialData={{ title: "", description: "", tag: "", color: color }}
              onSubmit={handleAddCard}
          />
        )}
      </div>
    </div>
  );
}

export default Content;

