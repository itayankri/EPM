import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        align: 'center'
    },
});

const Spinner = ({classes}) => {
    return (
        <div>
            <CircularProgress className={classes.progress} />
        </div>
    );
};

export default withStyles(styles)(Spinner);