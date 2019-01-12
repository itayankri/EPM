import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Grid,
    MenuItem
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

const DropDownInput = ({label, value, options, onChange, name, classes}) => {
    const selectOptions = [
        {
            value: 0,
            label: "Select " + label
        },
        ...options
    ];

    return (
        <Grid container>
            <Grid item md={4}>
                <Typography variant="h6" className={classes.label}>
                    <b>{label}:</b>
                </Typography>
            </Grid>
            <Grid item md={8}>
                <TextField
                    select
                    name={name}
                    margin="normal"
                    variant="outlined"
                    type="date"
                    value={value || 0}
                    className={classes.textField}
                    onChange={onChange}
                >
                    {
                        selectOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Grid>
        </Grid>
    )
};

export default withStyles(styles, {withTheme: true})(DropDownInput);