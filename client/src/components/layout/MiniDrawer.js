/**
 * Created by ItayAnkri on 12/19/2018.
 */

import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Main from '../Main';
import {getLoggedUser} from "../../actions/loginActions";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    topNavbar: {
        position: 'absolute',
        right: 20,
        top: 15
    },
    sideNavlink: {
        textDecoration: 'none'
    },
    topNavlink: {
        textDecoration: 'none',
        color: 'white'
    }
});

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user,
        loadingUserDetails: state.userDetails.loadingUserDetails
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getLoggedUser}, dispatch);
};

class MiniDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    componentDidMount() {
        this.props.getLoggedUser();
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('isUserLoggedIn', prevProps.isUserLoggedIn, this.props.isUserLoggedIn);
    //     console.log('user', prevProps.user, this.props.user)
    // }

    render() {
        const {classes, theme} = this.props;

        if (this.props.loadingUserDetails) {
            return (
                <CircularProgress/>
            )
        }

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            CISV
                        </Typography>
                        {
                            !this.props.isUserLoggedIn
                                ?
                                <div className={classes.topNavbar}>
                                    <NavLink to="/register" className={classes.topNavlink}>
                                        <Button color="inherit">Register</Button>
                                    </NavLink>
                                    <NavLink to="/login" className={classes.topNavlink}>
                                        <Button color="inherit">Login</Button>
                                    </NavLink>
                                </div>
                                :
                                <div className={classes.topNavbar}>
                                    <NavLink to="/account" className={classes.topNavlink}>
                                        <Typography className={classes.topNavlink}>
                                            <IconButton className={classes.topNavlink}>
                                                <AccountIcon/>
                                            </IconButton>
                                            {this.props.user.firstName}
                                        </Typography>
                                    </NavLink>
                                </div>
                        }
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <NavLink to="/home" className={classes.sideNavlink}>
                            <ListItem button>
                                <ListItemIcon><HomeIcon/></ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/files" className={classes.sideNavlink}>
                            <ListItem button>
                                <ListItemIcon><InboxIcon/></ListItemIcon>
                                <ListItemText primary="File Transfer"/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/events" className={classes.sideNavlink}>
                            <ListItem button>
                                <ListItemIcon><EventIcon/></ListItemIcon>
                                <ListItemText primary="Events"/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/account" className={classes.sideNavlink}>
                            <ListItem button>
                                <ListItemIcon><AccountIcon/></ListItemIcon>
                                <ListItemText primary="My Account"/>
                            </ListItem>
                        </NavLink>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Main/>
                </main>
            </div>
        );
    }
}

// export default withStyles(styles, {withTheme: true})(MiniDrawer);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MiniDrawer)));