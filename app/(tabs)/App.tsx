import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // Asegúrate de que este archivo esté correcto

import index from './index'; // Aquí está el archivo de inicio
import Formulario from './Formulario'; // El formulario para agregar o editar estudiantes



const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index"> 
        {/* Pantalla principal */}
        <Stack.Screen name="index" component={index} />
        <Stack.Screen name="Formulario" component={Formulario} />

        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
