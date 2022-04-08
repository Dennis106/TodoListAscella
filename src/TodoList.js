import React, { useState } from 'react';
import {
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Switch,
    TablePagination
} from '@mui/material';

import './TodoList.scss';
import { addTodo, removeTodo, updateTodo } from './js/actions';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoList(props) {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [editTodo, setEditTodo] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleAddOpen = () => {
        setEditTodo(null);
        setDescription('');
        setOpen(true);
    };

    const handleEditOpen = (todo) => {
        setEditTodo(todo);
        setDescription(todo.description);
        setOpen(true);
    }

    const handleCancelClose = () => {
        setOpen(false);
    }

    const handleAddClose = () => {
        setOpen(false);

        if (editTodo != null) {
            editTodo.description = description;
            props.updateTodo(editTodo);
        } else {
            let id = 1;
            if (props.todos.length > 0) {
                let temp = props.todos[props.todos.length - 1];
                id = temp.id + 1;
            }
            let todo = { id: id, description: description, complete: false };
            props.addTodo(todo);
        }
    };

    const handleChange = (e) => {
        setDescription(e.target.value);
    }

    const handleCompletion = (row) => {
        row.complete = !row.complete;
        props.updateTodo(row.complete);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container className="todo-container">
            <h2>Todo List</h2>
            <div className="todo-list">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ height: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Completion</TableCell>
                                    <TableCell>Edit / Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>
                                            <Switch checked={row.complete} onChange={() => handleCompletion(row)} />
                                        </TableCell>
                                        <TableCell>
                                            <EditIcon onClick={() => handleEditOpen(row)} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <DeleteIcon onClick={() => props.removeTodo(row)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={props.todos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Button variant="contained" className="btn-add" onClick={handleAddOpen}>ADD</Button>
                <Dialog open={open}>
                    <DialogTitle>{editTodo === null? 'New': 'Edit'} Todo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your Todo title here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={description}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelClose}>Cancel</Button>
                        <Button onClick={handleAddClose}>{editTodo === null ? 'Add' : 'Edit'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>

    );
}

const mapStateToProps = state => {
    return { todos: state.todos };
};

const mapDispatchToProps = dispatch => {
    return {
        addTodo: todo => dispatch(addTodo(todo)),
        updateTodo: todo => dispatch(updateTodo(todo)),
        removeTodo: id => dispatch(removeTodo(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);