import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from "@material-ui/core/Fab";
import LikeIcon from '@material-ui/icons/ThumbUp';
import UnlikeIcon from '@material-ui/icons/ThumbDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/es/TextField/TextField";
import {Button} from "@material-ui/core";

const styles = {
    card: {
        minWidth: 275,
        margin: 15
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    grow: {
        flexGrow: 1
    }
};

const mapStateToProps = state => {
    return {
        userFromRedux: state.userDetails.user,
    }
};

const ITEM_HEIGHT = 48;

class BlogMessageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            editMode: false,
            commentInput: this.props.body
        }
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    editModeOn = () => {
        this.setState({editMode: true});
        this.handleClose();
    };

    editModeOff = () => {
        this.setState({editMode: false});
    };

    updateComment = () => {
        this.setState({editMode: false});
        this.props.onUpdate(this.state.commentInput);
        this.props.onUpdate();
    };

    onDeletePost = () => {
        this.props.onDelete();
        this.handleClose();
    };

    onBodyChange = (event) => {
        this.setState({commentInput: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        console.log(this.props.user.id === this.props.userFromRedux.id, this.props.user.id, this.props.userFromRedux.id);

        return (
            <Card className={classes.card}>
                <CardHeader
                    action={
                        this.props.user.id === this.props.userFromRedux.id &&
                        <IconButton onClick={this.handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={this.props.title}
                    subheader={`${this.props.subtitle}  |  ${new Date(this.props.createdAt).toString().split('GMT')[0]}`}
                />
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {
                        !this.state.editMode &&
                        <MenuItem onClick={this.editModeOn}>
                            Edit
                        </MenuItem>
                    }
                    <MenuItem onClick={this.onDeletePost}>
                        Delete
                    </MenuItem>
                </Menu>
                {
                    this.state.editMode
                        ?
                        <span>
                            <CardContent>
                                <TextField
                                    color='primary'
                                    variant='outlined'
                                    multiline
                                    fullWidth
                                    value={this.state.commentInput}
                                    onChange={this.onBodyChange}
                                />
                            </CardContent>
                            <CardActions>
                                <Button color='primary' onClick={this.updateComment}>Save</Button>
                                <Button color='secondary' onClick={this.editModeOff}>Cancel</Button>
                            </CardActions>
                        </span>
                        :
                        <span>
                            <CardContent>
                                <Typography component="p">
                                    {this.props.body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography className={classes.pos} color="textSecondary">
                                    0 Likes
                                </Typography>
                                <div className={classes.grow}/>
                                <Fab color="primary" className={classes.fab} size="small">
                                    <LikeIcon/>
                                </Fab>
                                <Fab color="secondary" className={classes.fab} size="small">
                                    <UnlikeIcon/>
                                </Fab>
                            </CardActions>
                        </span>
                }
            </Card>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BlogMessageCard));