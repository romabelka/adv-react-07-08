import EventsStore from './events'
import AuthStore from "./auth";

export default {
    events: new EventsStore(),
    auth: new AuthStore()
}
