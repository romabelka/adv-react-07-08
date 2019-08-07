import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Button,
    ActivityIndicator,
    SectionList
} from 'react-native'
import stores from '../stores'
import {observer} from "mobx-react";

@observer
class EventScreen extends Component {
    static propTypes = {

    };
    render() {
        const {id, onClose} = this.props;
        const {month, title, url, when, where} = stores.eventsStore.getEventById(id)
        return (
            <View>
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.label}>Month:</Text>
                <Text style={styles.text}>{month}</Text>
                <Text style={styles.label}>Url:</Text>
                <Text style={styles.text}>{url}</Text>
                <Text style={styles.label}>When:</Text>
                <Text style={styles.text}>{when}</Text>
                <Text style={styles.label}>Where:</Text>
                <Text style={styles.text}>{where}</Text>
                <Button onPress={onClose} title="Back"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 24,
        textAlign: "left",
        fontWeight: "bold",
        color: "#841584"
    },
    text: {
      color: "red"
    }
})

export default EventScreen
