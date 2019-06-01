import { connect } from 'react-redux';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    getParticipations,
    getEventIndicators,
    getUserEvidence,
    setUserEvidence
} from "../../actions/eventsActions";
import Spinner from "../common/Spinner";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorSnackbar from "../common/ErrorSnackbar";

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user
    }
};

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    colored: {
        borderColor: 'blue'
    }
});

class Pdpef extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventId: this.props.match.params.eventId,
            isLoadingParticipants: true,
            isLoadingIndicators: true,
            isDialogOpen: false,
            participants: [],
            indicators: [],
            currentIndicator: "Hover over any indicator to see it's full description",
            currentParticipant: null,
            currentPayload: {},
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            currentChecked: false
        }

        this.handleDialogClose = this.handleDialogClose.bind(this)
        this.handleDialogOpen = this.handleDialogOpen.bind(this)
        this.handleEvidenceSend = this.handleEvidenceSend.bind(this)
    }

    componentWillMount() {
        this.fetchEventIndicators(this.state.eventId)
        this.fetchParticipants(this.state.eventId)
    }

    handleErrorSnackbarClose = () => {
        this.setState({
            isErrorSnackbarOpen: false,
        })
    }

    fetchEventIndicators(eventId) {
        getEventIndicators(eventId)
            .then(data => this.setState({ indicators: data.indicators, isLoadingIndicators: false }))
    }

    fetchParticipants(eventId) {
        getParticipations(eventId)
            .then(res => {
                let participants = []
                let maxLength = res.data.participations.length;
                res.data.participations.map((participant, index) => {
                    getUserEvidence(eventId, participant.User.id)
                        .then(res => {
                            participant.evidence = res.values
                            participants.push(participant)

                            if (index === maxLength - 1) {
                                this.setState({ participants: participants, isLoadingParticipants: false })
                            }
                        })
                })
            })
    }

    renderIndicatorTableHeaders() {
        let headers = []
        for (let i = 0; i < this.state.indicators.length; i++) {
            let indicator = this.state.indicators[i]
            let indicatorLetter
            switch (i) {
                case 0: indicatorLetter = "A"
                    break;
                case 1: indicatorLetter = "B"
                    break;
                case 2: indicatorLetter = "C"
                    break;
                case 3: indicatorLetter = "D"
                    break;
                default: indicatorLetter = "Z"
                    break;
            }
            for (let j = 0; j < indicator.indicators.length; j++) {
                let subIndicator = indicator.indicators[j]
                let cellName = `${indicatorLetter}${j + 1}`
                let cell = <TableCell style={(j % 2 == 0 ? {backgroundColor:'lightgray'} : {})}
                    key={`${i}-${j}`}
                    align="left"
                    // onMouseEnter={() => this.handleHeaderHover(cellName, indicator.name, subIndicator)}
                    onMouseEnter={() => this.setState({ currentIndicator: `${cellName} ${indicator.name} - ${subIndicator.name}. ${subIndicator.type}` })}
                >{cellName}</TableCell>
                headers.push(cell)
            }

        }
        return headers
    }

    renderParticipantTableRows() {
        return this.state.participants.map((participant, index) => (
            <TableRow key={index} style={(index % 2 == 0 ? {backgroundColor:'lightgray'} : {})}>
                <TableCell align="left">{`${participant.User.firstName} ${participant.User.lastName}`}</TableCell>
                <TableCell align="left">{participant.User.country}</TableCell>
                {this.renderIndicatorTableRows(participant)}
            </TableRow>
        ))
    }

    renderIndicatorTableRows(participant) {
        let eventId = this.props.match.params.eventId
        let loggedInUserId
        let index = 0
        let cells = []

        if (this.props.user) {
            loggedInUserId = this.props.user.id
        } else {
            loggedInUserId = 2 // FOR DEV PURPOSES
        }

        for (let i = 0; i < this.state.indicators.length; i++) {

            for (let j = 0; j < this.state.indicators[i].indicators.length; j++) {

                let isChecked = false;
                let hasEvidences = false;

                for (let k = 0; k < (participant.evidence ? participant.evidence.length : 0); k++) {
                    if (participant.evidence[k].index === index) {
                        isChecked = participant.evidence[k].checked
                        hasEvidences = true;
                    }
                }

                let cell = (<TableCell align="left" key={index} style={index % 2 === 0 ? {backgroundColor:'lightgray'} : {}}>
                    {/* //{hasEvidences ? '**' : ''} */}
                    <Checkbox
                        checked={isChecked}
                        style={(hasEvidences) ? { backgroundColor: 'burlywood', borderColor: 'red' } : {}}
                        onChange={this.handleDialogOpen(index, participant, loggedInUserId)}
                        value={`${index}`}
                    />
                </TableCell>)

                cells.push(cell)
                index++
            }
        }

        return cells
    }

    handleEvidenceTextFieldChange = event => {
        this.setState({
         currentEvidence: event.target.value 
        })}
    handleEvidenceCheckedChange = event => this.setState({ currentChecked: event.target.checked })

    handleDialogClose = () => this.setState({ isDialogOpen: false, currentPayload: {}, currentParticipant: null })

    handleDialogOpen = (index, participant, loggedInUserId) => event => {

        let currentPayload = {
            userId: participant.User.id,
            eventId: this.state.eventId,
            values: participant.evidence,
            index: index
        }
        this.setState({
            isDialogOpen: true,
            currentParticipant: participant,
            currentPayload
        })
    };

    handleEvidenceSend(e) {
        if (!this.state.currentEvidence || this.state.currentEvidence.length < 3) {
            e.preventDefault()
            this.setState({
                isErrorSnackbarOpen: true,
                errorSnackbarMessage: `Evidence is required.`
            });
            return;
        }
        let participants = this.state.participants.map(participant => {
            if (participant.User.id === this.state.currentParticipant.User.id) {
                let value;
                if (this.state.currentPayload.values) {
                    this.state.currentPayload.values.map(val => {
                        if (val.index === this.state.currentPayload.index) {
                            value = val;
                        }
                    })
                }

                let newPayloadValue = {
                    index: this.state.currentPayload.index,
                    checked: this.state.currentChecked,
                    evidences: []
                }
                if (!value) { value = newPayloadValue }


                if (value.evidences) value.evidences.map(evi => newPayloadValue.evidences.push(evi))
                newPayloadValue.evidences.push({
                    reportingUser: this.state.loggedInUserId || ((this.state.currentChecked ? '[X] ' : '') + "firstName (country)") ,
                    description: this.state.currentEvidence
                })

                let newPayload = { ...this.state.currentPayload }

                if (!newPayload.values) {
                    newPayload.values = []
                    newPayload.values.push(newPayloadValue)
                } else {
                    let exists = false;
                    newPayload.values = newPayload.values.map(val => {
                        if (val.index === value.index) {
                            exists = true;
                            return newPayloadValue
                        }
                        return val;
                    })
                    if (!exists) {
                        newPayload.values.push(newPayloadValue)
                    }
                }

                setUserEvidence(this.state.eventId, participant.User.id, newPayload)
                this.setState({ currentPayload: newPayload })

                participant.evidence = newPayload.values
                
                return participant
            }
            return participant
        })
        this.setState({ participants, currentChecked: false, currentEvidence: "" })

        this.handleDialogClose()
    }

    handleEvidenceTextFieldChange = event => {
        // let payload = {...this.state.currentPayload}
        // let exists = false
        // payload.values = payload.values.map(evi => {
        //     if (evi.index === payload.index) {
        //         exists = true
        //         evi.description = event.target.value;
        //     }
        //     return evi
        // })

        // if (!exists) {
        //     payload.values.push({
        //         index: payload.index,
        //         checked: false,
        //         evidences: [{
        //             description: event.target.value,
        //             reportingUser: this.loggedInUserId || 2 // for dev purposes
        //         }]
        //     })
        // }
        // this.setState({payload})
        this.setState({ currentEvidence: event.target.value })
    }

    render() {
        if (!this.props.user) {
            // console.log("USER IS NOT LOGGED IN");
            // this.props.history.push('/login');
        }

        if (this.state.isLoadingParticipants || this.state.isLoadingIndicators) return (<Spinner />)
        return (
            <div>
                <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Submit Evidence</DialogTitle>
                    <DialogTitle id="form-dialog-title">{`Submit evidence for: ${this.state.currentIndicator}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`In order to mark this indicator, please provide evidence that indicates that the participant has fullfiled the indicator`}
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="evidence"
                            label="Evidence"
                            type="text"
                            fullWidth
                            multiline
                            rowsMax="4"
                            onChange={this.handleEvidenceTextFieldChange}
                        />
                        Mark as completed:
                        <Checkbox
                            id="checked"
                            onChange={this.handleEvidenceCheckedChange}
                        />
                        {this.state.currentPayload.values &&
                         this.state.currentPayload.values.filter(val1 => val1.index === this.state.currentPayload.index).length > 0 ?
                            <Typography variant="h6">Previous evidences:</Typography> : ''}
                        {this.state.currentPayload.values &&
                         this.state.currentPayload.values.map(val => {
                            if (val.index === this.state.currentPayload.index) {
                                return val.evidences.map(evi => {
                                    console.log(evi);
                                    console.log(this.state.currentPayload.values.filter(val => val.index === 0).length);
                                    return (<Typography variant="h7">* {evi.reportingUser}: {evi.description}</Typography>)
                                })
                            }
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEvidenceSend} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid item xs={12}>
                    <Typography variant="h5"> {`Programme Director's Planning and Evaluation Form`} </Typography>
                    <Typography variant="h6"> {this.state.currentIndicator} </Typography >
                    <div>
                    </div>
                    <br />
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Full Name</TableCell>
                                    <TableCell align="left">Country</TableCell>
                                    {this.renderIndicatorTableHeaders()}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderParticipantTableRows()}
                            </TableBody>
                        </Table>
                    </Paper>
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

export default connect(mapStateToProps)(withStyles(styles)(Pdpef));