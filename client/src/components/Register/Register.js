/**
 * Created by ItayAnkri on 12/22/2018.
 */

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
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
import {signUp} from '../../actions/loginActions';

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
            errorMessage: "",
            showPassword: false,
            showPasswordAgain: false,
            fullName: "",
            email: "",
            dateOfBirth: "",
            password: "",
            passwordAgain: ""
        };

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleClickShowPasswordAgain = this.handleClickShowPasswordAgain.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleClickShowPasswordAgain() {
        this.setState({showPasswordAgain: !this.state.showPasswordAgain});
    }

    onTextFieldChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit() {
        signUp({
            fullName: this.state.fullName,
            email: this.state.email,
            dateOfBirth: this.state.dateOfBirth,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain
        })
            .then(res => {
                this.props.match.params.history.push('/');
            })
            .catch(err => {
                this.setState({errorMessage: `Registration Failure - ${err}`});
            })
    }

    render() {
        let {classes} = this.props;
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
                                    name="fullName"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.fullName}
                                    onChange={this.onTextFieldChange}
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
                                    value={this.state.email}
                                    onChange={this.onTextFieldChange}
                                />
                                <br/><br/>
                                <TextField
                                    id="date"
                                    name="dateOfBirth"
                                    label="Date of birth"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    variant="outlined"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.dateOfBirth}
                                    onChange={this.onTextFieldChange}
                                />
                                <br/>
                                <TextField
                                    fullWidth
                                    id="outlined-password-input"
                                    name="password"
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
                                    value={this.state.password}
                                    onChange={this.onTextFieldChange}
                                />
                                <TextField
                                    fullWidth
                                    id="outlined-password-input"
                                    name="passwordAgain"
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
                                    value={this.state.passwordAgain}
                                    onChange={this.onTextFieldChange}
                                />
                                {
                                    this.state.errorMessage &&
                                    <Typography color="error">
                                        {this.state.errorMessage}
                                    </Typography>
                                }
                            </CardContent>
                            <Divider/>
                            <CardActions>
                                <Button
                                    size="normal"
                                    onClick={this.onSubmit}
                                >
                                    Submit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Register);