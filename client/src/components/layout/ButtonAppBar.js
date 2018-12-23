/**
 * Created by ItayAnkri on 12/19/2018.
 */

import React from 'react';
import {withStyles} from 'react-with-styles';
import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class ButtonAppBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {styles} = this.props;
        return (
            <div className={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={styles.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.props.onMenuButtonClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={styles.grow}>
                            CISV EPM
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(ButtonAppBar);