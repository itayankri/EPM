import { connect } from 'react-redux';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getParticipations, getEventIndicators } from "../../actions/eventsActions";
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
});

class Pdpef extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventId: this.props.match.params.eventId,
            isLoading: true,
            participants: [],
            tableRows: [
                { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
                { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
                { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
                { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
            ],
            pdpefGoals: [
                {
                    title: 'Goal 1',
                    id: 'goal1',
                    isChecked: true,
                    isApproved: false,
                    leadersDescription: ''
                },
                {
                    title: 'Goal 2',
                    id: 'goal2',
                    isChecked: false,
                    isApproved: false,
                    leadersDescription: ''
                },
                {
                    title: 'Goal 3',
                    id: 'goal3',
                    isChecked: false,
                    isApproved: false,
                    leadersDescription: ''
                },
            ]
        };
    }

    componentWillMount() {
        this.setState({ tableRows: [ ...this.state.tableRows, ...this.convertGoals(this.state.pdpefGoals, "header") ] })
        // getParticipations(this.state.eventId)
        console.log(getEventIndicators(this.state.eventId))
            // .then(res => res.data.participations)
            // .then(participants => {
            //     // MAKE SURE TO ADD ID AND PDPEF DATA TO PARTICIPANTS, DID NOT GET THEM IN THE REQUEST!
            //     for (let i = 0; i < participants.length; i++) {
            //         participants[i] = { ...participants[i], id: i + 1, pdpef: this.state.pdpefGoals }
            //     }
            //     this.setState({
            //         isLoading: false,
            //         participants
            //     })
            // })
    }
    
    convertGoals(goals, type, participantId){
        if(type === "header"){
            
            return goals.map(goal => {
                return { id: goal.id, numeric: false, disablePadding: false, label: goal.title }
            })

        } else if(type === "cell"){
            
            let participant = this.state.participants.filter(participant => participant.id === participantId)[0]
            
            return goals.map(goal => {
                
                return (<TableCell align="left">
                            <Checkbox
                                checked={participant.pdpef.filter(participantGoal => participantGoal.id === goal.id)[0].isChecked}
                                onChange={this.handleChange(participantId, goal.id)}
                                color="primary"
                                participantId={participantId}
                            />
                        </TableCell>)
            })
        }
    }

    handleChange = (participantId, goalId) => event => {
        this.updateParticipantGoal(participantId, goalId)
        
    };

    updateParticipantGoal(participantId, goalId) {
        let participantsCopy = [...this.state.participants]
        let participant = participantsCopy.filter(participant => participant.id === participantId)[0]
        let goal = participant.pdpef.filter(participantGoal => participantGoal.id === goalId)[0]
        console.log(goal)
        goal.isChecked = !goal.ischecked
        console.log(goal)
        this.setState({ participants: participantsCopy })
        // this.setState({ [name]: event.target.checked });
    }

    render() {
        if (!this.props.user) {
            console.log("USER IS NOT LOGGED IN");
            // this.props.history.push('/login');
        }

        if (this.state.isLoading) return (<Spinner />)
        return (
        <Grid item xs={12}>
                <Typography variant="h6">
                    {`Programme Director's Planning and Evaluation Form`}
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.state.tableRows.map(column => (
                                    <TableCell align="left">{column.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.participants.map((participant, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{participant.User.firstName}</TableCell>
                                <TableCell align="left">{participant.User.lastName}</TableCell>
                                <TableCell align="left">{participant.User.gender ? "Male" : "Female"}</TableCell>
                                <TableCell align="left">{participant.User.country}</TableCell>
                                {this.convertGoals(this.state.pdpefGoals, "cell", participant.id)}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        )
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Pdpef));