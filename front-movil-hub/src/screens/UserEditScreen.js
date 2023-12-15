import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const UserEditScreen = () => {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  // Suponiendo que email está almacenado aquí
  const email = "rey.valdes@alumnos.ucn.cl";

  useEffect(() => {
    // Llamada a la API para obtener los datos del usuario
    fetch(`https://192.168.56.1:8000/users?email=${email}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    // Llamada a la API para guardar los cambios
    fetch(`https://192.168.56.1:8000/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Usuario actualizado:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View>
      <Text>Editar Usuario</Text>
      <TextInput
        placeholder="Nombre"
        value={user.name}
        onChangeText={(text) => setUser({...user, name: text})}
      />
      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({...user, email: text})}
      />
      {/* Agrega aquí más campos según sea necesario */}
      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );
};

export default UserEditScreen;
