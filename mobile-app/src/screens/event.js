import React, {Component} from 'react'
import Event from "../components/events/event";

const event = {
    id: '123',
    title: 'Agent Conf',
    url: 'http://www.agent.sh/',
    where: 'Dornbirn, Austria',
    when: 'January 20-21, 2017',
    month: 'January',
    submissionDeadline: ''
}


export default class EventScreen extends Component {
    render() {
        return <Event event={event}/>
    }
}
