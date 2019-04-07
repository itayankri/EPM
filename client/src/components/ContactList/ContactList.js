import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Back from '@material-ui/icons/KeyboardBackspace';
import ErrorSnackbar from "../common/ErrorSnackbar";
import {getContactList} from "../../actions/eventsActions";
import {getCountryFlag} from "../../actions/eventsActions";
import Spinner from "../common/Spinner";
import {
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';

let first = true;

const rolesDictionary = Object.freeze({
    1: 'Participant',
	2: 'Leader',
	3: 'Kitchen: Staff',
	4: 'Director',
	5: 'International: Staff',
	6: 'Staff',
	7: 'Junior: Counsellor',
	8: 'Staff: baby',
	9: 'Donor',
	10: 'Junior: Staff',
	11: 'Speaker',
	12: 'Junior: Leader',
	13: 'Host: Family',
	14: 'Chapter: Support',
	15: 'Observer',
	16: 'Independent: Participant',
	17: 'Activity: Administrator',
	18: 'Trustee',
	19: 'Committee: Member',
	20: 'Committee: Chair',
	21: 'Local: Interchange: coordinator',
	22: 'National: Interchange: Coordinator',
	23: 'Trainer',
	24: 'RTF: Coordinator',
});

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      iconSmall: {
        fontSize: 20,
      },
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
        height: 40,
        width: 40,
        border: 'black 2px solid'
    },
    link: {
        textDecoration: 'none'
    }
});

// function for dynamic sorting
function compareValues(key, order='asc') {
    return function(a, b) {
        a = a.User;
        b = b.User;
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      
      if (varA > varB) {
        comparison = 1;
        
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  

class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            eventId: this.props.match.params.eventId,
            isLoading: true,
            eventDetails: null,
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
        }
    }

    dateFormat(date) {
        let newDate = new Date(date);
        return (newDate.getDate().toString().padStart(2, '0')) + "/" + ((newDate.getMonth()+1).toString().padStart(2, '0')) + "/" + (newDate.getFullYear());
    }

    componentWillMount() {
        
    }
    
    componentDidMount() {
        getContactList(this.state.eventId)
            .then(res => {
                let participants = res.data.participations.slice(); 
                this.setState({
                        eventDetails: res.data,
                        isLoading: false,
                        key: 0,
                        participants: participants
                    })
                }).then( () => {
                    this.state.participants.forEach(function(e, i) {
                        if (!e.User.flag)
                            {
                                getCountryFlag(e.User.country).then(res => {
                                    e.User.flag = res;
                                })
                            }
                    });
                })
                .catch(err => {
                    this.setState({
                        isLoading: false,
                        isErrorSnackbarOpen: true,
                        errorSnackbarMessage: `Failed to load Events - ${err}`,
                    })
                });
    }

    componentDidUpdate(prevProps) {
        this.interval = setInterval(() => {
        if (first)
        {
            first = false;
            this.setState({
                key: (this.state.key + 1)
            })
            this.state.participants.forEach(function (e, i) {
                if (!e.User.flag)
                {
                    first = true;
                    return;
                }
            })
            clearInterval(this.interval);
        }}, 1);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner/>
            );
        } else  {
            let {classes} = this.props;
            return (
                <div>
                    <Button key={this.state.key} variant="contained" color="primary" className={classes.button} onClick={() => this.props.history.goBack()}>
                        <Back></Back>Back
                    </Button>
                    <Typography variant="h4" component="h2">
                        Contact List
                    </Typography>
                    <br/>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >Country</TableCell>
                                            <TableCell align="center">Full Name</TableCell>
                                            <TableCell align="center">Role</TableCell>
                                            <TableCell align="center">Email</TableCell>
                                            <TableCell align="center">Birthday</TableCell>
                                            <TableCell align="center">Cellphone Number</TableCell>
                                            <TableCell align="center">City</TableCell>
                                            <TableCell align="center">Address, Zipcode</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.state.participants.sort(compareValues('country')).map(row => {
                                                    return (
                                                        <TableRow
                                                            key={row.User.email}
                                                            className={classNames(classes.tableRow, classes.tableRowHover)}
                                                            //onClick={() => this.onRowClick(row.User.email)}
                                                        >
                                                            <TableCell component="th" scope="row"> <img alt={row.User.country} className={classes.media} src={row.User.flag} ></img><Typography>{row.User.country}</Typography></TableCell>
                                                            <TableCell align="center">{row.User.firstName} {row.User.lastName}</TableCell>
                                                            <TableCell align="center">{rolesDictionary[row.roleId]}</TableCell>
                                                            <TableCell align="center">{row.User.email}</TableCell>
                                                            <TableCell align="center">{this.dateFormat(row.User.birthday)}</TableCell>
                                                            <TableCell align="center">{row.User.cellphoneNumber}</TableCell>
                                                            <TableCell align="center">{row.User.city}</TableCell>
                                                            <TableCell align="center">{row.User.address}, {row.User.zipcode}</TableCell>
                                                        </TableRow>
                                                    )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>
                    <ErrorSnackbar
                        open={this.state.isErrorSnackbarOpen}
                        handleClose={this.handleErrorSnackbarClose}
                        errorMessage={this.state.errorSnackbarMessage}
                    />
                </div>
            )}
    }
}

export default withStyles(styles)(ContactList);