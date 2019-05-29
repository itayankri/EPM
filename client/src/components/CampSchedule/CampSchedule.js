import React from 'react';

class CampSchedule extends React.Component {
    render() {
        return (
            <div>
                <iframe src="https://calendar.google.com/calendar/embed?src=cisv.camp%40gmail.com&ctz=Asia%2FJerusalem"
                        width="100%" height="900" frameBorder="0" scrolling="no"/>
            </div>
        )
    }
}

export default CampSchedule;