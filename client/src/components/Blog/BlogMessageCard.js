import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from "@material-ui/core/Fab";
import LikeIcon from '@material-ui/icons/ThumbUp';
import UnlikeIcon from '@material-ui/icons/ThumbDown';

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

class BlogMessageCard extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.props.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {this.props.subtitle}
                    </Typography>
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
            </Card>
        );
    }
}

export default withStyles(styles)(BlogMessageCard);