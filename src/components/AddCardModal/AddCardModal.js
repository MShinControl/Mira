import React, { useState } from 'react';
import './AddCardModal.css';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddCardModal = ({ currentColumn, columns, setColumns, setOpen }) => {
  const initialContent = { 
    id: uuidv4(), 
    content: '',
    priority: '' 
  }

  const classes = useStyles();

  const [ content, setContent ] = useState(initialContent);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setContent({ ...content, [name]:value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const items = columns[currentColumn].items;
    items.push(content);

    const newColumn = {
      name: columns[currentColumn].name,
      items
    }
    setColumns({...columns, [currentColumn]: newColumn});

    setOpen(false);
  }

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <div className="task-ctn">
        <label>Task</label>
        <input
          type="text"
          name="content"
          value={content.content}
          onChange={handleOnChange}
        />
      </div>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
        <Select
          name="priority"
          value={content.priority}
          onChange={handleOnChange}
        >
          <MenuItem value="red">
            <div
              className="priority"
              style={{ backgroundColor: `red` }}
              >
            </div>
            </MenuItem>
          <MenuItem value="yellow">
            <div
              className="priority"
              style={{ backgroundColor: `yellow` }}
              >
              </div>
            </MenuItem>
          <MenuItem value="green">
            <div
              className="priority"
              style={{ backgroundColor: `green` }}
              >
            </div>
          </MenuItem>
        </Select>
      </FormControl>
      
      <div className="button-ctn">
        <button className="add" type="submit">Add</button>
        <button className="cancel" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </form>
  )
}

export default AddCardModal;