import React, { useState } from 'react';
import './Column.css';
import { Droppable } from "react-beautiful-dnd";
import Cards from '../Cards/Cards';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Column = ({ addCard, columnId, column, board, setBoard }) => {

  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState(column.name)

  const handleOnChange = event => {
    const { value } = event.target;
    setColumnName(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const newColumn = column;
    newColumn.name = columnName;
    setBoard({...board, [columnId]: newColumn })
    setOpen(false);
  }

  return (
    <div className="column-ctn">
      {open ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={columnName}
            onChange={handleOnChange}
          />

          <button className="confirm" type="submit">
            <CheckCircleOutlined />
          </button>

          <button className="cancel" onClick={() => setOpen(false)}>
            <CloseCircleOutlined />
          </button>

        </form>
      ) : <h2 onClick={() => setOpen(true)}>{column.name}</h2>}

      <div>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => <Cards column={column} columnId={columnId} board={board} provided={provided} snapshot={snapshot} setBoard={setBoard}/>}
        </Droppable>
        <button
          className="add-btn"
          onClick={event => addCard(event, columnId)}
        >+ Add a Card</button>
      </div>
    </div>
  );
};

export default Column;