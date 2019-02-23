/**
 * Created by ItayAnkri on 12/23/2018.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {
    Paper,
    Grid,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import {getEvents} from "../../actions/eventsActions";
import ErrorSnackbar from "../common/ErrorSnackbar";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    noClick: {
        cursor: 'initial',
    },
    link: {
        textDecoration: 'none'
    },
});

let id = 0;

function createData(name, participants, date, budget, rate) {
    id += 1;
    return {id, name, participants, date, budget, rate};
}

const rows = [
    createData('Summer Camp', 220, '13/11/2018', 24000, 4.0),
    createData('Meetup', 237, '4/7/2018', 37000, 9.3),
    createData('Volunteer Event', 262, '15/1/2018', 24000, 6.0),
    createData('Cisv Party', 305, '1/12/2018', 67000, 7.3),
];

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            isLoading: true,
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
        }
    }

    componentWillMount() {
        getEvents()
            .then(res => {
                this.setState({
                    isLoading: false,
                    events: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load Events - ${err}`,
                })
            });
    }

    handleErrorSnackbarClose = event => {
        this.setState({isErrorSnackbarOpen: false})
    };

    handleSuccessSnackbarClose = event => {
        this.setState({isSuccessSnackbarOpen: false})
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item md={10}>
                        <Typography variant="h4" component="h2">
                            Events Management
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Link
                            to="/events/create"
                            className={classes.link}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                            >
                                Create Event
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item md={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event Name</TableCell>
                                        <TableCell align="right">Participants</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Budget</TableCell>
                                        <TableCell align="right">Rate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => {
                                        return (
                                            <TableRow key={row.id}
                                                      className={classNames(classes.tableRow, classes.tableRowHover)}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.participants}</TableCell>
                                                <TableCell align="right">{row.date}</TableCell>
                                                <TableCell align="right">{row.budget}</TableCell>
                                                <TableCell align="right">{row.rate}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Events);