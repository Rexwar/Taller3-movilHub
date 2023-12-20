import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';


/**
 * Pantalla de edición de usuario.
 * Permite a los usuarios editar su información personal, como nombre, email, fecha de nacimiento y contraseña.
 * Los cambios se envían a un servidor para su actualización.
 *
 * @param {object} navigation - Objeto de navegación para la transición entre pantallas.
 * @returns {JSX.Element} Componente de la pantalla de edición de usuario.
 */
const UserEditScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});

   /**
   * Obtiene los datos del usuario desde el servidor.
   * Carga los datos del usuario almacenados en AsyncStorage y realiza una petición GET para obtener la información actual del usuario.
   */
  const obtenerUsuario = async () => {
    // Resetear los errores
    setErrors({});
    try {
      //Cargamos el token y el email del usuario que se guardaron cuando se logueo o registro
      const tok = await AsyncStorage.getItem("my-token");
      setToken(tok);
      const value = await AsyncStorage.getItem("email");
      setUser({ ...user, email: value });
      //console.log("token-cargado: ", tok);
      //console.log("email: ", value);
      const response = await fetch(
        `${API_URL}/api/user?email=${value}`,
        {
          headers: {
            method: "GET",
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          console.error("Error de token no válido");
          navigation.navigate("Login");
        }
        const errorData = await response.json();
        setErrors(errorData); // Asumiendo que el backend envía errores en un formato { campo: mensaje }
        return;
      }
      //se recibe con datos extra asi que solo sacamos los datos que necesitamos
      
      const userData = await response.json();
      console.log("userData: ", userData);
      const datosUser = {
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        password: "",
      };
      //console.log("datosUser: ", datosUser);
      setUser(datosUser);
      console.log("user: ", user);
    } catch (error) {
      console.error("Error en la solicitud: aa", error.message);
    }
  };
/**
   * Se ejecuta al montar y actualizar el componente.
   * Llama a obtenerUsuario para cargar los datos del usuario.
   */
  useEffect(() => {
    obtenerUsuario();
    // Llamada a la API para obtener los datos del usuario
  }, []);


  /**
   * Maneja el guardado de los cambios del usuario.
   * Actualiza la información del usuario en el servidor. Si se proporciona una nueva contraseña, también se actualiza.
   */
  const handleSave = async () => {
    //console.log("tokenazoo: ", token);
    //console.log("updatedUser: ", user);
    if (newPassword) {
      user.password = newPassword;
    }
    try {
      
      const response = await fetch(`${API_URL}/api/userEdit`, 
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const data = await response.json();
      console.log("aca",data);
      setErrors(data);
      console.log("aca2",errors);
      //console.log("Usuario actualizado:", data);
      
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View>
        <Button style={styles.buttonGit}
      icon={() => <Icon name="github" size={40} color="black" />} // Asegúrate de usar el nombre correcto del ícono
      onPress={() => navigation.navigate("Repos")}
    >
      Repositorios
    </Button>
          {!token ? (
            <Text style={styles.cargando}>Cargando</Text>
          ) : (
            <Card style={styles.cardStyle2}>
              <Card.Title title="Perfil" />
              <Card.Content style={styles.cardStyle}>
                <Text>Editar Usuario</Text>
                <TextInput
                  style={styles.inputs}
                  label={"Nombre"}
                  placeholder="Nombre"
                  value={user.name}
                  onChangeText={(text) => setUser({ ...user, name: text })}
                />
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : ( <View style={styles.espacio}></View> ) 
                }
                <TextInput
                  label={"Email"}
                  style={styles.input2}
                  placeholder="Email"
                  value={user.email}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                />
                {errors.email ?  (<Text style={styles.errorText}>{errors.email}</Text>
                ) : ( <View style={styles.espacio}></View> )}
                <TextInput
                  style={styles.date}
                  label="Fecha de Nacimiento"
                  placeholder="DD/MM/AAAA"
                  value={user.birthdate}
                  onChange={(date) => setUser({ ...user, birthdate: date })}
                />
                <TextInput
                  label={"Nueva Contraseña"}
                  style={styles.pass}
                  placeholder="ingrese nueva contraseña"
                  value={user.password}
                  onChangeText={(pass) => setUser({ ...user, password: pass })}
                />
                <Text></Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={handleSave}>Guardar Cambios</Button>
              </Card.Actions>
            </Card>
          )}
        </View>
      </ScrollView>
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
    marginTop: 5,
  },
  input2: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 15,
  },
  cargando: {
    alignSelf: "center",
    fontSize: 40,
  },
  password: {
    marginVertical: 400,
  },
  errorText: {
    color: "red",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  espacio: {
    height: 15,
  },
  buttonGit: {
    margin: 5,
    backgroundColor: "#42f2a2",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 50,
  },
});
