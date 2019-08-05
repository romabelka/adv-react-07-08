import React, { Component } from 'react'
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native'
import stores from '../stores'
import {observer} from "mobx-react";

@observer
class EventsScreen extends Component {
    static propTypes = {

    };

    componentDidMount() {
        stores.eventsStore.fetchAll()
    }

    render() {
        return (
            <View>
                {stores.eventsStore.loading && <ActivityIndicator />}
                {
                    stores.eventsStore.entities.map(event => (
                        <Text key={event.id}>
                            {event.title}
                        </Text>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventsScreen
