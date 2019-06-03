import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Back from '@material-ui/icons/KeyboardBackspace';
import Add from '@material-ui/icons/Add'
import { Link } from 'react-router-dom';
import ErrorSnackbar from "../common/ErrorSnackbar";
import classNames from 'classnames';
import { getEvent, getTasks, getNotes } from "../../actions/eventsActions";
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
            noteContents: {},
            isEditing: false,
            isNewItem: false
        }
        this.handleEvidenceTextFieldChange = this.handleEvidenceTextFieldChange.bind(this)
        this.handleDialogClose = this.handleDialogClose.bind(this)
        this.handleDialogOpen = this.handleDialogOpen.bind(this)
        this.handleSubmitNote = this.handleSubmitNote.bind(this)
    }

    handleErrorSnackbarClose = () => {
        this.setState({
            isErrorSnackbarOpen: false,
        })
    }

    formatDate = (date) => {
        let d = new Date(date);
        return d.getDate().toString().padStart(2, '0') + "/" + (d.getMonth() + 1).toString().padStart(2, '0') + "/" + d.getFullYear()
    }

    componentWillMount() {
        getTasks(this.state.eventId)
            .then(res => {
                let tasks = {}
                res.data.map((task, index) => {
                    tasks[index] = task;
                })
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
                res.data.map(note => {
                    notes[note['Meeting Date']] = note;
                })
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
        let tasks = Object.values(this.state.tasks).map(task => {
            if (task['Task Name'] === taskName) {
                task['X'] = !task['X']
            }
            return task
        })
        this.setState(tasks)
    }

    handleEvidenceTextFieldChange(e) {
        let newNote = this.state.noteContents
        newNote = e.target.value
        this.setState({
            noteContents: newNote
        })
    }

    handleDialogClose = () => this.setState({ isDialogOpen: false, currentNote: {}, isEditing: false, isNewItem: false })

    handleSubmitNote = () => {
        
        let { notes, noteContents, selectedDate } = this.state
        let newItem = {
            "Meeting Date": selectedDate || this.formatDate(Date.now()),
            "Meeting Notes": noteContents,
            "Last Update": this.formatDate(Date.now())
        }
        notes[newItem['Meeting Date']] = newItem
        this.setState({
            notes: notes
        })
    }

    handleDialogOpen = (note) => event => {

        let currentPayload = {
            userId: note.User.id,
            eventId: this.state.eventId,
            values: note.evidence,
        }
        this.setState({
            isDialogOpen: true,
            currentParticipant: note,
            currentPayload
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
        let { tasks, notes, noteContents, isEditing, isNewItem } = this.state;
        return (
            <div>
                <Dialog fullWidth maxWidth="md" open={this.state.isDialogOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle align="center" id="form-dialog-title">{!isNewItem ? "Edit a" : "Create a new"} Note</DialogTitle>
                    <DialogContent>
                        
                        <DialogContentText align="center">
                            {isNewItem ? 'This note has no content, press EDIT to write content' : (noteContents || "This note has no content, press EDIT to write content")}
                        </DialogContentText>
                        <TextField
                            required
                            value={noteContents}
                            style={isEditing ? {display: 'flex'} : { display: 'none' }}
                            autoFocus
                            margin="dense"
                            id="noteContents"
                            label="Note contents"
                            type="text"
                            fullWidth
                            multiline
                            rowsMax="20"
                            onChange={this.handleEvidenceTextFieldChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmitNote} color="primary">
                            Submit
                        </Button>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button style={!isEditing ? {} : { display: 'none' }} onClick={() => {this.setState({isEditing: !isEditing})}} color="primary">
                            Edit
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
                                    onClick={() => { this.setState({isDialogOpen: true, isNewItem: true, isEditing:false, noteContents: ""}) }}
                                >
                                    <Add />
                                </Button>}
                                title="Leaders Meeting Notes"
                                titleTypographyProps={{ align: "center", variant: "h5" }}
                                subheader="What happened? What's going to happen? Key points."
                                subheaderTypographyProps={{ align: "center" }}
                            />

                            {notes ?
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
                                                <TableRow className={classNames(classes.tableRow, classes.tableRowHover)} onClick={() => {this.setState({ isDialogOpen: true, selectedDate: note["Meeting Date"], noteContents: note["Meeting Notes"]})}} key={"notes" + index.toString()}>
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
                    <Grid item xs={4}>
                    <br />
                    <br />
                    <br />
                    <br />
                        <Card>
                            <CardHeader
                                avatar={<Button
                                    variant="fab"
                                    color="primary"
                                    onClick={() => { alert("CLICK") }}
                                >
                                    <Add />
                                </Button>}
                                title="TO DO"
                                titleTypographyProps={{ align: "center", variant: "h5" }}
                                subheader="Tasks that need to be done"
                                subheaderTypographyProps={{ align: "center" }}
                            />
                            {tasks ?
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {Object.keys(tasks[0]).map(column => {
                                                    return (
                                                        <TableCell align="center">
                                                            {column !== "date" ? column : "Due date (dd/mm/yyyy)"}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody style={{ backgroundColor: 'lightblue' }}>
                                            {Object.values(tasks).filter(val => !val.X).map((task, index) => (
                                                <TableRow key={"todo" + index.toString()}>
                                                    <TableCell align="center"><Checkbox onChange={() => { this.handleToggle(task['Task Name']) }} checked={false} /></TableCell>
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
                                {tasks ?
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