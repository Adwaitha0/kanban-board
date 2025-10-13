"use client";
import React,{useState} from "react";

function Header(){
    const [color, setColor] = useState("#ffffff");

    const handleTextInputChange = (e) => {
        setColor(e.target.value);
    };
 
    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    return (
        <div className="flex justify-between items-center w-full h-[85px] bg-[#262626] rounded-[10px] px-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            <input placeholder="Search"  className="bg-[#323232] text-[14px] text-white rounded-md px-3 py-2 w-95 outline-none "></input>
            <input placeholder="Tag" list="tags" className="bg-[#323232] text-[14px]  text-white rounded-md px-3 py-2 w-95 outline-none "></input>
            <datalist id="tags">
                <option value="tag" />
                <option value="tag" />
            </datalist>
            <input value={color} onChange={handleTextInputChange}  className="bg-[#323232] text-[14px]  text-white rounded-md px-3 py-2 w-95 outline-none "></input>
            <input value={color} onChange={handleColorChange} type="color"   className="w-14 h-11 p-0 rounded-[15px] cursor-pointer appearance-none overflow-hidden border-none"></input>
        </div>

    )
    
}

export default Header