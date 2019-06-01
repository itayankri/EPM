import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Typography} from "@material-ui/core";

const styles = theme => ({

});

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user,
    }
};

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
        }
    }

    render() {
        return (
            <div>
                <Typography>My Account</Typography>
            </div>
        )
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Account));