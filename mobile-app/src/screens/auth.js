import React, {useState} from 'react'
import {Text, View, TextInput, Button, Platform, ActivityIndicator} from 'react-native'
import AuthHeading from '../components/auth-heading'
import { observer } from 'mobx-react';
import stores from '../stores';

function AuthScreen() {
    const email = stores.signInFormStore.email
    const password = stores.signInFormStore.password
    const signIn = () => {
        stores.authStore.signIn(email, password)
    }
    return (
        <View>
            {stores.authStore.loading && <ActivityIndicator />}
            <AuthHeading />
            <View>
                <Text style={{
                    fontSize: 20,
                    color: '#ff0000'
                }}>Email:</Text>
                <TextInput
                    value={email}
                    onChangeText={(text)=> stores.signInFormStore.email = text}
                    style={styles.input}
                />
            </View>
            <View>
                <Text style={styles.text}>Password:</Text>
                <TextInput
                    value={password}
                    onChangeText={(text)=> stores.signInFormStore.password = text}
                    style={styles.input}
                />
            </View>
            <View>
                <Button onPress={signIn} title="Sign In"/>
            </View>
        </View>
    )
}

const styles = {
    text: {
        fontSize: 20,
        color: 'red'
    },
    input: {
        borderBottomWidth: 1,
        ...Platform.select({
            ios: {
                borderBottomColor: 'green'
            },
            android: {
                borderBottomColor: 'blue'
            }
        })
    }
}

export default observer(AuthScreen)
