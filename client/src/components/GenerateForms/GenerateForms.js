import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {downloadForm} from '../../actions/eventsActions';
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
import {Link} from 'react-router-dom';
import health_form_pic from "../../static/images/health_form.png";
import legal_form_pic from "../../static/images/legal_form.png";
import incident_report_pic from "../../static/images/incident_report.png";

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

class GenerateForms extends React.Component {
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
                <Button
                    onClick={() => this.props.history.goBack()}>
                    BACK
                </Button>
                <Typography variant="h4" component="h2">
                    Generate Forms
                </Typography>
                <br/>
                <Grid container spacing={16}>
                    <Grid item md={2}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={health_form_pic}
                                    title="Health Form"
                                    onClick={() => downloadForm("healthForm.pdf", 1)}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Health Form
                                    </Typography>
                                    <Typography component="p">
                                        Generate a filled-in Health Form with your details, all you need is a doctor's signature and make copies!
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Grid>

                    <Grid item md={2}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={legal_form_pic}
                                    title="Adult Legal Form"
                                    onClick={() => downloadForm("adultLegalForm.pdf")}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Adult Legal Form
                                    </Typography>
                                    <Typography component="p">
                                        Generate a filled-in Adult Legal Form with your details, event details, etc'. Review it before submitting!
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Grid>

                    <Grid item md={2}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={incident_report_pic}
                                    title="Incident Report"
                                    onClick={() => downloadForm("incidentReportForm.docx", )}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Incident Report
                                    </Typography>
                                    <Typography component="p">
                                        Generate a filled-in Incident Report Form with your details, event details, etc'. Fill in the incident and submit!
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(GenerateForms);