/**
 * Created by ItayAnkri on 12/22/2018.
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import TextInput from '../common/InputFields/TextInput';
import { newItem } from "../../actions/eventsActions";
import ErrorSnackbar from '../common/ErrorSnackbar';
import SuccessSnackbar from '../common/SuccessSnackbar';
import Back from '@material-ui/icons/KeyboardBackspace';

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
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    actions: {
        margin: 5
    },
    link: {
        textDecoration: 'none'
    },
});

class CreateItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: "",
            end: "",
            eventType: 0,
            country: 0,
            chapter: 0,
            eventAddress: "",
            email: "",
            participatingNAs: [],
            eventTheme: "",
            meetingPointName: "",
            meetingPointAddress: "",
            meetingDate: "",
            nearestAirportName: "",
            nearestAirportCode: "",
            nearestTrainStation: "",
            arriveBefore: "",
            leaveAfter: "",
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            isSuccessSnackbarOpen: false,
            successSnackbarMessage: "",
            quantity: 0
        }
    }

    handleChipsChange = event => {
        this.setState({ participatingNAs: event.target.value });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        newItem(this.props.location.pathname.split('/')[2], this.state.name, this.state.quantity)
            .then(result => {
                this.setState({
                    isSuccessSnackbarOpen: true,
                    successSnackbarMessage: `${this.state.quantity}x ${result.data.name} have been added to the shop (Total: ${result.data.quantity} in stock)`,
                    name: "",
                    quantity: 0
                });
            })
            .catch(err => {
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: err.response.data.message || `Failed to create item - ${err}`
                });
            });
    };

    handleErrorSnackbarClose = event => {
        this.setState({ isErrorSnackbarOpen: false })
    };

    handleSuccessSnackbarClose = event => {
        this.setState({ isSuccessSnackbarOpen: false })
    };

    render() {
        let { classes } = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item md={9}>
                        <Button key={"back"} variant="contained" color="primary" className={classes.button} onClick={() => this.props.history.goBack()}>
                            <Back />Back
                        </Button>
                        <br />
                        <br />
                        <Typography variant="h4" component="h2">
                            Create Item
                        </Typography>
                        <br />
                        <TextInput
                            name="name"
                            label="Item Name"
                            size="small"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="quantity"
                            type="number"
                            label="Item Quantity"
                            size="small"
                            value={this.state.quantity}
                            onChange={this.handleChange}
                            inputProps={{ min: 0, max: 999 }}
                        />
                        <br />
                    </Grid>
                    <Grid container>
                        <Grid item md={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.actions}
                                onClick={this.onSubmit}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.actions}
                                onClick={(e) => { this.props.history.goBack() }}
                            >
                                Cancel
                                </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
                <SuccessSnackbar
                    open={this.state.isSuccessSnackbarOpen}
                    handleClose={this.handleSuccessSnackbarClose}
                    message={this.state.successSnackbarMessage}
                />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CreateItem);
