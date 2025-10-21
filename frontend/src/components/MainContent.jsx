"use client";
import Content from "./Content";
import Swal from "sweetalert2";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {  makePrivateGETApiCall, makePrivatePUTApiCall} from "@/helper/api";

function Main({ searchTerm, selectedTag }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    })
  );

  const [headings, setHeadings] = useState([]);
  const [columns, setColumns] = useState([]);
  const router = useRouter();

  const fetchItems = useCallback(async () => {
    try {
      const data = await makePrivateGETApiCall('/category')
      const cards = await makePrivateGETApiCall('/card')
      const groupCards = data.map((cat) =>
        cards.filter((card) => card.categoryId === cat._id)
      );
      if (Array.isArray(data)) {
        setHeadings(data);
        setColumns(groupCards);
      } else {
        console.warn("Unexpected response:", data);
        setHeadings([]);
        setColumns([]);
      }
    } catch (err) {
      console.error("cant get categories", err);
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
    }
  }, [router]);



  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || !active) return;
    let overColIdx, overIndex;
    columns.forEach((col, colIdx) => {
      const idx = col.findIndex((card) => card._id === over.id);
      if (idx !== -1) {
        overColIdx = colIdx;
        overIndex = idx;
      }
    });
    if (overColIdx === undefined) {
      overColIdx = headings.findIndex((cat) => cat._id === over.id);
      overIndex = columns[overColIdx]?.length || 0;
    }

    if (overColIdx !== -1 && overIndex === undefined) {
      overIndex = columns[overColIdx]?.length || 0;
    }

    try {
      await makePrivatePUTApiCall("/category/updatePosition", {
      cardId: active.id,
      positionTo: overIndex,
      categoryId: headings[overColIdx]._id,
    });
      await fetchItems();
    } catch (err) {
      console.error("Failed to update card", err);
    }
  };

  if (headings.length === 0) return <p>No categories</p>;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex w-full gap-3 mt-4 items-start">
        {headings.map((heading, colIndex) => (
          <Content
            key={colIndex}
            heading={heading}
            containers={columns[colIndex]}
            setContainers={(containers) => {
              const next = columns.map((arr) => [...arr]);
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
