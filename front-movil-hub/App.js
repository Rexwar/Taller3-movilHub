import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import AuthStack from "./src/navigation/AuthStack";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthStack></AuthStack>
      </AuthProvider>
    </NavigationContainer>
  );
}
