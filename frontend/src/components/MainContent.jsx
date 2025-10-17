"use client";
import Content from "./Content";
import Swal from 'sweetalert2';
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState , useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// const headings = ["Backlog", "To do", "In progress", "Designed"];

function Main({searchTerm, selectedTag}) {
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {   
      distance:0,
    }
  }));

  const [headings,setHeadings]=useState([]);
  const [columns, setColumns] = useState([]);
  const router=useRouter()



    const fetchItems=useCallback(async()=>{
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
        return;
      }
        const data=await res.json();
        console.log(data)
        console.log('got category')
        const cardRes=await fetch('http://localhost:4000/user/board/card',{
          method: 'GET',
          headers:{Authorization:`Bearer ${token}`},
        })
        const cards=await cardRes.json();

        console.log(cards)
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
    },[router]);
  
  useEffect(()=>{
    fetchItems();
  },[fetchItems])


const handleDragEnd = async (event) => {
  const { active, over } = event;
  if (!over || !active) return;

  const nextState = columns.map((col) => [...col]);

  let activeColIdx, activeIndex, overColIdx, overIndex;

  nextState.forEach((col, colIdx) => {
    const idx = col.findIndex(card => card._id === active.id);
    if (idx !== -1) {
      activeColIdx = colIdx;
      activeIndex = idx;
    }
  });

  nextState.forEach((col, colIdx) => {
    const idx = col.findIndex(card => card._id === over.id);
    if (idx !== -1) {
      overColIdx = colIdx;
      overIndex = idx;
    }
  });

  if (overIndex === undefined) {
    overColIdx = nextState.findIndex(col => col.length === 0) ?? activeColIdx;
    overIndex = nextState[overColIdx].length;
  }

  const draggedCard = nextState[activeColIdx][activeIndex];

  console.log(draggedCard)
  nextState[activeColIdx].splice(activeIndex, 1);
  nextState[overColIdx].splice(overIndex, 0, {
    ...draggedCard,
    categoryId: headings[overColIdx]._id,
  });
  setColumns(nextState)


  try {
    const token = sessionStorage.getItem("token");
    await fetch(`http://localhost:4000/user/board/category/updatePosition`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cardId: draggedCard._id,
        positionTo: overIndex,
        positionFrom:activeIndex,
        categoryId: headings[overColIdx]._id,
        columnIdTo: headings[overColIdx].position,
        columnIdFrom: headings[activeColIdx].position,
      }),
    });
    await fetchItems();
  } catch (err) {
    console.error("Failed to update card", err);
  }
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


