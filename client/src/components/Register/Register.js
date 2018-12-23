/**
 * Created by ItayAnkri on 12/22/2018.
 */

import React from 'react';
import {withStyles} from 'react-with-styles';
import {
    Typography,
    Card,
    CardActions,
    CardContent,
    Button,
    Divider,
    Grid,
    TextField
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            showPasswordAgain: false
        };

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleClickShowPasswordAgain = this.handleClickShowPasswordAgain.bind(this);
    }

    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleClickShowPasswordAgain() {
        this.setState({showPasswordAgain: !this.state.showPasswordAgain});
    }

    render() {
        let classes = this.props.styles;
        return (
            <div>
                <Grid container>
                    <Grid item md={3}/>
                    <Grid item md={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h4" component="h2">
                                    Registration
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-name-input"
                                    label="Full Name"
                                    className={classes.textField}
                                    type="text"
                                    name="name"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <br/>
                                <TextField
                                    fullWidth
                                    id="outlined-email-input"
                                    label="Email"
                                    className={classes.textField}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <br/><br/>
                                <TextField
                                    id="date"
                                    label="Date of birth"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    variant="outlined"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br/>
                                <TextField
                                    fullWidth
                                    id="outlined-password-input"
                                    label="Password"
                                    className={classes.textField}
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                >
                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    id="outlined-password-input"
                                    label="Password again"
                                    className={classes.textField}
                                    type={this.state.showPasswordAgain ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPasswordAgain}
                                                >
                                                    {this.state.showPasswordAgain ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </CardContent>
                            <Divider/>
                            <CardActions>
                                <Button size="normal">Submit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Register);