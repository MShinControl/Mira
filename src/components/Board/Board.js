import React, { useState } from 'react';
import './Board.css';
import Column from '../Column/Column';
import AddCardModal from '../AddCardModal/AddCardModal';
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

const itemsFromBackend = [
  { id: uuidv4(), content: "First task", priority: 'red' },
  { id: uuidv4(), content: "Second task", priority: 'yellow' },
  { id: uuidv4(), content: "Third task", priority: 'green' },
  { id: uuidv4(), content: "Fourth task", priority: 'red' },
  { id: uuidv4(), content: "Fifth task", priority: 'yellow' }
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Column 1",
    items: itemsFromBackend
  },
  [uuidv4()]: {
    name: "Column 2",
    items: []
  },
  [uuidv4()]: {
    name: "Done",
    items: []
  }
};


const Board = () => {
  const [ columns, setColumns ] = useState(columnsFromBackend);
  const [ open, setOpen ] = useState(false);
  const [ currentColumn, setCurrentColumn ] = useState(null);

  const onDragEnd = result => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const addCard = (event, columnId) => {
    event.preventDefault();
    setCurrentColumn(columnId);
    setOpen(true);
  }

  return (
    <div className="board">
      {open ? (
        <div>
          <div className="overlay"></div>
          <AddCardModal setOpen={setOpen} currentColumn={currentColumn} columns={columns} setColumns={setColumns}/>
        </div>
      ) : null}
      
      <DragDropContext
        onDragEnd={result => onDragEnd(result)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div className="columns">
              <Column key={columnId} addCard={addCard} columnId={columnId} column={column} columns={columns} setColumns={setColumns}/>
            </div>
          ) 
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;