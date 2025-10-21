"use client";
// import axios from 'axios';
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";
import React,{useState, useEffect} from "react";
import { makePrivateGETApiCall } from '@/helper/api';

function Header({searchTerm, setSearchTerm, selectedTag, setSelectedTag}){
    const [color, setColor] = useState("#ffffff");
    const [availableTags, setAvailableTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const router=useRouter();

  useEffect(() => {
  async function fetchTags() {
    try {
      const res = await makePrivateGETApiCall("/card/tags");
      setAvailableTags(res.tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }
  fetchTags();
}, []);

    const handleTextInputChange= (e) => { setColor(e.target.value); };
 
    const handleColorChange = (e) => { setColor(e.target.value);};
  
    const logout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, logout",
    cancelButtonText: "Cancel",
    background: "#1b1212ff",
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem("token");
      router.push("/");
      Swal.fire({
        title: "Logged out!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#1b1212ff",
      });
    }
  });
};

    return (
        <div className="flex justify-between items-center w-full h-[85px] bg-[#262626] rounded-[10px] px-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            <input placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  className="bg-[#323232] text-[14px] text-white rounded-md px-3 py-2 w-92 outline-none "></input>
            
            <div className="relative w-1/3">
                <input
                type="text"
                placeholder="Tag"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                onFocus={() => setShowTags(true)}
                className="bg-[#323232] text-[14px] text-white rounded-md px-3 py-2 w-full outline-none"
                />
                <img
                src="/arrow-down.svg"
                alt="arrow"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                onClick={() => setShowTags((prev) => !prev)}
                />

                {showTags && (
                <ul className="absolute z-10 w-full bg-[#414141] border border-gray-700 rounded mt-1 max-h-40 overflow-auto">
                    {availableTags.map((tag, idx) => (
                    <li
                        key={idx}
                        onClick={() => {
                        setSelectedTag(tag);
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
            <input value={color} onChange={handleTextInputChange}  className="bg-[#323232] text-[14px]  text-white rounded-md px-3 py-2 w-92 outline-none "></input>
            <input value={color} onChange={handleColorChange} type="color"   className="w-14 h-11 p-0 rounded-[15px] cursor-pointer appearance-none overflow-hidden border-none"></input>
            <button onClick={logout}><img src='/exit.png' alt='exit' width={30} height={30} ></img></button>
        </div>

    )
    
}

export default Header