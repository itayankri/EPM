/**
 * Created by ItayAnkri on 12/23/2018.
 */

import React from 'react';
import {connect} from 'react-redux';
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
import Spinner from "../common/Spinner";

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

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user,
    }
};

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            isLoading: true,
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            isAdmin: this.props.user && this.props.user.isAdmin,
        }
    }

    componentWillMount() {
        getEvents()
            .then(res => {
                console.log(res.data)
                this.setState({
                    isLoading: false,
                    events: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load Events - ${err}`,
                })
            });
    }

    onRowClick = rowId => {
        this.props.history.push(`/events/${rowId}`);
    };

    render() {

        if (this.state.isLoading) {
            return (
                <Spinner/>
            );
        }

        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item md={10}>
                        <Typography variant="h4" component="h2">
                            Events Management
                        </Typography>
                    </Grid>
                    {
                        this.state.isAdmin &&
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
                    }
                    <Grid item md={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Theme</TableCell>
                                        <TableCell align="center">Code</TableCell>
                                        <TableCell align="center">Year</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">NA</TableCell>
                                        <TableCell align="center">Chapter</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.events.map(row => {
                                        return (
                                            <TableRow
                                                key={row.id}
                                                className={this.props.isUserLoggedIn && classNames(classes.tableRow, classes.tableRowHover)}
                                                onClick={this.props.isUserLoggedIn ? () => this.onRowClick(row.id): () => {}}
                                            >
                                                <TableCell component="th" scope="row">{row.theme}</TableCell>
                                                <TableCell align="center">{row.code}</TableCell>
                                                <TableCell
                                                    align="center">{new Date(row.start).getFullYear()}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">{row.country}</TableCell>
                                                <TableCell align="center">{row.chapter}</TableCell>
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

export default connect(mapStateToProps)(withStyles(styles)(Events));