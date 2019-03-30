import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
    Card,
    CardActions,
    CardContent,
    Button,
    Divider,
    Grid,
    TextField,
    CardMedia,
    CardActionArea
} from '@material-ui/core';
import Spinner from "./EventSummaryTabView";
import {Link} from 'react-router-dom';
import random_pic from "../../static/images/randomize.jpg";
import camp_shop_pic from "../../static/images/camp_shop.png";
import blog_pic from "../../static/images/blog.png";
import shopping_list_pic from "../../static/images/shopping_list.png";
import leaders_notes_pic from "../../static/images/leaders_notes.jpg";
import form_pic from "../../static/images/form.png";
import camp_schedule_pic from "../../static/images/camp_schedule.png";
import chapter_schedule_pic from "../../static/images/chapter_schedule.png";
import contact_list_pic from "../../static/images/contact_list.png";

const styles = ({
    card: {
        width: 250,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    media: {
        height: 250,
        width: 250
    },
    link: {
        textDecoration: 'none'
    }
});

class EventOtherTabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        let {classes} = this.props;
        return (
            <div>
                <br/>
                <Grid container spacing={16}>
                    <Grid item md={2}>
                        <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={random_pic}
                                    title="Room Randomizer"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Room Randomizer
                                    </Typography>
                                    <Typography component="p">
                                        Generate a random room order, by amount of rooms. You can filter by the types of participants.                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>

                    <Grid item md={2}>
                        <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={camp_shop_pic}
                            title="Shop"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Shop
                            </Typography>
                            <Typography component="p">
                                Access the Shop, review the participants list against items list, view daily / date range reports.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>

                    <Grid item md={2}>
                        <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={blog_pic}
                            title="Blog"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Blog
                            </Typography>
                            <Typography component="p">
                                Access the blog, view pictures from the event, posts written by the managers, etc'. 
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>

                    <Grid item md={2}>
                    <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={shopping_list_pic}
                            title="Shopping List"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Shopping List
                            </Typography>
                            <Typography component="p">
                                Manage an event's shopping list, ask for new items, update storage, etc'.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>

                    <Grid item md={2}>
                    <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={leaders_notes_pic}
                            title="Leaders Notes"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Leaders Notes
                            </Typography>
                            <Typography component="p">
                                Show the leaders meetings notes, to catch up on information that may have been passed on.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>
                </Grid>

                <br/>
                <Grid container spacing={16}>
                    <Grid item md={2}>
                    <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={form_pic}
                            title="Generate Forms"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Generate Forms
                            </Typography>
                            <Typography component="p">
                                Quickly generate forms for the events, Health / Travel / Incident Report, etc'.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>

                    <Grid item md={2}>
                    <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={camp_schedule_pic}
                            title="Camp Schedule"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Camp Schedule
                            </Typography>
                            <Typography component="p">
                                View or Edit the Camp Schedule, update activities / delegation of the day, etc'.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>

                    <Grid item md={2}>
                    <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={chapter_schedule_pic}
                            title="Chapter Schedule"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Chapter Schedule
                            </Typography>
                            <Typography component="p">
                                View or edit the Chapter Schedule, manage host families, airport duties, etc'.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>

                    <Grid item md={2}>
                    <Link to={`./${this.props.event.id}/bla`} className={classes.link}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={contact_list_pic}
                            title="Contact List"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Contact List
                            </Typography>
                            <Typography component="p">
                                Generate a Contact List of all participants in an event. Can be downloaded later.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(EventOtherTabView);