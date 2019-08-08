import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import stores from '../stores'
import {observer} from "mobx-react";

@observer
class IsValidPassword extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View>
                <Text>{stores.auth.isValidPassword ? 'Password is Valid' : 'Invalid Password'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default IsValidPassword
