/**
 * Created by ItayAnkri on 12/22/2018.
 */

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
import {
    signIn,
    setUser
} from '../../actions/loginActions';

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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({setUser}, dispatch);
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    onTextFieldChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit() {
        signIn(this.state.username, this.state.password)
            .then(res => {
                this.props.setUser(res.data);
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({errorMessage: `Login Failure - ${err}`});
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
                                    Login
                                </Typography>
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
                                <br/>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    className={classes.textField}
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.password}
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
                                    size="medium"
                                    onClick={this.onSubmit}
                                >
                                    Login
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Login));
