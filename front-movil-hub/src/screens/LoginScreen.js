import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import logo from "../../assets/logoMobileHub.png";

import agent from "../api/agent";
import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const irAlRegistro = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  };

  const storeToken = async (value) => {
    try {
      await AsyncStorage.multiSet([['my-token', value],['email', email]]);
    } catch (e) {
      console.log(e)
    }
  };

  const manejarInicio = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);

    axios({
      method: "post",
      responseType: "json",
      url: "http://192.168.56.1:8000/api/login/",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        
        if (response.data.token){
          storeToken(response.data.token)
          //navigation.navigate("Profile")
          navigation.navigate("Perfil")
        }
        // Aquí puedes manejar la respuesta exitosa
      })
      .catch((error) => {
        if (error.response) {
          // La solicitud fue hecha y el servidor respondió con un estado de error
          console.log("Error de respuesta:", error.response.data);
          //
          const errors = error.response.data.errors;
          let errorMessages = "";
          for (let key in errors) {
            errors[key].forEach((message) => {
              errorMessages += `${message}\n`;
            });
          }

          Alert.alert("Ha ocurrido algo! ", errorMessages);
          setErrorMessage(error.response.data.errors);
          console.log("Estado:", error.response.status);
          console.log("Headers:", error.response.headers);
          setErrorMessage(error.response.data);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.log("Error de solicitud:", error.request);
          setErrorMessage(error.request);
        } else {
          // Algo sucedió al configurar la solicitud
          console.log("Error:", error.message);
          setErrorMessage(error.message);
        }
        console.log("Configuración de la solicitud:", error.config);
      });
  };

  //funcion para enviar los datos al backend
  // const handleLogin = (data) => {
  //   agent.Login.login(data.email, data.password)
  //     .then((response) => {
  //       if (response.token) {
  //         //AsyncStorage.setItem("AccessToken", response.token)
  //         navigation.replace("Reserva");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

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
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            style={{ paddingTop: 20, paddingRight: 20 }}
            onPress={() => {}}
          >
            <Text style={{ color: "blue" }}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

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
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  errorMensaje: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    padding: 5,
  },
});
