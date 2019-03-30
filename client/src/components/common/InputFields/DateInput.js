import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Grid,
} from "@material-ui/core";

const styles = theme => ({
    textField: {
        height: 40,
        width: 400,
        backgroundColor: 'white'
    },
    label: {
        margin: 17
    }
});

const DateInput = ({label, time, value, onChange, name, classes}) => {
    return (
        <Grid container>
            <Grid item md={4}>
                <Typography variant="h6" className={classes.label}>
                    <b>{label}:</b>
                </Typography>
            </Grid>
            <Grid item md={8}>
                <TextField
                    name={name}
                    margin="normal"
                    variant="outlined"
                    type={time ? "datetime-local" : "date"}
                    value={value}
                    className={classes.textField}
                    onChange={onChange}
                />
            </Grid>
        </Grid>
    )
};

export default withStyles(styles, {withTheme: true})(DateInput);