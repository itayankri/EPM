/**
 * Created by ItayAnkri on 12/23/2018.
 */

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core';
import Spinner from "../common/Spinner";
import CustomizedTabs from '../common/CustomizedTabs';

const styles = theme => ({

});

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedTab: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner/>
            );
        }

        return (
            <div>
                <CustomizedTabs
                    value={this.state.selectedTab}
                    handleChange={this.handleChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(EventDetails);