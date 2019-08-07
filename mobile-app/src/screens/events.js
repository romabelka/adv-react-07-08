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
                        <Text style={styles.item} key={index}>{item}</Text>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
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
    header: {
        paddingLeft: 10,
        fontWeight: "bold"
    },
    item: {
        elevation:4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        paddingLeft: 20
    }
})

export default EventsScreen
