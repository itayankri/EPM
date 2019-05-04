import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BlogMessageCard from './BlogMessageCard';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorSnackbar from "../common/ErrorSnackbar";
import {getEventBlogMessages} from "../../actions/eventsActions";

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
        this.state = {
            eventId: this.props.match.params.eventId,
            messages: [],
            loadingMessages: true,
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: ""
        }
    }

    componentDidMount() {
        getEventBlogMessages(this.state.eventId)
            .then(messages => {
                console.log(messages);
                this.setState({
                    messages: messages,
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load blog messages - ${err}`
                })
            })
            .finally(() => {
                this.setState({
                    loadingMessages: false
                })
            })
    }

    render() {
        if (this.state.loadingMessages) {
            return (
                <CircularProgress/>
            )
        }

        if (this.state.messages.length === 0) {
            return (
                <div>
                    <Typography variant="h4" component="h2">Blog</Typography>
                    <br/>
                    <Typography>There are no comments in this blog yet.</Typography>
                </div>
            )
        }

        return (
            <div>
                <Typography variant="h4" component="h2">Blog</Typography>
                {
                    this.state.messages.map(message =>
                        <BlogMessageCard
                            title={`${message.User.firstName} ${message.User.middleName || ""} ${message.User.lastName}`}
                            subtitle={message.User.country}
                            body={message.content}
                        />
                    )
                }

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
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Blog);