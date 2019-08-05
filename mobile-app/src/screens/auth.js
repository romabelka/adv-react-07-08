import React from 'react'
import {Text, View, TextInput, Button, Platform} from 'react-native'
import AuthHeading from '../components/auth-heading'

export default function AuthScreen() {
    return (
        <View>
            <AuthHeading />
            <View>
                <Text style={{
                    fontSize: 20,
                    color: '#ff0000'
                }}>Email:</Text>
                <TextInput style={styles.input} />
            </View>
            <View>
                <Text style={styles.text}>Password:</Text>
                <TextInput  style={styles.input}/>
            </View>
            <View>
                <Button onPress={() => console.log('sign in')} title="Sign In"/>
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
