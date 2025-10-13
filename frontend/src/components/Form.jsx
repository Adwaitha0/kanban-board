"use client";
import { useState, useEffect } from "react";

function Form({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    color: "#ffffff",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", description: "", tag: "", color: "#ffffff" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-[#414141] gap-2 p-[5px] rounded-[6px]">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="bg-[#323232] p-2 rounded-[5px] text-white placeholder:text-[14px]"
      />

    
        <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="bg-[#323232] p-2 rounded-[5px] text-white placeholder:text-[14px] "
      />



      



<div className="relative w-full">
    <input
        list="tags"
        name="tag"
        value={formData.tag}
        onChange={handleChange}
        placeholder="Tags"
        className="bg-[#323232] p-2 rounded-[5px] text-white placeholder:text-[14px] appearence-none w-full pr-8 "
      />
      <datalist id="tags">
        <option value="tag" />
        <option value="tag" />
      </datalist>

            <img src="/arrow-down.svg" alt="arror"  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" ></img>
</div>
      
      




      <div className="flex items-center gap-2">
        <input type="text" name="color" value={formData.color} onChange={handleChange} className="bg-[#323232] w-30 flex-1 p-2 rounded-[5px] text-white text-[14px]"  />
        <input type="color" name="color" value={formData.color} onChange={handleChange} className="w-12 h-10 p-0 rounded-[15px] border-none appearance-none overflow-hidden border-none" />     
      </div>
      <button type="submit" className="p-2 rounded-[5px] bg-[#6A6DCD] text-white" >
        Submit
      </button>
    </form>
  );
}

export default Form;
