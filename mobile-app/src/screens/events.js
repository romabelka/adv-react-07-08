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
import Event from "./event"

@observer
class EventsScreen extends Component {
    static propTypes = {

    };

    componentDidMount() {
        stores.eventsStore.fetchAll()
    }

    openEvent = (id) => () => {
        stores.eventsStore.openedEventId = id
    }

    closeEvent = () => {
        stores.eventsStore.openedEventId = null
    }

    render() {
        return !stores.eventsStore.openedEventId ? (
            <ScrollView>
                {stores.eventsStore.loading && <ActivityIndicator />}
                <SectionList
                    renderItem={({ item, index, section }) => (
                        <Text style={styles.item} key={index}>{item}</Text>
                    )}
                    renderSectionHeader={({ section: { title, id } }) => (
                        <Text onPress={this.openEvent(id)} style={styles.header}>
                            {title}
                        </Text>
                    )}
                    sections={stores.eventsStore.entities.map(
                        ({ title, id, ...rest }) => ({
                            id,
                            title,
                            data: Object.values(rest).filter((item) => !!item)
                        })
                    )}
                    keyExtractor={(item, index) => item + index}
                />
            </ScrollView>
        ) : <Event id={stores.eventsStore.openedEventId} onClose={this.closeEvent}/>
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
