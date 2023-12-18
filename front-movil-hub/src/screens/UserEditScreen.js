import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  es,
  DatePickerInput,
  registerTranslation,
} from "react-native-paper-dates";

const UserEditScreen = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [response, setResponse] = useState(false);

  const cargarStorage = async () => {
    //const email = "rey.valdes@alumnos.ucn.cl";
    try {
      const value = await AsyncStorage.getItem("email");
      const tok = await AsyncStorage.getItem("my-token");
      console.log("tok: ", tok);
      setEmail(value);
      obtenerUsuario();
      setToken(tok); //  <-- token
      console.log("token cargado: ", token);
      
      setResponse(true);
        
      
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const obtenerUsuario = async () => {
    try {
      const response = await fetch(
        `http://192.168.56.1:8000/api/user?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Error en la solicitud:", response.status);
        console.log("fecha: ", birthdate);
        console.log("token: ", token);
        return;
      }
      const userData = await response.json();
      setName(userData.name);
      setBirthdate(userData.birthdate);
      //console.log("response: ", userData);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  useEffect(() => {
    cargarStorage();
    // Llamada a la API para obtener los datos del usuario
  }, []);

  const handleSave = () => {
    // Llamada a la API para guardar los cambios
    fetch(`https://192.168.56.1:8000/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Usuario actualizado:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        {!response ? (
          <Text>cargando</Text>
        ) : (
          <Card style={styles.cardStyle2}>
            <Card.Title title="Perfil" subtitle={user.name} />
            <Card.Content style={styles.cardStyle}>
              <Text>Editar Usuario</Text>
              <TextInput
                style={styles.inputs}
                label={"Nombre"}
                placeholder="Nombre"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                label={"Email"}
                style={styles.input2}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <DatePickerInput
                style={styles.date}
                label="Fecha de Nacimiento"
                value={birthdate}
                onChange={(date) => setBirthdate(date)}
                locale={"es"}
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={handleSave}>Guardar Cambios</Button>
            </Card.Actions>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserEditScreen;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 35,
  },
  cardStyle: {
    backgroundColor: "#dedede",
    margin: 8,
    borderRadius: 5,
    paddingBottom: 100,
  },
  cardStyle2: {
    backgroundColor: "#fefede",
    margin: 8,
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 20,
  },
  inputs: {
    marginVertical: 10,
  },
  input2: {
    marginBottom: 40,
  },
  date: {
    marginVertical: 20,
  },
});
