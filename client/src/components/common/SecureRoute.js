import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// class SecureRoute extends React.Component {
//     render() {
//         console.log('Itayway', this.props.check());
//         if (this.props.check()) {
//             return (
//                 <Route
//                     {...this.props}
//                 />
//             );
//         } else {
//             return (<Redirect to='/'/>);
//         }
//     }
// }

const SecureRoute = ({ component: Component, check: Check, ...rest }) => (
    <Route {...rest} render={(props) => (
        Check()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

export default SecureRoute;