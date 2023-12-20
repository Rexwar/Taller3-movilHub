import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL, GITHUB_API_KEY} from '@env';

const RepoScreen = ({navigation}) => {
    const [repositorios, setRepositorios] = useState([]);

useEffect(() => {
    const getRepos = async () => {
        try{
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
        }catch(e){
            console.log("Error: ", e);
        }  
    }
    getRepos();
}, []
)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button  style={styles.botonPerfil} onPress={() => navigation.navigate("Perfil")}>Perfil</Button>
        <View>
        <FlatList
        data={repositorios}
        keyExtractor={(repo) => repo.id.toString()}
        renderItem={({ item }) => (
          <Button
            onPress={() => navigation.navigate('InfoScreen', { nombreRepo: item.name })}
            labelStyle={styles.buttonLabel}
            style={styles.repoItem}
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
  },
    buttonLabel: {
        fontSize: 15,
        textAlign: 'left',
    },repoItem: {
        backgroundColor: '#ffffff',
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 5,
        padding: 10,
    },
});
