import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function MyTable(props) {
    const { coloredColumns, columnsColor, otherColumns, data, classes, innerCellMethod } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {coloredColumns.map(col => {
                            return (
                                <TableCell key={col} align="center" style={{ backgroundColor: columnsColor }}>
                                {col}
                                </TableCell>
                            )
                        })
                        }
                        {Object.keys(otherColumns).sort().map(row => {
                            return (
                                <TableCell key={row} align="center">
                                    {row} ({otherColumns[row]})
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => {
                        return (
                            <TableRow
                                key={row.id}
                                className={classNames(classes.tableRow, classes.tableRowHover)}
                            >
                                <TableCell align="center">{row.User.country}</TableCell>
                                <TableCell align="center">{row.User.firstName} {row.User.lastName}</TableCell>
                                {Object.keys(otherColumns).sort().map((item, index) => {
                                    return (
                                        <TableCell key={row.User.email + "_" + index} align="center">
                                            {innerCellMethod(row, item)}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

MyTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyTable);