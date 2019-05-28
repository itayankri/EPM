import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Back from '@material-ui/icons/KeyboardBackspace';
import Add from '@material-ui/icons/Add'
import MyTable from './MyTable';
import { Link } from 'react-router-dom';
import ErrorSnackbar from "../common/ErrorSnackbar";
import { getEvent, getCampShopItems, getPurchases, purchaseItem, returnItem } from "../../actions/eventsActions";
import {
    Typography,
    Button,
    Grid,
} from '@material-ui/core';
import Spinner from "../common/Spinner";

const styles = theme => ({
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
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
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
            isLoadingPurchases: true,
            event: '',
            eventId: (this.props.location.pathname.split("/")[2]),
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            items: [],
            purchases: {},
        }
        this.generateCell = this.generateCell.bind(this);
    }

    disableKeyboard(e) {
        e.preventDefault();
    }

    handleErrorSnackbarClose = () => {
        this.setState({
            isErrorSnackbarOpen: false,
        })
    }

    handleChange(e, userId, itemName) {
        let newVal = parseInt(e.target.value);
        let previousValue = (this.state.purchases[userId] && this.state.purchases[userId][itemName]) || 0;

        let newPurchases = this.state.purchases;
        if (!newPurchases[userId])
            newPurchases[userId] = {}
        let newItems = this.state.items;
        let changed = false;
        let bought = true;

        if (newVal > previousValue) {
            // User bought an item 
            if (this.state.items[itemName] === 0) {
                e.target.value = previousValue;
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `There are no more '${itemName}' left.`
                });
            }
            else {
                newPurchases[userId][itemName] = newVal;
                newItems[itemName] = newItems[itemName] - 1;
                changed = true;
            }
        } else {
            if (newVal < 0) {
                e.target.value = previousValue;
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `You've returned too many '${itemName}'.`
                });
            } else {
                newPurchases[userId][itemName] = newVal;
                newItems[itemName] = newItems[itemName] + 1;
                changed = true;
                bought = false;
            }
        }

        if (changed) {
            if (bought) {
                console.log("about to purchase");
                purchaseItem(this.state.eventId, userId, itemName)
                    .then(this.setState({
                        items: newItems,
                        purchases: newPurchases
                    }))
                console.log("purchased");
            }
            else {
                console.log("about to return");
                returnItem(this.state.eventId, userId, itemName)
                    .then(this.setState({
                        items: newItems,
                        purchases: newPurchases
                    }))
                console.log("returned");
            }
        }
    }

    componentWillMount() {
        getCampShopItems(this.state.eventId)
            .then(res => {
                let obj = {}

                res.data.map(item => {
                    obj[item.name] = item.quantity;
                })

                this.setState({
                    isLoadingItems: false,
                    items: obj
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

        getPurchases(this.state.eventId)
            .then(res => {
                let purchases = {}
                res.data.map(pur => {
                    if (! purchases[pur.userId])
                        purchases[pur.userId] = {}
                    purchases[pur.userId][pur.itemName] = pur.quantity
                })
                this.setState({
                    isLoadingPurchases: false,
                    purchases: purchases
                })
            })
            .catch(err => {
                this.setState({
                    isLoadingPurchases: false,
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load Purchases - ${err}`
                })
            })
    }

    generateCell(row, item) {
        let val = (this.state.purchases[row.User.id] && this.state.purchases[row.User.id][item]) || 0
        //val = (val >= 0) ? val : 0
        return (
            <input
                type='number'
                pattern='[0-9]{0,5}'
                onKeyDown={(e) => { this.disableKeyboard(e) }}
                onChange={(e) => { this.handleChange(e, row.User.id, item) }}
                style={{ width: 50 }}
                value={val}
            />
        )
    }

    mySort(a, b) {
        if (a.User.country < b.User.country)
            return -1
        else {
            if (a.roleId === b.roleId)
                return 0
            if (a.roleId < b.roleId)
                return 1
            return -1
        }
    }

    render() {
        // if (!this.props.user) {
        //     console.log("USER IS NOT LOGGED IN");
        //     this.props.history.push('/login');
        // }
        if (this.state.isLoadingEvent || this.state.isLoadingItems || this.state.isLoadingPurchases) {
            return (
                <Spinner />
            );
        }
        let { classes, history } = this.props;
        let { items, event } = this.state;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item md={2}>
                        <Button key={"back"} variant="contained" color="primary" className={classes.button} onClick={() => history.goBack()}>
                            <Back />Back
                        </Button>
                        <br />
                        <br />
                        <Typography variant="h4" component="h2">
                            Camp Shop
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Link
                            to={`/events/${this.state.eventId}/campShop/createItem`}
                            className={classes.link}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                            >
                                <Add />Add Item
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item md={12}>
                        <MyTable
                            coloredColumns={['Country', 'Name']}
                            columnsColor={'blanchedalmond'}
                            otherColumns={items}
                            data={event.participations.filter(a => a.status === "APPROVED").sort(this.mySort)}
                            innerCellMethod={this.generateCell}
                        />
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