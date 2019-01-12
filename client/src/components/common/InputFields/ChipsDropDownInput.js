import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
    ListItemText,
    Checkbox,
    Grid,
    MenuItem, Input, Chip, Select
} from "@material-ui/core";

const styles = theme => ({
    select: {
        marginTop: 15,
        height: 40,
        width: 400,
        backgroundColor: 'white'
    },
    label: {
        margin: 17
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(value, na, that) {
    return {
        fontWeight:
            value.indexOf(na) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class ChipsDropDownInput extends React.Component {
    render() {
        let {label, value, items, handleChange, name, classes} = this.props;
        return (
            <Grid container>
                <Grid item md={4}>
                    <Typography variant="h6" className={classes.label}>
                        <b>{label}:</b>
                    </Typography>
                </Grid>
                <Grid item md={8}>
                    <Select
                        name={name}
                        multiple
                        value={value}
                        variant="outlined"
                        className={classes.select}
                        onChange={handleChange}
                        input={<Input variant="outlined" id="select-multiple-chip"/>}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip}/>
                                ))}
                            </div>
                        )}
                        MenuProps={
                            {
                                PaperProps: {
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                        width: 250,
                                    },
                                },
                            }
                        }
                    >
                        {items.map(item => (
                            <MenuItem key={item} value={item} style={getStyles(value, item, this)}>
                                <Checkbox checked={value.indexOf(item) > -1} />
                                <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        )
    };
}

export default withStyles(styles, {withTheme: true})(ChipsDropDownInput);