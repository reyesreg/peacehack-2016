import React, { Platform } from 'react-native';
import _ from 'underscore';
import { Home } from '../Components/Views/';
import { Profile, About, Settings, Login } from '../Components/Views/MenuViews';

module.exports = function (scene) {
    var componentMap = {
        'Home': {
            title: 'Home',
            id: 'Home',
            component: Home
        },
        'Profile': {
            title: 'Profile Page',
            id: 'Profile',
            component: Profile
        },
        'About': {
            title: 'About Page',
            id: 'About',
            component: About
        },
        'Settings': {
            title: 'Settings Page',
            id: 'Settings',
            component: Settings
        }
    }

    return componentMap[scene];
}