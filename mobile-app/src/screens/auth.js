import React from 'react'
import {Text, View, TextInput, Button, Platform} from 'react-native'
import AuthHeading from '../components/auth-heading'
import stores from '../stores'
import {observer} from "mobx-react";

@observer
export default class AuthScreen extends React.Component {
    render() {
        return (
            <View>
                <AuthHeading />
                <View>
                    <Text style={{
                        fontSize: 20,
                        color: '#ff0000'
                    }}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={stores.auth.email}
                        onChangeText={email => stores.auth.email = email}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        value={stores.auth.password}
                        onChangeText={password => stores.auth.password = password}
                    />
                </View>
                <View>
                    <Button onPress={stores.auth.signIn} title="Sign In"/>
                </View>
            </View>
        )
    }
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
