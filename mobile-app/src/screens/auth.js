import React from 'react'
import {Text, View, TextInput, Button} from 'react-native'

export default function AuthScreen() {
    return (
        <View>
            <Text>Sign In:</Text>
            <View>
                <Text>Email:</Text>
                <TextInput />
            </View>
            <View>
                <Text>Password:</Text>
                <TextInput />
            </View>
            <View>
                <Button onPress={() => console.log('sign in')} title="Sign In"/>
            </View>
        </View>
    )
}
