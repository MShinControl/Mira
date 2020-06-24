import React, { useRef } from 'react';
import './Cards.css';
import { Draggable } from 'react-beautiful-dnd';
import { EditOutlined } from '@ant-design/icons';
import EditCardModal from '../EditCardModal/EditCardModal';

const Cards = ({ provided, snapshot, column, setBoard, board, columnId }) => {
  const editIcons = useRef(new Array(column.items.length));

  const handleEdit = (event, index) => {
    event.preventDefault();
    const newItemsArr = [...column.items];
    newItemsArr[index]['mode'] = 'editing';
    
    const newColumn = { ...column, items: newItemsArr };
    setBoard({ ...board, [columnId]: newColumn });
  }

  return (
    <div
      className="cards"
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{
        background: snapshot.isDraggingOver
          ? "lightblue"
          : "rgb(231, 231, 231)",
        padding: 10,
        minHeight: 10
      }}
    >
      {column.items.map((item, index) => {
        return !item.mode ? (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
          >
            {(provided, snapshot) => {
              return (
                <div>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: snapshot.isDragging
                        ? "rgba(148, 148, 148, 0.75)"
                        : "white",
                      ...provided.draggableProps.style
                    }}
                    onMouseEnter={() => editIcons.current[index].style.display = 'flex'}
                    onMouseLeave={() => editIcons.current[index].style.display = 'none'}
                  >
                    <div className="priority-ctn">
                      <div
                        style={{
                          height: "8px",
                          width: "3rem",
                          borderRadius: "20px",
                          backgroundColor: `${item.priority}`,
                          marginBottom: "1rem",
                          float: 'left'
                        }}
                      ></div>
                      <EditOutlined onClick={(event) => handleEdit(event, index)} style={{ display: 'none', float: 'right'}} ref={el => editIcons.current[index] = el}/>
                    </div>
                    <div>
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            }}
          </Draggable>
        ) : <EditCardModal currentColumn={columnId} index={index} item={item} board={board} setBoard={setBoard}/>;
      })}
      {provided.placeholder}
    </div>
  );
}

export default Cards;