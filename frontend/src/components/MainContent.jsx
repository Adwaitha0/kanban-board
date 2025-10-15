

"use client";
import Content from "./Content";
import Swal from 'sweetalert2';
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

// const headings = ["Backlog", "To do", "In progress", "Designed"];

function Main({searchTerm, selectedTag}) {
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {   
      distance:0,
    }
  }));

  const [headings,setHeadings]=useState([]);
  const [columns, setColumns] = useState(headings.map(() => []));
  const [active, setActive] = useState(null);
  const router=useRouter()



  useEffect(()=>{
    const fetchItems=async()=>{
      try{
        const token=sessionStorage.getItem('token');
        const res=await fetch('http://localhost:4000/user/board/category',{
          headers:{Authorization:`Bearer ${token}`},
        })
        if (res.status === 401) {
  Swal.fire({
    icon: "warning",
    title: "Unauthorized",
    text: "You are not authorized. Please login.",
    confirmButtonText: "OK",
    background: "#1b1212ff",
    color: "#fff",
  }).then(() => {
    router.push("/");
  });
}
        const data=await res.json();
        
        const cardRes=await fetch('http://localhost:4000/user/board/card',{
          headers:{Authorization:`Bearer ${token}`},
        })
        const cards=await cardRes.json();

        const groupCards=data.map(cat=>
          cards.filter(card=>card.categoryId === cat._id)
        )
      if (Array.isArray(data)) {
        setHeadings(data);
        setColumns(groupCards);
      } else {
        console.warn("Unexpected response:", data);
        setHeadings([]);
        setColumns([]);
      }
      }catch(err){
        console.error('cant get categories',err)
      }
    };
    fetchItems();
  },[])


  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const activeColIdx = parseInt(active.data.current.columnIndex);
    const overColIdx = parseInt(over.data.current.columnIndex);
    if (activeColIdx !== overColIdx) {
      const cardIdx = active.data.current.index;
      const card = columns[activeColIdx][cardIdx];
      const nextState = columns.map(arr => [...arr]);
      nextState[activeColIdx].splice(cardIdx, 1);
       nextState[overColIdx].push({ ...card, categoryId: headings[overColIdx]._id });
      setColumns(nextState);

      try {
      const token = sessionStorage.getItem("token");
      await fetch(`http://localhost:4000/user/board/card/update/${card._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryId: headings[overColIdx]._id }),
      });
    } catch (err) {
      console.error("Failed to update card category", err);
    }
    }
    setActive(null);
  };

  if (headings.length === 0) return <p>No categories</p>

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex w-full gap-3 mt-4 items-start">
        {headings.map((heading, colIndex) => (
          <Content
            key={colIndex}
            heading={heading}
            containers={columns[colIndex]}
            setContainers={containers => {
              const next = columns.map(arr => [...arr]);
              next[colIndex] = containers;
              setColumns(next);
            }}
            columnIndex={colIndex}
            searchTerm={searchTerm}
            selectedTag={selectedTag}
          />
        ))}
      </div>
    </DndContext>
  );
}
export default Main;


