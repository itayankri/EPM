import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BlogMessageCard from './BlogMessageCard';
import TextField from "@material-ui/core/TextField";

const styles = {
    submit: {
        margin: 15,
    },
    input: {
        margin: 7,
        width: '80%',
    }
};

class Blog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Typography variant="h4" component="h2">Blog</Typography>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <BlogMessageCard/>
                <div className={this.props.classes.input}>
                    <TextField
                        color='primary'
                        style={{margin: 8}}
                        placeholder="Write your comment here"
                        fullWidth
                        multiline
                        variant="outlined"
                    />
                </div>
                <div className={this.props.classes.submit}>
                    <Button
                        color="primary"
                        variant="outlined"
                    >
                        Add Comment
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Blog);