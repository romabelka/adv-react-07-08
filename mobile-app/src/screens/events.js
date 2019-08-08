import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator} from 'react-native'
import stores from '../stores'
import {observer} from "mobx-react";
import EventList from "../components/events/event-list";

@observer
class EventsScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Events'
    }


    componentDidMount() {
        stores.events.fetchAll()
    }

    render() {
        if (stores.events.loading) return <ActivityIndicator/>
        return <EventList events={stores.events.entities}
                          handlePress={(event) => {
                              this.props.navigation.navigate('event', event )
                          }}
        />
    }
}

const styles = StyleSheet.create({
})

export default EventsScreen
