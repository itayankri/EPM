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
import {getEvents} from '../../actions/eventsActions';

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
            isLoading: true
        }
    }

    componentDidMount() {
        getEvents().then(result => {
            if (result instanceof Array) {
                this.setState({
                    events: result,
                    isLoading: false
                })
            }

            console.log('Result', result)
        });
    }

    onRowClick = id => {
        this.props.history.push(`/events/${id}`);
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                {
                    this.state.events.length === 0 ? <Typography>Loading Events</Typography>
                        :
                        <Grid container spacing={8}>
                            <Grid item md={10}>
                                <Typography variant="h4" component="h2">
                                    Event Management
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
                                                <TableCell align="right">Start Date</TableCell>
                                                <TableCell align="right">End Date</TableCell>
                                                <TableCell align="right">Country</TableCell>
                                                <TableCell align="right">Chapter</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.events.map(event => {
                                                return (
                                                    <TableRow
                                                        key={event.id}
                                                        className={classNames(classes.tableRow, classes.tableRowHover)}
                                                        onClick={() => this.onRowClick(event.id)}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {event.name}
                                                        </TableCell>
                                                        <TableCell align="right">{event.start}</TableCell>
                                                        <TableCell align="right">{event.end}</TableCell>
                                                        <TableCell align="right">{event.country}</TableCell>
                                                        <TableCell align="right">{event.chapter}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Events);