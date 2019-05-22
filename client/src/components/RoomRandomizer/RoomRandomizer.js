import { connect } from 'react-redux';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getParticipations, randomizeParticipants } from "../../actions/eventsActions";
import Spinner from "../common/Spinner";
import EnhancedTable from './EnhancedTable'
import SwitchesGroup from './SwitchesGroup'
import SimpleTable from './SimpleTable'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

class RoomRandomizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventId: this.props.match.params.eventId,
            isLoading: true,
            isRandomized: false,
            participants: [],
            tableRows: [
                { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
                { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
                { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
                { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
                { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
            ],
            participantIdsToRandomize: [],
            seperators: { gender: true, country: true },
            randomizedRooms: [],
        };
        this.addParticipantToRandomize = this.addParticipantToRandomize.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.randomizeParticipants = this.randomizeParticipants.bind(this);
        this.resetRandomizer = this.resetRandomizer.bind(this);
    }

    componentWillMount() {
        getParticipations(this.state.eventId)
            .then(res => res.data.participations)
            .then(participants => {
                // MAKE SURE TO ADD ID TO PARTICIPANTS, DID NOT GET THEM IN THE REQUEST!
                for (let i = 0; i < participants.length; i++) {
                    participants[i] = { ...participants[i], id: i + 1 }
                }
                this.setState({
                    isLoading: false,
                    participants
                })
            })
    }

    addParticipantToRandomize(id) {
        console.log(id)
        const { participantIdsToRandomize } = this.state
        let selectedId = participantIdsToRandomize.indexOf(id)
        let newParticipantsToRandomize = []

        if (selectedId === -1) {
            newParticipantsToRandomize = newParticipantsToRandomize.concat(participantIdsToRandomize, id);
        } else if (selectedId === 0) {
            newParticipantsToRandomize = newParticipantsToRandomize.concat(participantIdsToRandomize.slice(1));
        } else if (selectedId === participantIdsToRandomize.length - 1) {
            newParticipantsToRandomize = newParticipantsToRandomize.concat(participantIdsToRandomize.slice(0, -1));
        } else if (selectedId > 0) {
            newParticipantsToRandomize = newParticipantsToRandomize.concat(
                participantIdsToRandomize.slice(0, selectedId),
                participantIdsToRandomize.slice(selectedId + 1),
            );
        }

        this.setState({ participantIdsToRandomize: newParticipantsToRandomize });
    }


    handleSwitchChange = name => event => {
        this.setState({ seperators: { ...this.state.seperators, [name]: event.target.checked } })
    }

    randomizeParticipants() {
        let payload = {
            participants: [],
            separateBy: [],
            rooms: 3
        }

        for (let i = 0; i < this.state.participantIdsToRandomize.length; i++) {
            let participantToRandomize = this.state.participants.find(participant => participant.id === this.state.participantIdsToRandomize[i])
            payload.participants.push(participantToRandomize)
        }

        if (this.state.seperators.country) payload.separateBy.push("country")
        if (this.state.seperators.gender) payload.separateBy.push("gender")

        randomizeParticipants(this.state.eventId, payload)
            .then(randomizedRooms => {
                this.setState({ randomizedRooms: randomizedRooms.rooms, isRandomized: true }
                )})
    }

    translateParticipantRoleId(roleId) {
        switch (roleId) {
            case 1: return "Participant"
            case 2: return "Leader"
            case 3: return "Kitchen Staff"
            case 4: return "Director"
            case 5: return "International Staff"
            case 6: return "Staff"
            case 7: return "Junior Counsellor"
            case 8: return "Staff baby"
            case 9: return "Donor"
            case 10: return "Junior Staff"
            case 11: return "Speaker"
            case 12: return "Junior Leader"
            case 13: return "Host Family"
            case 14: return "Chapter Support"
            case 15: return "Observer"
            case 16: return "Independent Participant"
            case 17: return "Activity Administrator"
            case 18: return "Trustee"
            case 19: return "Committee Member"
            case 20: return "Committee Chair"
            case 21: return "Local Interchange coordinator"
            case 22: return "National Interchange Coordinator"
            case 23: return "Trainer"
            case 24: return "RTF Coordinator"
            default: return "Participant"
        }
    }

    renderRandomizedTables() {
        return (
            Object.values(this.state.randomizedRooms).map((room, index) => {
                if (room.length > 0) {
                    return (
                        // change the "Room Number" key in the returned object of roomRandomizer to "number"
                        <Grid item xs={12} key={index}>
                                <Typography variant="h6">
                                    {`Room Number ${index + 1}`}
                                </Typography>
                                <SimpleTable
                                    columns={this.state.tableRows}
                                    data={room}
                                    translateParticipantRoleId={this.translateParticipantRoleId}
                                />
                                <br/>
                        </Grid>
                    )
                } else {
                    return (<br></br>);
                }
            })
        )
    }

    resetRandomizer() {
        this.setState({ 
            isRandomized: false,
            participantIdsToRandomize: [], })
    }

    render() {
        if (!this.props.user) {
            console.log("USER IS NOT LOGGED IN");
            // this.props.history.push('/login');
        }

        if (this.state.isLoading) return (<Spinner />)
        if (!this.state.isRandomized) {
            return (
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <EnhancedTable
                            columns={this.state.tableRows}
                            data={this.state.participants}
                            tableTitle='Participants To Randomize'
                            addParticipantToRandomize={this.addParticipantToRandomize}
                            translateParticipantRoleId={this.translateParticipantRoleId}
                        />
                        </Grid>
                    <Grid item xs={12}
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <SwitchesGroup
                            handleChange={this.handleSwitchChange}
                            gender={this.state.seperators.gender}
                            country={this.state.seperators.country}
                        />
                        <Button variant="contained" color="primary" onClick={this.randomizeParticipants}>
                            Randomize
                        </Button>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            {this.renderRandomizedTables()}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.resetRandomizer}>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}
export default connect(mapStateToProps)(withStyles(styles)(RoomRandomizer));