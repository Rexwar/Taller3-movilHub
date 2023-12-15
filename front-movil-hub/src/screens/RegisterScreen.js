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
import { Button } from "react-native-paper";

import logo from "../../assets/logoMobileHub.png";
import {
  es,
  DatePickerInput,
  registerTranslation,
} from "react-native-paper-dates";
import agent from "../api/agent";

registerTranslation("es", es);

const RegisterScreen = ({ navigation }) => {
  const [inputDate, setInputDate] = useState(new Date());
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");

  const onDismissSingle = () => {
    setOpen(false);
  };

  const onConfirmSingle = (params) => {
    setOpen(false);
    setDate(params.date);
    console.log(params.date);
  };

  const Registrarse = async () => {
    await agent.requests.post("/register", {
      nombre: nombre,
      rut: rut,
      email: email,
      birthdate: inputDate,
    });
    console.log("Registrado con exito");
    navigation.navigate("Perfil");
  };

  return (
    <SafeAreaView style={styles.container}>
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
        />
      </View>
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
        />
      </View>
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
        />
      </View>
      {/*------------------------------------*/}
      <View style={styles.inputDate}>
        <Text>Fecha de nacimiento</Text>
        <DatePickerInput
          locale="es"
          label=""
          value={inputDate}
          onChange={(d) => {
            setInputDate(d);
            console.log(d);
          }}
          inputMode="start"
        />
      </View>
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
    paddingTop: 20,
    paddingLeft: 0,
    paddingBottom: 20,
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
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.2)", // Color de fondo rojo con transparencia
    padding: 8,
    marginTop: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
});
