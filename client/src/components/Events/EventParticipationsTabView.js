import React from 'react';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        fontSize: 16
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class EventParticipationsTabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            roleId: 0
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <br/>
                <Typography variant="h6">Participation</Typography>
                <br/>
                {
                    this.props.event.participations.map(participation => (
                        <div key={participation.id}>
                            <br/>
                            <Typography><b>{`${participation.User.firstName} ${participation.User.lastName}:`}</b></Typography>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-role-simple"
                                >
                                    Role
                                </InputLabel>
                                <Select
                                    value={this.state.roleId}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="roleId"
                                            id="outlined-role-simple"
                                        />
                                    }
                                >
                                    <MenuItem value={participation.roleId}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Role 1</MenuItem>
                                    <MenuItem value={2}>Role 2</MenuItem>
                                    <MenuItem value={3}>Role 3</MenuItem>
                                </Select>
                            </FormControl>
                            <Chip label="Pending" className={classes.chip}/>
                            {/*<Typography>{JSON.stringify(participation)}</Typography>*/}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default withStyles(styles)(EventParticipationsTabView);