import React from 'react';
import {getEvent} from '../../actions/eventsActions';
import Spinner from "../common/Spinner";

class CampSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isLoading: true
        }
    }

    componentDidMount() {
        getEvent(1)
            .then(event => {
                this.setState({email: event.data.email || "", isLoading: false})
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner/>
            );
        }

        return (
            <div>
                <iframe src={`https://calendar.google.com/calendar/embed?src=${this.state.email.split('@')[0]}%40gmail.com&ctz=Asia%2FJerusalem`}
                        width="100%" height="900" frameBorder="0" scrolling="no"/>
            </div>
        )
    }
}

export default CampSchedule;