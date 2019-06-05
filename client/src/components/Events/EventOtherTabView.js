import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
    Card,
    CardContent,
    Grid,
    CardMedia,
    CardActionArea
} from '@material-ui/core';
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
import pdpef from '../../static/images/pdpef.png';
import AccessControl from '../common/AccessControl';

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
        height: 150,
        width: 150,
        margin: '25px 50px'
    },
    link: {
        textDecoration: 'none'
    }
});

const mapStateToProps = state => {
    return {
        user: state.userDetails.user
    }
};

class EventOtherTabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.renderCard = this.renderCard.bind(this)
    }

    renderCard(card) {
        const { classes } = this.props
        return (
            <AccessControl
                name={card.name}
                permission={card.permission || card.name}
                user={this.props.user}
                event={this.props.event}
                component={<Grid style={{overflow: "hidden"}} item md={"auto"}>
                    <Link to={`./${this.props.event.id}/${card.name}`} className={classes.link}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={card.picture}
                                    title={card.displayName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.displayName}
                                    </Typography>
                                    <Typography component="p">
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>}
            />
        )
    }

    cards = [
        {name: "roomRandomizer", displayName: "Room Randomizer", picture: random_pic, description: `Generate a random room order, by amount of rooms. You can filter by the
        types of participants.`},
        {name: "campShop", displayName: "Shop", picture: camp_shop_pic, description: `Access the Shop, review the participants list against items list, view
        daily
        / date range reports.`},
        {name: "blog", displayName: "Blog", picture: blog_pic, description: `Access the blog, view pictures from the event, posts written by the
        managers, etc'.`},
        {name: "shoppingList", displayName: "Shopping List", picture: shopping_list_pic, description: `Manage an event's shopping list, ask for new items, update storage,
        etc'.`},
        {name: "leadersNotes", displayName: "Leaders Notes", picture: leaders_notes_pic, description: `Show the leaders meetings notes, to catch up on information that may
        have
        been passed on.`},
        {name: "generateForms", displayName: "Generate Forms", picture: form_pic, description: `Quickly generate forms for the events, Health / Travel / Incident
        Report,
        etc'.`},
        {name: "campSchedule", displayName: "Camp Schedule", picture: camp_schedule_pic, description: `View or Edit the Camp Schedule, update activities / delegation of the
        day,
        etc'.`},
        {name: "chapterSchedule", displayName: "Chapter Schedule", picture: chapter_schedule_pic, description: `View or edit the Chapter Schedule, manage host families, airport duties,
        etc'.`},
        {name: "contactList", displayName: "Contact List", picture: contact_list_pic, description: `Generate a Contact List of all participants in an event. Can be
        downloaded
        later.`},
        {name: "pdpef", displayName: "PDPEF", picture: pdpef, description: `View and edit the Programme Director’s Planning and Evaluation Form.`},
    ]

    render() {
        let {classes} = this.props;
        return (
            <div>
                <br/>
                <Grid container spacing={16}>
                    {this.cards.map(card => this.renderCard(card))}
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventOtherTabView));