import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "react-native-paper";

import logo from "../../assets/logoMobileHub.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

/**
 * Pantalla de registro para usuarios.
 * Permite a los usuarios registrarse en la aplicación proporcionando su nombre, correo electrónico, RUT y fecha de nacimiento.
 * Incluye validaciones de los campos y manejo de errores.
 *
 * @param {object} navigation - Objeto de navegación para la transición entre pantallas.
 * @returns {JSX.Element} Componente de la pantalla de registro.
 */
const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorRut, setErrorRut] = useState("");
  const [errorFecha, setErrorFecha] = useState("");


  /**
   * Maneja el proceso de registro del usuario.
   * Realiza una solicitud POST al endpoint de registro con los datos del usuario.
   * En caso de éxito, guarda el token y navega a la pantalla de perfil.
   * En caso de error, muestra los mensajes de error correspondientes.
   */
  const Registrarse = async () => {
    console.log({
      name: nombre,
      rut: rut,
      email: email,
      birthdate: birthdate,
    });

    try {
      const response = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nombre,
          rut: rut,
          email: email,
          birthdate: birthdate,
        }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor1:", data);
      if (data.token) {
        // Si la respuesta es exitosa, navegar a la página "Perfil"
        //guardar token
        guardarToken(data.token);
        navigation.navigate("Perfil");
      } else {
        // Si la respuesta no es exitosa, manejar los errores
        console.log("Respuesta del servidor:", data);
        setErrorNombre(data.name ? data.name[0] : "");
        setErrorEmail(data.email ? data.email[0] : "");
        setErrorRut(data.rut ? data.rut[0] : "");
        setErrorFecha(data.birthdate ? data.birthdate[0] : "");
      }
    } catch (error) {
      console.error("Error jefe:", error);
      // Manejar errores de red u otros errores
    }
  };
  
  /**
   * Almacena el token de autenticación en el almacenamiento local.
   * 
   * @param {string} value - Token de autenticación.
   */
  const guardarToken = async (value) => {
    try {
      await AsyncStorage.setItem("my-token", value);
      await AsyncStorage.setItem("email", email);
      console.log("token y email guardado! ");
    } catch (e) {
      console.log("falló el almacenamiento: ", e);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Text style={styles.mobileHub}>Mobile Hub</Text>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.inicia}>Registro</Text>
        {/*------------------------------------*/}
        <View style={styles.inputContainer}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="person"
            size={24}
            color="black"
          />
          <TextInput
            placeholder="nombre completo"
            style={{ opacity: 0.6, flex: 1, paddingVertical: 0 }}
            secureTextEntry={false}
            onChangeText={(d) => {
              setNombre(d);
              setErrorNombre("");
            }}
          />
        </View>
        {errorNombre ? (
          <Text style={styles.errorText}>{errorNombre}</Text>
        ) : (
          <View style={styles.errorPlaceholder} />
        )}
        {/*------------------------------------*/}
        <View style={styles.inputContainer}>
          <MaterialIcons
            style={{ marginRight: 10 }}
            name="email"
            size={24}
            color="black"
          />
          <TextInput
            placeholder="Correo electronico"
            style={{ opacity: 0.6, flex: 1, paddingVertical: 0 }}
            onChangeText={(d) => {
              setEmail(d);
              setErrorEmail("");
            }}
          />
        </View>
        {errorEmail ? (
          <Text style={styles.errorText}>{errorEmail}</Text>
        ) : (
          <View style={styles.errorPlaceholder} />
        )}
        {/*------------------------------------*/}
        <View style={styles.inputContainer}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="key"
            size={24}
            color="black"
          />
          <TextInput
            placeholder="Rut: 12.345.678-k"
            style={{ opacity: 0.6, flex: 1, paddingVertical: 0 }}
            secureTextEntry={false}
            onChangeText={(d) => {
              setRut(d);
              setErrorEmail("");
            }}
          />
        </View>
        {errorRut ? (
          <Text style={styles.errorText}>{errorRut}</Text>
        ) : (
          <View style={styles.errorPlaceholder} />
        )}
        {/*------------------------------------*/}
        <View style={styles.inputContainer}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="calendar"
            size={24}
            color="black"
          />
          <TextInput
            placeholder="DD/MM/AAAA"
            style={{ opacity: 0.6, flex: 1, paddingVertical: 0 }}
            secureTextEntry={false}
            onChangeText={(d) => {
              setBirthdate(d);
              setErrorFecha("");
            }}
          />
        </View>
        {errorFecha ? (
          <Text style={styles.errorText}>{errorFecha}</Text>
        ) : (
          <View style={styles.errorPlaceholder} />
        )}
        {/*------------------------------------*/}
        <TouchableOpacity
          style={styles.botonRegistrar}
          onPress={() => {
            Registrarse();
          }}
        >
          <Text style={{ color: "white", fontSize: 25 }}>Registrarse</Text>
        </TouchableOpacity>
        {/*------------------------------------*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 30,
          }}
        >
          <Text style={{ alignSelf: "center" }}>Ya tienes una cuenta? </Text>
          <TouchableOpacity
            style={{ paddingRight: 20 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ color: "blue", alignSelf: "center" }}>
              Inicia Sesion
            </Text>
          </TouchableOpacity>
        </View>
        {/*------------------------------------*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
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
  inputDate: {
    flexDirection: "column",
    alignContent: "space-between",
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 160,
  },
  botonRegistrar: {
    backgroundColor: "#ac23c4",
    padding: 10,
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: 40,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 5,
  },
  errorPlaceholder: {
    height: 18, // Asegúrate de que este valor sea igual a la altura del texto de error para evitar el desplazamiento
  },
  nacimiento: {
    color: "black",
    marginVertical: 10,
  },
});
