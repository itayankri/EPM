/**
 * Created by ItayAnkri on 12/23/2018.
 */

import React from 'react';
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
    button: {
        position: 'absolute',
        right: 20,
        top: 15,
    }
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
    render() {
        const {classes} = this.props;
        console.log("Events render", this.props);
        return (
            <Grid container spacing={24}>
                <Grid item md="10" className={classes}>
                    <Typography variant="h4" component="h2">
                        Event Management
                    </Typography>
                </Grid>
                <Grid item md="2">
                    <Button
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                    >
                        Create Event
                    </Button>
                </Grid>
                <Grid item md="12">
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className={classNames(classes.tableRow, classes.tableRowHover)}>
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
                                        <TableRow key={row.id}>
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
        );
    }
}

export default withStyles(styles)(Events);