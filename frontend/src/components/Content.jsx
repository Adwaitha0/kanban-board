"use client";
import { useState } from "react";
import Container from "./Container";
import Form from "./Form";

function Content({heading}){
    const [showForm, setShowForm] = useState(false);
    const [color, setColor] = useState("#e6a9dbff");
    const [containers, setContainers] = useState([]); 
    const [editingIndex, setEditingIndex] = useState(null);
   
        const toggleForm = () => {
            setShowForm(prev => !prev);
        };
        const handleDelete = (indexToDelete) => {
        setContainers(prev => prev.filter((_, index) => index !== indexToDelete));
        };
        return(
   
            <div className="bg-[#262626] w-1/4 rounded-[10px] p-[20px_25px] shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                <div className="flex justify-between items-center pb-[3px]">
                    <p className="text-[30px] font-sf-display  font-bold">{heading}</p>
                    <img src="/add-circle.svg" alt="Add icon" className="w-6 h-6 cursor-pointer" onClick={toggleForm}/>
                </div>
               
                {containers.map((c, index) => (
                <Container key={index} title={c.title} description={c.description} tag={c.tag} color={c.color} onDelete={() => handleDelete(index)} onEdit={() => setEditingIndex(index)}/>
                ))}

                {editingIndex !== null && (
                <Form initialData={containers[editingIndex]}
                    onSubmit={(updatedData) => {
                    setContainers(prev =>
                        prev.map((c, i) => (i === editingIndex ? updatedData : c))
                    );
                    setEditingIndex(null);
                    }}
                />
                )}

                <div className="mt-[10px]">
                {showForm && (
                <Form initialData={{ title: "", description: "", tag: "", color :color }}
                onSubmit={(data) => { setContainers(prev => [...prev, data]); setShowForm(false); setColor("#ffffff");}} />
                )}
                </div>
            </div>       
    )
}

export default Content
