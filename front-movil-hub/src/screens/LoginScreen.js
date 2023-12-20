import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import logo from "../../assets/logoMobileHub.png";

import { API_URL } from "@env";

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const irAlRegistro = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  };

  const storeToken = async (value) => {
    try {
      await AsyncStorage.multiSet([['my-token', value],['email', email]]);
      console.log("token guardado! ");
    } catch (e) {
      console.log("falló el almacenamiento: ", e);
    }
  };

  const manejarInicio = async () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
  
    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error de respuesta:", errorData);
        if (errorData.errors) {
          setErrorEmail(errorData.errors.email ? errorData.errors.email[0] : "");
          setErrorPassword(errorData.errors.password ? errorData.errors.password[0] : "" );
        }
      } else {
        const responseData = await response.json();
        //console.log("LOGIN - Respuesta del servidor:", responseData);
        if (responseData.token) {
          storeToken(responseData.token);
          navigation.navigate("Perfil");
        }
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.mobileHub}>Mobile Hub</Text>
        <Image source={logo} style={styles.logo} />
      </View>
      <View
        style={{
          backgroundColor: "#dedede",
          borderRadius: 40,
          paddingBottom: 20,
          paddingTop: 20,
          margin: 8,
        }}
      >
        <Text style={styles.inicia}>Inicia sesion</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons
            style={{ marginRight: 10 }}
            name="email"
            size={24}
            color="black"
          />
          <TextInput
            placeholder="Correo electronico"
            style={{ opacity:0.6, flex: 1, paddingVertical: 0, flexDirection: "column" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        { errorEmail ? <Text style={styles.errorMensaje}> {errorEmail} </Text> : <View style={styles.errorPlaceholder} /> }
        {/*--------------------------------------- */}
        <View style={styles.inputContainer}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="lock-closed"
            size={24}
            color="black"
          />
          <TextInput
            placeholder="Contraseña"
            style={{ opacity:0.6,flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        {/*--------------------------------------- */}
        {errorPassword ? <Text style={styles.errorMensaje}>{errorPassword}</Text> : <View style={styles.errorPlaceholder} />}

        <TouchableOpacity
          style={styles.botonIniciar}
          onPress={() => {
            manejarInicio();
          }}
        >
          <Text style={{ color: "white", fontSize: 25 }}>Ingresar</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 30,
          }}
        >
          <Text style={{ alignSelf: "center" }}>No tienes una cuenta? </Text>
          <TouchableOpacity
            style={{ paddingRight: 20 }}
            onPress={() => irAlRegistro()}
          >
            <Text style={{ color: "blue", alignSelf: "center" }}>
              Registrate aqui!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  mobileHub: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inicia: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  inputContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 0,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  botonIniciar: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    marginHorizontal: 50,
    borderRadius: 10,
    marginTop: 60,
  },
  errorMensaje: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    padding: 5,
  },
  errorPlaceholder: {
    height: 15,
  },
});
