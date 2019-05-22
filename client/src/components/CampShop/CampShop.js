import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Back from '@material-ui/icons/KeyboardBackspace';
import MyTable from './MyTable';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ErrorSnackbar from "../common/ErrorSnackbar";
import { getEvent, getCampShopItems, getPurchases, purchaseItem, returnItem } from "../../actions/eventsActions";
import {
    Typography,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import Spinner from "../common/Spinner";
import { thisExpression } from '@babel/types';

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
            isGeneratingTextboxes: true,
            event: '',
            eventId: (this.props.location.pathname.split("/")[2]),
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            items: [],
            purchases: [],
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

    generateTextboxes = () => {
        let obj = {}

        Object.keys(this.state.items).map(item => {
            obj[item] = {};
            this.state.event.participations.map(part => {
                obj[item][part.User.id] = 0;
            })
        })

        this.setState({
            purchases: obj,
            isGeneratingTextboxes: false,
        })
    }

    handleChange(e, userId, itemName) {
        let newVal = e.target.value;
        let previousValue = this.state.purchases[itemName][userId];

        let newPurchases = this.state.purchases;
        let newItems = this.state.items;
        let changed = false;

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
                newPurchases[itemName][userId] = newVal;
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
                newPurchases[itemName][userId] = newVal;
                newItems[itemName] = newItems[itemName] + 1;
                changed = true;
            }
        }

        if (changed) {
            this.setState({
                items: newItems,
                purchases: newPurchases
            })
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
    }

    generateCell(row, item) {
        return (
            <input
                type='number'
                pattern='[0-9]{0,5}'
                onKeyDown={(e) => { this.disableKeyboard(e) }}
                onChange={(e) => { this.handleChange(e, row.User.id, item) }}
                style={{ width: 50 }}
                value={this.state.purchases[item][row.User.id]}
            />
        )
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
        if (this.state.isGeneratingTextboxes) {
            this.generateTextboxes()
            return (
                <Spinner />
            );
        }
        let { classes, } = this.props;
        let { purchases, items, event } = this.state;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item md={10}>
                        <Button key={this.state.key} variant="contained" color="primary" className={classes.button} onClick={() => this.props.history.goBack()}>
                            <Back />Back
                        </Button>
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
                        <MyTable
                            coloredColumns={['Country', 'Name']}
                            columnsColor={'blanchedalmond'}
                            otherColumns={items}
                            data={event.participations}
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