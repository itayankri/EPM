import React from 'react';

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
    }

    checkPermission() {
        let participation = this.props.event.participations.find(participation => {
            return participation.User.id === this.props.user.id
        });

        let roleName = participation ? participation.EventRole.rolename : "";

        if (this.props.permission === "any") {
            console.log(`${this.props.name} was set to 'any' and therefore returned true`)
            return true 
        } else {
            console.log(`${this.props.name} was set to '${this.props.permission}' and ${this.props.user.firstName} is ${roleName || "not in the event"}, returning: ${this.permissionsDictionary[this.props.permission].includes(roleName)}`)
            let permList = this.permissionsDictionary[this.props.permission]
            return (permList ? permList.includes(roleName) : false);
        }
    }

    permissionsDictionary = {
        roomRandomizer: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
        campShop: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
        blog: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
        shoppingList: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
        leadersNotes: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
        generateForms: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
        campSchedule: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
        chapterSchedule: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
        contactList: ['Staff', 'Director', 'International Staff', 'Junior Staff', 'Participant'],
        pdpef: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
        participationTab: ['Staff', 'Director', 'International Staff', 'Junior Staff'],
    };

    render() {
        if (this.checkPermission()) {
            return (this.props.component)
        } else {
            return null;
        }
    }
}

export default AccessControl;