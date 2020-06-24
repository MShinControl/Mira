import React, { useState } from 'react';
import './EditCardModal.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const EditCardModal = ({ item, index, currentColumn, board, setBoard }) => {
  // const classes = useStyles();
  const initialItem = {...item}

  const [ newItem, setNewItem ] = useState(initialItem);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log('hellooo')
    const newItemsArr = [...board[currentColumn].items];
    newItemsArr[index] = newItem;
    newItemsArr[index]['mode'] = null;
    const newColumn = {...board[currentColumn], items: newItemsArr};
    setBoard({...board, [currentColumn]: newColumn});
  }

  const handleCancel = () => {
    const newItemsArr = [...board[currentColumn].items];
    newItemsArr[index]['mode'] = null;
    const newColumn = {...board[currentColumn], items: newItemsArr};
    setBoard({...board, [currentColumn]: newColumn});
  }

  const handleDelete = () => {
    const newItemsArr = [...board[currentColumn].items].filter((el, i) => i !== index);
    const newColumn = {...board[currentColumn], items: newItemsArr};
    setBoard({...board, [currentColumn]: newColumn});
  }

  return (
    <div className="edit-ctn">
      <div className="edit-overlay" onClick={handleCancel}></div>

      <div className="edit-form-ctn">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Select
              name="priority"
              value={newItem.priority}
              onChange={handleOnChange}
            >
              <MenuItem value="red">
                <div
                  className="priority"
                  style={{
                    height: "8px",
                    width: "3rem",
                    borderRadius: "20px",
                    backgroundColor: `red`,
                    margin: "auto 0"
                  }}
                  >
                </div>
                </MenuItem>
              <MenuItem value="yellow">
                <div
                  className="priority"
                  style={{
                    height: "8px",
                    width: "3rem",
                    borderRadius: "20px",
                    backgroundColor: `yellow`,
                    margin: "auto 0"
                  }}
                  >
                  </div>
                </MenuItem>
              <MenuItem value="green">
                <div
                  className="priority"
                  style={{
                    height: "8px",
                    width: "3rem",
                    borderRadius: "20px",
                    backgroundColor: `green`,
                    margin: "auto 0"
                  }}
                  >
                </div>
              </MenuItem>
            </Select>
          </FormControl>
          
          <div className="edit-task">
            <label>Task</label>
            <input
                type="text"
                name="content"
                value={newItem.content}
                onChange={handleOnChange}
              />
          </div>
          
          <div className="edit-buttons">
            <button className="save-btn" type="submit">Save</button>
            <button className="del-btn" onClick={handleDelete}>Delete</button>
            <button className="can-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCardModal;