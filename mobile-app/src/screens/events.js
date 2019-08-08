import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator} from 'react-native'
import stores from '../stores'
import {observer} from "mobx-react";
import EventList from "../components/events/event-list";

@observer
class EventsScreen extends Component {
    static propTypes = {

    };

    componentDidMount() {
        stores.events.fetchAll()
    }

    render() {
        if (stores.events.loading) return <ActivityIndicator/>
        return <EventList events={stores.events.entities}/>
    }
}

const styles = StyleSheet.create({
})

export default EventsScreen
