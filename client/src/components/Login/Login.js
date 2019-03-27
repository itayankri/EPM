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
import {
    signIn
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        signIn(this.state.username, this.state.password)
            .then(res => {
                this.props.match.params.history.push('/');
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
                                    id="outlined-email-input"
                                    label="Email"
                                    className={classes.textField}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <br/>
                                <TextField
                                    fullWidth
                                    id="outlined-password-input"
                                    label="Password"
                                    className={classes.textField}
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
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

export default withStyles(styles, {withTheme: true})(Login);
