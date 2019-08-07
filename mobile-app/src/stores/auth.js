import {observable} from 'mobx'
import apiService from '../services/api'
import stores from '.';

export default class AuthStore {
    @observable user = null
    @observable error = null
    @observable loading = false

    async signIn(email, password) {
      try {
        this.loading = true
        this.user = await apiService.signIn(email, password)
        stores.signInFormStore.clear()
        this.loading = false
      } catch(error) {
        this.loading = false
        this.error = error
      }
    }
}

