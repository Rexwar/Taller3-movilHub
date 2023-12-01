import { useState } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native"
import ConfettiCannon from 'react-native-confetti-cannon';
import { Audio } from 'expo-av';

const SecScreen = ({ navigation }) => {
    var [texto, cambiarTexto] = useState("Hola!");
    var [showConfetti, setShowConfetti] = useState(false);

    const handlePress = async () => {
        cambiarTexto("Felicidades por tu ascenso hermanita!");
        setShowConfetti(true);
        
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../assets/sngs/celebration.mp3'));
            await soundObject.playAsync();
            // Tu lógica adicional aquí
        } catch (error) {
            // Manejo de errores
            console.error(error);
        }

    }


    return (
        <SafeAreaView style={{flex:1, justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 25}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold',paddingBottom:40}}>{texto}</Text>
                    
                    <Button style={styles.button} title="Presioname!" onPress={handlePress} ></Button>
                </View>
                    <View style={styles.ConfettiCannon}>
                        
                        {showConfetti && <ConfettiCannon count={70} origin={{x: 0, y: 0}} />}
                    </View>
            </View>
        </SafeAreaView>
    )};

export default SecScreen;

const styles = StyleSheet.create({
    button: {
        width: "300 !important",
        color: 'white !important',
        
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    ConfettiCannon: {
        paddingTop:50,
    }

});