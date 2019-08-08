import React, {Component} from 'react'
import Event from "../components/events/event";
import stores from '../stores'
import {observer} from "mobx-react";

@observer
export default class EventScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title
        }
    }

    render() {
        const { id } = this.props.navigation.state.params
        return <Event event={stores.events.getById(id)}/>
    }
}
