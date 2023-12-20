import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";

import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';


//con route a diferencia de navigation se puede acceder a los parametros que se le pasan a la pantalla.
const InfoScreen = ({route,navigation}) => {
    const [commits, setCommits] = useState([]);
    //esta en corchetes porque es un objeto
    const {nombreRepo} = route.params;

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

    useEffect(() => {
        BuscarCommits();
    }
    ,[])

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <Button onPress={() => navigation.navigate("Repos")}>Volver</Button>
         <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10}}>{nombreRepo}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10}}>Commits</Text>
            <FlatList
              data={commits.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date))}
              keyExtractor={(comit) => comit.sha}
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

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 80 },
    card: {
      margin: 10,
      borderRadius:5,
      borderColor: '#000000',
    },
});