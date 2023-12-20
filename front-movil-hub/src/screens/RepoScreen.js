/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, GITHUB_API_KEY } from '@env';

/**
 * Pantalla que muestra una lista de repositorios y permite navegar a los detalles de cada repositorio.
 * @param {object} navigation - Objeto de navegación para cambiar de pantalla.
 * @returns {JSX.Element} Componente de pantalla de repositorios.
 */
const RepoScreen = ({ navigation }) => {
  const [repositorios, setRepositorios] = useState([]);

  /**
   * Función para obtener la lista de repositorios desde la API de GitHub.
   */
  useEffect(() => {
    const getRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/dizkm8/repos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `token ${GITHUB_API_KEY}`
          }
        });
        const data = await response.json();
        console.log("Repos: ", data);
        setRepositorios(data);
      } catch (e) {
        console.log("Error: ", e);
      }
    }
    getRepos();
  }, []);

  /**
   * Función para generar un color aleatorio en formato hexadecimal.
   * @returns {string} Color en formato hexadecimal (#RRGGBB).
   */
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          fontSize={15}
          textColor="black"
          style={styles.botonPerfil}
          onPress={() => navigation.navigate("Perfil")}
        >
          Volver a Editar Perfil
        </Button>
        <Text style={styles.texto}>Repositorios</Text>
        <View>
          <FlatList
            data={repositorios}
            keyExtractor={(repo) => repo.id.toString()}
            renderItem={({ item }) => (
              <Button
              textColor="black"
              
                onPress={() => navigation.navigate('InfoScreen', { nombreRepo: item.name })}
                labelStyle={styles.buttonLabel}
                style={[styles.repoItem, { backgroundColor: getRandomColor() }]}
              >
                {item.name}
              </Button>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80 },
  botonPerfil: {
    backgroundColor: "#1f65ff",
    padding: 5,
    borderRadius: 5,
    margin: 5,
    marginHorizontal: 50,
  },
  buttonLabel: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',

  },
  repoItem: {
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 5,
    padding: 10,
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  }
});
