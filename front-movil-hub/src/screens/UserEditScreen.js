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
  const [birthdate, setBirthdate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [response, setResponse] = useState(false);

  

  const obtenerUsuario = async () => {
    try {
      //.
      const tok = await AsyncStorage.getItem("my-token");
      const value = await AsyncStorage.getItem("email");
      setEmail(value);
      console.log("tokenANTES: ", tok);
      console.log("email: ", value);
      const response = await fetch(
        `http://192.168.56.1:8000/api/user?email=${value}`,
        {
          headers: {
            method: "GET",
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      if (!response.ok) {
        //console.error("Error solicitud:", response);
        console.error("Error en la solicitud:", response.status);
        console.log("fecha: ", birthdate);
        return;
      }
      const userData = await response.json();
      setName(userData.name);
      //setBirthdate(userData.birthdate);
      console.log("birthdate: ", birthdate);
      //console.log("response: ", userData);
    } catch (error) {
      console.error("Error en la solicitud: aa", error.message);
    }
  };

  useEffect(() => {
    obtenerUsuario();
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
        {!email ? (
          <Text style={styles.cargando}>Cargando</Text>
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
              
               <TextInput
                style={styles.date}
                label="Fecha de Nacimiento"
                placeholder="DD/MM/AAAA"
                value={birthdate}
                onChange={(date) => setBirthdate(date)}
              /> 
              <TextInput
                label={"Nueva Contraseña"}
                style={styles.pass}
                placeholder="ingrese nueva contraseña"
                value={newPassword}
                onChangeText={(pass) => setNewPassword(pass)}
              />
              <Text></Text>
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
    paddingBottom: 50,
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
    marginBottom: 5,
  },
  date: {
    marginVertical: 10,
  },
  cargando: {
    alignSelf: "center",
    fontSize: 40,
  },
  password: {
    marginVertical: 400,
  },
});
