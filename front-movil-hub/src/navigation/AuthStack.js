import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { PaperProvider } from "react-native-paper";
//borrar despues
import UserEditScreen from "../screens/UserEditScreen";
import RepoScreen from "../screens/RepoScreen";
import InfoScreen from "../screens/InfoScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <PaperProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Perfil" component={UserEditScreen} />
        <Stack.Screen name="Repos" component={RepoScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default AuthStack;
