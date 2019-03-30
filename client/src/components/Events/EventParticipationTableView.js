import React from 'react';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import {
    Paper,
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography,
} from '@material-ui/core';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from "@material-ui/core/IconButton";
import Spinner from "./Events";
import {approveParticipation, declineParticipation} from '../../actions/eventsActions';
import ErrorSnackbar from "../common/ErrorSnackbar";
import SuccessSnackbar from "../common/SuccessSnackbar";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
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
        marginTop: theme.spacing.unit * 2.5
    },
});

class EventParticipationsTabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccessSnackbarOpen: false,
            successSnackbarOpen: "",
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.onApprove = this.onApprove.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    handleChange(participationId, event) {
        this.props.onParticipationRoleChange(participationId, event.target.value);
    };

    handleErrorSnackbarClose = event => {
        this.setState({isErrorSnackbarOpen: false})
    };

    handleSuccessSnackbarClose = event => {
        this.setState({isSuccessSnackbarOpen: false})
    };

    onApprove(participationIndex) {
        console.log(this.props.event.participations)
        approveParticipation(this.props.event.participations[participationIndex].eventId,
                             this.props.event.participations[participationIndex].User.id,
                             this.props.event.participations[participationIndex].roleId)
            .then(res => {
                this.props.refreshEvent();
            })
            .then(() => {
                this.setState({
                    isSuccessSnackbarOpen: true,
                    successSnackbarOpen: `Participation approved successfully`,
                })
            })
            .catch(err => {
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to approve participation - ${err}`,
                })
            })
    }

    onDecline(participationIndex) {
        declineParticipation(this.props.event.participations[participationIndex].eventId,
                             this.props.event.participations[participationIndex].User.id,
                             this.props.event.participations[participationIndex].roleId)
            .then(res => {
                this.props.refreshEvent();
            })
            .then(() => {
                this.setState({
                    isSuccessSnackbarOpen: true,
                    successSnackbarOpen: `Participation declined successfully`,
                })
            })
            .catch(err => {
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to decline participation - ${err}`,
                })
            })
    }

    render() {
        const {classes} = this.props;

        if (!this.props.event) {
            return (
                <Spinner/>
            );
        }

        return (
            <div>
                <br/>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.event.participations.map((row, key) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        className={classNames(classes.tableRow, classes.tableRowHover)}
                                    >
                                        <TableCell align="center">
                                            {row.User.firstName} {row.User.middleName || ""} {row.User.lastName}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                        >
                                            <Select
                                                value={row.roleId}
                                                onChange={event => this.handleChange(key, event)}
                                                input={
                                                    <OutlinedInput
                                                        labelWidth={this.state.labelWidth}
                                                        name="roleId"
                                                    />
                                                }
                                            >
                                                <MenuItem value={row.roleId}>
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Role 1</MenuItem>
                                                <MenuItem value={2}>Role 2</MenuItem>
                                                <MenuItem value={3}>Role 3</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell align="center">{row.status}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => this.onApprove(key)}
                                            >
                                                <CheckIcon/>
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                size="small"
                                                onClick={() => this.onDecline(key)}
                                            >
                                                <BlockIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <SuccessSnackbar
                    open={this.state.isSuccessSnackbarOpen}
                    handleClose={this.handleSuccessSnackbarClose}
                    message={this.state.successSnackbarMessage}
                />
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
            </div>
        );
    }
}

export default withStyles(styles)(EventParticipationsTabView);