import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { downloadForm } from '../../actions/eventsActions';
import { connect } from 'react-redux';
import Back from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ErrorSnackbar from "../common/ErrorSnackbar";
import { getEvent, getCampShopItems } from "../../actions/eventsActions";
import {
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    CardMedia,
    CardActionArea,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import Spinner from "../common/Spinner";

import health_form_pic from "../../static/images/health_form.png";
import legal_form_pic from "../../static/images/legal_form.png";
import incident_report_pic from "../../static/images/incident_report.png";

const styles = ({
    card: {
        width: 250,
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
    media: {
        height: 150,
        width: 150,
        margin: '25px 50px'
    },
    link: {
        textDecoration: 'none'
    }
});

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user
    }
};

class CampShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingItems: true,
            isLoadingEvent: true,
            event: '',
            eventId: (this.props.location.pathname.split("/")[2]),
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            items: [],
        }
    }

    componentWillMount() {
        getCampShopItems(this.state.eventId)
            .then(res => {
                console.log(res.data)
                this.setState({
                    isLoadingItems: false,
                    items: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isLoadingItems: false,
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load items - ${err}`,
                })
            });

        getEvent(this.state.eventId)
            .then(res => {
                this.setState({
                    isLoadingEvent: false,
                    event: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isLoadingEvent: false,
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load Event - ${err}`,
                })
            });
    }

    render() {
        // if (!this.props.user) {
        //     console.log("USER IS NOT LOGGED IN");
        //     this.props.history.push('/login');
        // }
        if (this.state.isLoadingEvent || this.state.isLoadingItems) {
            return (
                <Spinner />
            );
        }
        let { classes } = this.props;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item md={10}>
                        <Typography variant="h4" component="h2">
                            Camp Shop
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Link
                            to="/events/create"
                            className={classes.link}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                            >
                                Add Item
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item md={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: 'blanchedalmond' }}>
                                            Country
                                    </TableCell>
                                        <TableCell style={{ backgroundColor: 'blanchedalmond' }}>
                                            Name
                                    </TableCell>
                                        {this.state.items.map(row => {
                                            console.log(row);
                                            return (
                                                <TableCell align="center">
                                                    {row.name} ({row.quantity})
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { this.state.event.participations.map(row => {
                                        return (
                                            <TableRow
                                                key={row.id}
                                                className={classNames(classes.tableRow, classes.tableRowHover)}
                                                onClick={() => this.onRowClick(row.id)}
                                            >
                                                <TableCell align="center">{row.User.firstName} {row.User.lastName}</TableCell>
                                                <TableCell align="center">{row.User.country}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {
                                        
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CampShop));