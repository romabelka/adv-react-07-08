import React, { Component } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    SectionList
} from 'react-native'
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
            <ScrollView>
                {stores.eventsStore.loading && <ActivityIndicator />}
                <SectionList
                    renderItem={({ item, index, section }) => (
                        <Text key={index}>{item}</Text>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                    )}
                    sections={stores.eventsStore.entities.map(
                        ({ title, ...rest }) => ({
                            title,
                            data: Object.values(rest).filter((item) => !!item)
                        })
                    )}
                    keyExtractor={(item, index) => item + index}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventsScreen
