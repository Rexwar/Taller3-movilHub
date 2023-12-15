import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, PaperProvider } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const getSessionData = async () => {
    try {
      const tok = await AsyncStorage.getItem("my-token");
      const emailSaved = await AsyncStorage.getItem("email");
      if (tok !== null && emailSaved !== null) {
        setToken(tok);
        setEmail(emailSaved);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getSessionData();
  }, []);

  return (
      <SafeAreaView style={styles.safe}>
        
          <Card>
            <Text> Tu Email: {email}</Text>
          </Card>
          <Text> Perfil hoho </Text>
       
      </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safe: { paddingTop: 35 },
});

