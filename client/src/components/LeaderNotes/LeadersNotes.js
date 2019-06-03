import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Back from '@material-ui/icons/KeyboardBackspace';
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom';
import ErrorSnackbar from "../common/ErrorSnackbar";
import classNames from 'classnames';
import { getEvent, getTasks, getNotes, addTask, deleteTask } from "../../actions/eventsActions";
import {
    Typography,
    Button,
    Grid,
    Paper,
    Card,
    CardHeader,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField
} from '@material-ui/core';
import Spinner from "../common/Spinner";

const styles = theme => ({
    card: {
        width: 250,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    media: {
        height: 150,
        width: 150,
        margin: '25px 50px'
    },
    link: {
        textDecoration: 'none'
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
});

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user
    }
};

class LeadersNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingNotes: true,
            isLoadingTasks: true,
            event: '',
            eventId: (this.props.location.pathname.split("/")[2]),
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            notes: [],
            tasks: {},
            isDialogOpen: false,
            isTaskDialogOpen: false,
            noteContents: {},
            isNewItem: false,
            taskName: "",
            taskDescription: "",
            taskDate: this.formatDateField(new Date(Date.now())),
        }
        this.handleEvidenceTextFieldChange = this.handleEvidenceTextFieldChange.bind(this)
        this.handleDialogClose = this.handleDialogClose.bind(this)
        this.handleDialogOpen = this.handleDialogOpen.bind(this)
        this.handleSubmitNote = this.handleSubmitNote.bind(this)
        this.handleSubmitTask = this.handleSubmitTask.bind(this)
        this.handleNewNote = this.handleNewNote.bind(this)
        this.handleNewTask = this.handleNewTask.bind(this)
        this.handleDeleteTask = this.handleDeleteTask.bind(this)
        this.resetDialog = this.resetDialog.bind(this)
    }

    handleErrorSnackbarClose = () => {
        this.setState({
            isErrorSnackbarOpen: false,
        })
    }

    handleNewNote(e) {
        // TODO: add logic if a note in the same date already exists.
        let bla = Object.keys(this.state.notes).filter(key => {
            let fKey = this.formatDate(key)
            let fNow = this.formatDate(new Date(Date.now()))
            return (fKey === fNow)
        })
        this.setState({
            isDialogOpen: true,
            isNewItem: (bla.length === 0),
            noteContents: (bla.length > 0 ? this.state.notes[bla[0]]['Meeting Notes']: ""),
            selectedDate: (bla.length > 0 ? bla[0] : "")
        })
    }

    handleNewTask(e) {
        this.setState({
            isTaskDialogOpen: true,
            taskName: "",
            taskDate: this.formatDateField(new Date(Date.now())),
            taskDescription: "",
        })
    }

    formatDate = (date) => {
        let d = new Date(date);
        return d.getDate().toString().padStart(2, '0') + "/" + (d.getMonth() + 1).toString().padStart(2, '0') + "/" + d.getFullYear()
    }

    formatDateField= (date) => {
        let d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
    }

    componentWillMount() {
        getTasks(this.state.eventId)
            .then(res => {
                let tasks = {}
                if (res.data) {
                res.data.map((task, index) => {
                    tasks[index] = task;
                })
                } else {
                    tasks = []
                }
                this.setState({
                    isLoadingTasks: false,
                    tasks: tasks
                })
            })
            .catch(err => {
                this.setState({
                    isLoadingTasks: false,
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load tasks - ${err}`,
                })
            });

        getEvent(this.state.eventId)
            .then(res => {
                this.setState({
                    isLoadingEvent: false,
                    event: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isLoadingEvent: false,
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load Event - ${err}`,
                })
            });

        getNotes(this.state.eventId)
            .then(res => {
                let notes = {}
                if (res.data) {
                    res.data.map(note => {
                        notes[note['Meeting Date']] = note;
                    })
                }
                else {
                    notes = []
                }
                this.setState({
                    isLoadingNotes: false,
                    notes: notes
                })
            })
            .catch(err => {
                this.setState({
                    isLoadingNotes: false,
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load notes - ${err}`
                })
            })
    }

    handleToggle(taskName) {
        // backendlogic
        let myTask;
        let tasks = Object.values(this.state.tasks).map(task => {
            if (task['Task Name'] === taskName) {
                task['X'] = !task['X']
                myTask = task;
            }
            return task
        })
        
        addTask(this.state.eventId, myTask)
            .then(this.setState(tasks))
    }

    handleEvidenceTextFieldChange(e, field) {
        this.setState({
            [field]: e.target.value
        })
    }

    handleDialogClose = () => this.resetDialog()

    handleSubmitNote = (e) => {
        let { notes, noteContents, selectedDate } = this.state

        if (!noteContents || noteContents === null || noteContents.trim() === "") {
            this.setState({
                isErrorSnackbarOpen: true,
                errorSnackbarMessage: "Leaders notes cannot be empty"
            })
            e.preventDefault();
            return;
        }

        let newItem = {
            "Meeting Date": selectedDate || new Date(Date.now()),
            "Meeting Notes": noteContents,
            "Last Update": new Date(Date.now())
        }
        notes[newItem['Meeting Date']] = newItem
        this.setState({
            notes: notes
        })
        this.resetDialog();
    }

    handleDeleteTask = (task) => {
        let { tasks } = this.state

        let newTasks = Object.values(tasks).filter(currTask => {
            return currTask['Task Name'] !== task['Task Name']
        })

        deleteTask(this.state.eventId, task)
            .then(this.setState({
                tasks: newTasks
            }))
    }

    handleSubmitTask = (e) => {
        let { tasks, taskName, taskDescription, taskDate } = this.state

        let exists = Object.values(tasks).filter(val => {
            return (val['Task Name'] === taskName)
        }).length !== 0
        if (!taskName || taskName === null || taskName.trim() === "") {
            this.setState({
                isErrorSnackbarOpen: true,
                errorSnackbarMessage: "Task name cannot be empty"
            })
            e.preventDefault();
            return;
        }
        if (exists) {
            this.setState({
                isErrorSnackbarOpen: true,
                errorSnackbarMessage: `A task called '${taskName}' already exists`
            })
            e.preventDefault();
            return;
        }
        if (!taskDescription || taskDescription === null || taskDescription.trim() === "") {
            this.setState({
                isErrorSnackbarOpen: true,
                errorSnackbarMessage: "Task description cannot be empty"
            })
            e.preventDefault();
            return;
        }
        let dNow = new Date(new Date(Date.now()).toLocaleDateString())
        let dTask = new Date(new Date(taskDate).toLocaleDateString())
        if (!taskDate || taskDate === null || dNow > dTask) {
            this.setState({
                isErrorSnackbarOpen: true,
                errorSnackbarMessage: "Task date cannot be empty, and it cannot be earlier than today"
            })
            e.preventDefault();
            return;
        }
        
        
        let newItem = {
            "Task Name": taskName,
            "Description": taskDescription,
            "date": taskDate
        }
        tasks[Object.keys(tasks).length] = newItem
        addTask(this.state.eventId, newItem)
            .then(() => {
                this.setState({
                    tasks: tasks
                });
                this.resetDialog()
            })
    }

    resetDialog() {
        this.setState({
            isDialogOpen: false,
            currentNote: {},
            isNewItem: false,
            isTaskDialogOpen: false,
            taskName: "",
            taskDescription: "",
            taskDate: this.formatDateField(new Date(Date.now()))
        })
    }

    handleDialogOpen = (note) => {
        this.setState({ 
            isDialogOpen: true,
            selectedDate: note["Meeting Date"],
            noteContents: note["Meeting Notes"]
        })
    };

    render() {
        // if (!this.props.user) {
        //     console.log("USER IS NOT LOGGED IN");
        //     this.props.history.push('/login');
        // }
        if (this.state.isLoadingEvent || this.state.isLoadingTasks || this.state.isLoadingNotes) {
            return (
                <Spinner />
            );
        }
        let { classes, history } = this.props;
        let { tasks, notes, noteContents, isNewItem, selectedDate, isTaskDialogOpen, isDialogOpen, taskName, taskDescription, taskDate } = this.state;
        return (
            <div>
                <Dialog fullWidth maxWidth="md" open={isDialogOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle align="center" id="form-dialog-title">{!isNewItem ? `Notes from ${this.formatDate(selectedDate)}` : "Create a new note"} </DialogTitle>
                    <DialogContent>
                        <TextField
                                required
                                value={noteContents}
                                autoFocus
                                margin="dense"
                                id="noteContents"
                                label="Note contents"
                                type="text"
                                fullWidth
                                multiline
                                rowsMax="20"
                                rows="20"
                                style={{minHeight: 410}}
                                onChange={e => {this.handleEvidenceTextFieldChange(e, "noteContents")}}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmitNote} color="primary">
                            Submit
                        </Button>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth maxWidth="xs" open={isTaskDialogOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle align="center" id="form-dialog-title">Create a new task</DialogTitle>
                    <DialogContent>
                        <TextField
                                required
                                value={taskName}
                                autoFocus
                                margin="dense"
                                id="taskName"
                                label="Task name"
                                placeholder="Task name"
                                type="text"
                                fullWidth
                                onChange={e => {this.handleEvidenceTextFieldChange(e, "taskName")}}
                            />
                        <TextField
                                required
                                value={taskDescription}
                                margin="dense"
                                id="taskDescription"
                                label="Task description"
                                type="text"
                                multiline
                                rowsMax={3}
                                rows={3}
                                fullWidth
                                onChange={e => {this.handleEvidenceTextFieldChange(e, "taskDescription")}}
                            />
                        <TextField
                                required
                                value={taskDate}
                                margin="dense"
                                id="taskDate"
                                label="Task date (dd/mm/yyyy)"
                                type="date"
                                fullWidth
                                onChange={e => {this.handleEvidenceTextFieldChange(e, "taskDate")}}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => {this.handleSubmitTask(e)}} color="primary">
                            Submit
                        </Button>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <Button key={"back"} variant="contained" color="primary" className={classes.button} onClick={() => history.goBack()}>
                            <Back />Back
                        </Button>
                        <br />
                        <br />
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader
                                avatar={<Button
                                    variant="fab"
                                    color="primary"
                                    onClick={this.handleNewNote}
                                >
                                    <Add />
                                </Button>}
                                title="Leaders Meeting Notes"
                                titleTypographyProps={{ align: "center", variant: "h5" }}
                                subheader="What happened? What's going to happen? Key points."
                                subheaderTypographyProps={{ align: "center" }}
                            />

                            {Object.entries(notes).length > 0 ?
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {Object.keys(notes[Object.keys(notes)[0]]).map(column => {
                                                    return (
                                                        <TableCell align="center">
                                                            {/* {column !== "date" ? column : "Due date (dd/mm/yyyy)"} */}
                                                            {column}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.values(notes).map((note, index) => (
                                                <TableRow className={classNames(classes.tableRow, classes.tableRowHover)} onClick={() => {this.handleDialogOpen(note)}} key={"notes" + index.toString()}>
                                                    <TableCell align="center">{this.formatDate(note['Meeting Date'])}</TableCell>
                                                    <TableCell align="center">{note['Meeting Notes']}</TableCell>
                                                    <TableCell align="center">{this.formatDate(note['Last Update'])}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                                : ''}
                        </Card>
                    </Grid>
                    <Grid container justify="space-around">
                    <Grid item xs={5}>
                    <br />
                    <br />
                    <br />
                    <br />
                        <Card>
                            <CardHeader
                                avatar={<Button
                                    variant="fab"
                                    color="primary"
                                    onClick={this.handleNewTask}
                                >
                                    <Add />
                                </Button>}
                                title="TO DO"
                                titleTypographyProps={{ align: "center", variant: "h5" }}
                                subheader="Tasks that needs to be done"
                                subheaderTypographyProps={{ align: "center" }}
                            />
                            {Object.entries(tasks).length > 0 ?
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {Object.keys(tasks[0]).map(column => {
                                                    // if (column !== "X")
                                                    return (
                                                        <TableCell align="center">
                                                            {column !== "date" ? column : "Due date (dd/mm/yyyy)"}
                                                        </TableCell>
                                                    )
                                                })}
                                                <TableCell align="center">
                                                    Delete
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody style={{ backgroundColor: 'lightblue' }}>
                                            {Object.values(tasks).filter(val => !val.X).map((task, index) => (
                                                <TableRow key={"todo" + index.toString()}>
                                                    <TableCell align="center"><Checkbox onChange={() => { this.handleToggle(task['Task Name']) }} checked={false} /></TableCell>
                                                    <TableCell align="center">{task['Task Name']}</TableCell>
                                                    <TableCell align="center">{task['Description']}</TableCell>
                                                    <TableCell align="center">{this.formatDate(task['date'])}</TableCell>
                                                    <TableCell align="center"><Button variant="flat" color="secondary" onClick={() => {this.handleDeleteTask(task)}}><Delete /></Button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                                : ''}
                        </Card>
                    </Grid>
                    
                        <Grid item xs={4}>
                        <br />
                        <br />
                        <br />
                        <br />
                            <Card>
                                <CardHeader
                                    title="Completed"
                                    titleTypographyProps={{ align: "center", variant: "h5" }}
                                    subheader="Tasks that you've completed! Good job!"
                                    subheaderTypographyProps={{ align: "center" }}
                                />
                                {Object.entries(tasks).length > 0 ?
                                    <Paper>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {Object.keys(tasks[0]).map(column => {
                                                        return (
                                                            <TableCell align="center">
                                                                {column !== "date" ? column : "Completed On (dd/mm/yyyy)"}
                                                            </TableCell>
                                                        )
                                                    })}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody style={{ backgroundColor: 'lightgreen' }}>
                                                {Object.values(tasks).filter(val => val.X).map((task, index) => (
                                                    <TableRow key={"completed" + index.toString()}>
                                                        <TableCell align="center"><Checkbox onChange={() => { this.handleToggle(task['Task Name']) }} checked={true} /></TableCell>
                                                        <TableCell align="center">{task['Task Name']}</TableCell>
                                                        <TableCell align="center">{task['Description']}</TableCell>
                                                        <TableCell align="center">{this.formatDate(task['date'])}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                    : ''}
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LeadersNotes));