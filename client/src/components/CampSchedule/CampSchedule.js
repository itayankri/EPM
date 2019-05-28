import React from 'react';

class CampSchedule extends React.Component {
    render() {
        console.log('CampSchedule render');
        return (
            <div>
                <iframe src="https://calendar.google.com/calendar/embed?src=itayan116%40gmail.com&ctz=Asia%2FJerusalem"
                        style="border: 0" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
            </div>
        )
    }
}

export default CampSchedule;