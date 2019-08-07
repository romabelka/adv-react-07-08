import {observable} from 'mobx'

export default class SignInFormStore {
    @observable email = ""
    @observable password = ""

    set email(text) {
      this.email = text
    }

    set password(text) {
      this.password = text
    }

    clear = () => {
      this.email = ""
      this.password = ""
    }
}

