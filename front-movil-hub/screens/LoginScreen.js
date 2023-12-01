import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView , TextInput, TouchableOpacity} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import logo from "../assets/logoMobileHub.png";

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.mobileHub}>Mobile Hub</Text>
                <Image source={logo} style={styles.logo} />
            </View>
            <Text style={styles.inicia}>Inicia sesion</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons style={{marginRight:10}} name="email" size={24} color="black" />
                <TextInput placeholder="Correo electronico" style={{flex:1,paddingVertical: 0}} />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={{marginRight:10}} name="lock-closed" size={24} color="black" />
                <TextInput placeholder="Contraseña" style={{flex:1,paddingVertical: 0}} secureTextEntry={true} />
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity style={{paddingTop:20,paddingRight:20}} onPress={()=>{}}>
                    <Text style={{color: 'blue'}}>Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
         justifyContent:"center",
        
    },
    logoContainer: {
        alignItems:"center",
        paddingBottom:20,
    },
    mobileHub: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    inicia: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 0,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },
});