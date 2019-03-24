/**
 * Created by ItayAnkri on 12/22/2018.
 */

import React from 'react';
import {Typography} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import logo from "../../static/images/cisv_logo_1.png";
import logo2 from "../../static/images/cisv_logo_2.png";

class About extends React.Component {
    render() {
        return (
            <div>
                <Grid container>
                    <Typography variant="h4" component="h2">
                        What We Do
                    </Typography>
                </Grid>
                <br/>
                <Grid container>
                    <Grid item md={6}>
                        <Typography variant="subtitle1">
                            CISV was founded in the belief that peace is possible through building friendship and mutual
                            understanding, starting with children.

                            We help our young participants develop to their full potential as future leaders and active
                            citizens, to make a difference in their communities and the world. We also give them the
                            opportunity to build global friendships and networks that will last them a lifetime.

                            Our innovative, fun, non-formal ‘learning by doing’ programmes begin with our original and
                            unique Village programme for 11-year-olds. We offer an exciting blend of seven international
                            camp-based, family exchange, and local community programmes.

                            CISV International is a global organization dedicated to educating and inspiring for peace
                            through building inter-cultural friendship, cooperation, and understanding. Founded in 1950,
                            today we are a federation of 70 National Associations with over 200 Chapters or local
                            groups.
                        </Typography>
                    </Grid>
                    <Grid item md={1}/>
                    <Grid item md={5}>
                        <img src={logo} alt=''/>
                    </Grid>
                </Grid>
                <br/><br/>
                <Grid container>
                    <Typography variant="h4" component="h2">
                        Our Story
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item md={3}>
                        <img src={logo2} alt=''/>
                    </Grid>
                    <Grid item md={2}/>
                    <Grid item md={6}>
                        <Typography variant="subtitle1">
                            Over its history, CISV International has become a worldwide movement working toward peace
                            and intercultural cooperation and understanding. We have educated and inspired many
                            thousands of children and young people, empowering them to achieve their full potential and
                            to play an active role in creating a better world.

                            Our story began in the late 1940s, when a progressive child psychologist named Dr Doris
                            Allen developed the concept of an organization that would foster inter-cultural
                            understanding and friendship as an essential step toward world peace. Doris Allen believed
                            that by creating opportunities for children of different cultures to come together to learn
                            and make friends, they would grow up to become ambassadors for a more just and peaceful
                            world.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default About;