import React from 'react';

const permissionsDictionary = {
    roomRandomizer: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
    campShop: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
    blog: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
    shoppingList: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
    leadersNotes: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
    generateForms: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
    campSchedule: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
    contactList: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
    pdpef: ['Staff', 'Director', 'International Staff', 'Junior Staff']
};

/**
 * Props:
 *  - permission - The name of the feature that the user tries to access.
 *  - user - The connected user.
 *  - event - The current event that we are working on.
 *  - component - The component to render if the user has the right permissions.
 */
class AccessControl extends React.Component {
    constructor(props) {
        super(props);
        this.checkPermission = this.checkPermission.bind(this);

        console.log('user', props.user);
        console.log('event', props.event);
    }

    checkPermission() {
        let participation = this.props.event.participations.find(participation => {
            return participation.User.id === this.props.user.id
        });

        let roleName = participation ? participation.EventRole.rolename : "";

        return permissionsDictionary[this.props.permission].includes(roleName);
    }

    render() {
        if (this.checkPermission()) {
            return (this.props.component)
        } else {
            return null;
        }
    }
}

export default AccessControl;