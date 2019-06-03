import React from 'react';

class AccessControl extends React.Component {
    constructor(props) {
        super(props);
        this.checkPermission = this.checkPermission.bind(this);
    }

    checkPermission() {
        return ['Staff', 'Director', 'International Staff', 'Junior Staff'].includes(this.props.roleName);
    }

    render() {
        if (this.checkPermission()) {
            return (this.props.component)
        }
    }
}

export default AccessControl;