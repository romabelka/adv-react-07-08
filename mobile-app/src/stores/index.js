import EventsStore from './events'
import AuthStore from './auth'
import SignInFormStore from './sing-in-form'

export default {
    eventsStore: new EventsStore(),
    authStore: new AuthStore(),
    signInFormStore: new SignInFormStore()
}
