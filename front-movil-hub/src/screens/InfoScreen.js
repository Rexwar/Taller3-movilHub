/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

// Importa la URL de la API desde una variable de entorno
import { API_URL } from '@env';

/**
 * Pantalla de detalle de repositorio que muestra los commits de un repositorio de GitHub.
 * @param {object} route - Objeto de ruta que contiene los parámetros de navegación.
 * @param {object} navigation - Objeto de navegación para cambiar de pantalla.
 * @returns {JSX.Element} Componente de pantalla de detalle de repositorio.
 */
const InfoScreen = ({ route, navigation }) => {
  // Estado para almacenar la lista de commits
  const [commits, setCommits] = useState([]);
  // Extrae el nombre del repositorio de los parámetros de la ruta
  const { nombreRepo } = route.params;

  /**
   * Función asincrónica para buscar commits en la API de GitHub.
   * @async
   * @function BuscarCommits
   */
  const BuscarCommits = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/Dizkm8/${nombreRepo}/commits`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Commits: ", data);
      setCommits(data);
    } catch (error) {
      console.error("Error en la solicitud: ", error.message);
    }
  }

  // Efecto secundario para buscar los commits cuando el componente se monta
  useEffect(() => {
    BuscarCommits();
  }, []);

  // Renderiza la pantalla
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {/* Botón para navegar atrás */}
          <Button onPress={() => navigation.navigate("Repos")}>Volver</Button>
          {/* Título del repositorio */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>{nombreRepo}</Text>
          {/* Título de los commits */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>Commits</Text>
          {/* Lista de commits utilizando FlatList */}
          <FlatList
            data={commits.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date))}
            keyExtractor={(commit) => commit.sha}
            renderItem={({ item }) => (
              <View>
                <Card style={styles.card}>
                  <Card.Title title={item.commit.author.name} subtitle={new Date(item.commit.author.date).toLocaleDateString()} left={(props) => <Icon {...props} name="github" />} />
                  <Card.Content>
                    <Text>{item.commit.message}</Text>
                  </Card.Content>
                </Card>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default InfoScreen;

// Estilos CSS para la pantalla
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80 },
  card: {
    margin: 10,
    borderRadius: 5,
    borderColor: '#000000',
  },
});
