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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 2,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
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
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            birthday: "",
            password: "",
            passwordAgain: "",
            country: "",
            city: "",
            chapter: "",
            address: "",
            homeNumber: null,
            zipcode: null,
            gender: "male"
        };

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleClickShowPasswordAgain = this.handleClickShowPasswordAgain.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    }

    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleClickShowPasswordAgain() {
        this.setState({showPasswordAgain: !this.state.showPasswordAgain});
    }

    handleRadioButtonChange(event) {
        this.setState({gender: event.target.value})
    }

    onTextFieldChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit() {
        signUp({
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            email: this.state.email,
            birthday: this.state.birthday,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain,
            country: this.state.country,
            city: this.state.city,
            chapter: this.state.chapter,
            address: this.state.address,
            homeNumber: this.state.homeNumber,
            zipcode: this.state.zipcode,
            gender: this.state.gender === "male"
        })
            .then(res => {
                this.props.history.push('/');
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
                                <Grid container spacing={8}>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="First name"
                                            className={classes.textField}
                                            type="text"
                                            name="firstName"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.firstName}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="Middle name"
                                            className={classes.textField}
                                            type="text"
                                            name="middleName"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.middleName}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="Last name"
                                            className={classes.textField}
                                            type="text"
                                            name="lastName"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.lastName}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                </Grid>
                                <br/>
                                <TextField
                                    fullWidth
                                    name="birthday"
                                    label="Date of birth"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    variant="outlined"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.birthday}
                                    onChange={this.onTextFieldChange}
                                />
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        name="gender"
                                        className={classes.group}
                                        value={this.state.gender}
                                        onChange={this.handleRadioButtonChange}
                                        row
                                    >
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio color="primary"/>}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio color="primary"/>}
                                            label="Female"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    fullWidth
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
                                <Grid container spacing={8}>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="Country"
                                            className={classes.textField}
                                            type="text"
                                            name="country"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.country}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            className={classes.textField}
                                            type="text"
                                            name="city"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.city}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="Chapter"
                                            className={classes.textField}
                                            type="text"
                                            name="chapter"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.chapter}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={8}>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            className={classes.textField}
                                            type="text"
                                            name="address"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.address}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="Home number"
                                            className={classes.textField}
                                            type="number"
                                            name="homeNumber"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.homeNumber}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            label="Zipcode"
                                            className={classes.textField}
                                            type="number"
                                            name="zipcode"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.zipcode}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={8}>
                                    <Grid item md={6}>
                                        <TextField
                                            fullWidth
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
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={this.state.password}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            fullWidth
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
                                                            {this.state.showPasswordAgain ? <VisibilityOff/> :
                                                                <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={this.state.passwordAgain}
                                            onChange={this.onTextFieldChange}
                                        />
                                    </Grid>
                                </Grid>
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