import React from 'react'
import {Text, View, TextInput, Button, Platform} from 'react-native'
import AuthHeading from '../components/auth-heading'
import stores from '../stores'
import {observer} from "mobx-react";
import IsValidPassword from "../components/is-valid-password";

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
                        onChangeText={stores.auth.setEmail}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        value={stores.auth.password}
                        onChangeText={stores.auth.setPassword}
                    />
                    <IsValidPassword />
                </View>
                <View>
                    <Button onPress={this.handleSignIn} title="Sign In"/>
                </View>
            </View>
        )
    }

    handleSignIn = () => {
        stores.auth.signIn()
        this.props.navigation.navigate('events')
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
