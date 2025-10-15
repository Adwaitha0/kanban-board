"use client";
import axios from 'axios';
import { useState, useEffect } from "react";

function Form({ initialData, onSubmit }) {
  const [availableTags,setAvailableTags]=useState([])
  const [showTags, setShowTags] = useState(false);

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

  useEffect(() => {
  async function fetchTags() {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/user/board/card/tags", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.tags)
      setAvailableTags(res.data.tags);
      console.log(availableTags)
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }
  fetchTags();
}, []);


useEffect(() => {
  console.log("Available tags updated:", availableTags);
}, [availableTags]);






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



      



{/* <div className="relative w-full">
    <input
        list="tags"
        name="tag"
        value={formData.tag}
        onChange={handleChange}
        placeholder="Tags"
        className="bg-[#323232] p-2 rounded-[5px] text-white placeholder:text-[14px] appearance-none w-full pr-8 "
      />
      <datalist id="tags">
        {availableTags?.map((tag, idx) => (
          <option key={idx} value={tag} />
        ))}
      </datalist>

            <img src="/arrow-down.svg" alt="arror"  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
</div> */}
      

  <div className="relative w-full">
  <input
    type="text"
    name="tag"
    value={formData.tag}
    onChange={handleChange}
    placeholder="Tags"
    className="bg-[#323232] p-2 rounded-[5px] text-white placeholder:text-[14px] w-full"
  />

  <img
    src="/arrow-down.svg"
    alt="arrow"
    className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
    onClick={() => setShowTags(prev => !prev)}
  />

  {showTags && (
    <ul className="absolute z-10 w-full bg-[#414141] border border-gray-700 rounded mt-1 max-h-40 overflow-auto">
      {availableTags.map((tag, idx) => (
        <li
          key={idx}
          onClick={() => {
            setFormData(prev => ({ ...prev, tag }));
            setShowTags(false);
          }}
          className="p-2 hover:bg-[#6A6DCD] cursor-pointer text-white"
        >
          {tag}
        </li>
      ))}
    </ul>
  )}
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
