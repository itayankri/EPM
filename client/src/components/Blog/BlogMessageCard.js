import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
        margin: 15
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
};

class BlogMessageCard extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    <Button size="small">Like</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(BlogMessageCard);