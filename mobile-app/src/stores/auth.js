import {observable, autorun, action, computed} from 'mobx'
import apiService from '../services/api'

export default class AuthStore {
    constructor() {
        apiService.onAuthStateChanged(this.setUser)

        autorun(() => {
            console.log('---', 'autorun email: ', this.email)
        })
    }

    @computed get isValidPassword() {
        return this.password.length > 8
    }

    @observable email = ''
    @observable password = ''
    @observable user = null

    @action setEmail = email => {
        this.email = email
        this.email = ''
        this.email = email
    }
    @action setPassword = password => this.password = password
    @action setUser = user => this.user = user

    @action signIn = async () => {
        await apiService.signIn(this.email, this.password)
        this.setEmail('')
        this.setPassword('')
    }
}
