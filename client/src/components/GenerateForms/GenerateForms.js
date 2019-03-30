import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({

});

class GenerateForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Typography variant="h4" component="h2">
                    Generate Forms
                </Typography>
                <br/>
                <Button variant="outlined">
                    Download Form
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(GenerateForms);