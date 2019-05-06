import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BlogMessageCard from './BlogMessageCard';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorSnackbar from "../common/ErrorSnackbar";
import {getEventBlogMessages, postComment, removeComment, updateComment} from "../../actions/eventsActions";
import Grid from "@material-ui/core/Grid";

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
            errorSnackbarMessage: "",
            commentInput: ""
        };

        this.post = this.post.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    componentDidMount() {
        getEventBlogMessages(this.state.eventId)
            .then(messages => {
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

    onTextFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    post() {
        postComment(this.state.eventId, this.state.commentInput)
            .then(() => {
                this.setState({commentInput: ""});
                getEventBlogMessages(this.state.eventId)
                    .then(messages => {
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
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load post your comment - ${err}`
                })
            });
    }

    removeComment = (messageId) => {
        removeComment(this.state.eventId, messageId)
            .then(() => {
                getEventBlogMessages(this.state.eventId)
                    .then(messages => {
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
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to delete comment - ${err}`
                })
            });
    };

    updateComment = (messageId, comment) => {
        updateComment(this.state.eventId, messageId, comment)
            .then(() => {
                getEventBlogMessages(this.state.eventId)
                    .then(messages => {
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
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to delete comment - ${err}`
                })
            });
    };

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
                            key={message.id}
                            title={`${message.User.firstName} ${message.User.middleName || ""} ${message.User.lastName}`}
                            subtitle={message.User.country}
                            body={message.content}
                            onDelete={() => this.removeComment(message.id)}
                            onUpdate={msg => this.updateComment(message.id, msg)}
                        />
                    )
                }

                <Grid container>
                    <Grid item md={11}>
                        <TextField
                            color='primary'
                            style={{margin: 15, backgroundColor: 'white'}}
                            placeholder="Write your comment here"
                            fullWidth
                            multiline
                            variant="outlined"
                            value={this.state.commentInput}
                            name="commentInput"
                            onChange={this.onTextFieldChange}
                        />
                    </Grid>
                    <Grid item md={1}>
                        <Button
                            size='large'
                            style={{margin: 22}}
                            color="primary"
                            variant="contained"
                            onClick={this.post}
                        >
                            Post
                        </Button>
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

export default withStyles(styles)(Blog);