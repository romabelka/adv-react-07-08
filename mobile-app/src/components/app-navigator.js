import {createAppContainer, createStackNavigator} from 'react-navigation'
import AuthScreen from "../screens/auth";
import EventsScreen from "../screens/events";
import EventScreen from "../screens/event";

export default createAppContainer(createStackNavigator({
    'auth': {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Auth'
        }
    },
    'events': {
        screen: EventsScreen
    },
    event: {
        screen: EventScreen
    }
}))
