import {configure} from 'mobx'
import EventsStore from './events'
import AuthStore from "./auth";

configure({
    enforceActions: 'always'
})

export default {
    events: new EventsStore(),
    auth: new AuthStore()
}
