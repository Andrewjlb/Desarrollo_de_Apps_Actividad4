import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 

type FormularioScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Formulario"
>;

type FormularioScreenRouteProp = RouteProp<RootStackParamList, "Formulario">;

const Formulario = () => {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [estado, setEstado] = useState("1");

  const route = useRoute<FormularioScreenRouteProp>();
  const navigation = useNavigation<FormularioScreenNavigationProp>();

  const student = route.params?.student;

  useEffect(() => {
    if (student) {
      setCedula(student.cedula);
      setNombre(student.nombre);
      setApellido(student.apellido);
      setEmail(student.email);
      setEdad(student.edad.toString());
      setEstado(student.estado === 1 ? "1" : "0");
    }
  }, [student]);

  const handleSubmit = async () => {
    if (student) {
      try {
        await axios.put(`http://192.168.100.6:5000/api/estudiante/${cedula}`, {
          nombre,
          apellido,
          email,
          edad,
          estado: Number(estado),
        });
        navigation.navigate("index");
      } catch (error) {
        console.error("Error al actualizar el estudiante", error);
      }
    } else {
      try {
        await axios.post("http://192.168.100.6:5000/api/estudiante", {
          cedula,
          nombre,
          apellido,
          email,
          edad,
          estado: Number(estado),
        });
        navigation.navigate("index");
      } catch (error) {
        console.error("Error al agregar el estudiante", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {student ? "Editar Estudiante" : "Agregar Estudiante"}
      </Text>

      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        editable={!student}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        style={styles.input}
      />

      <Picker
        selectedValue={estado}
        onValueChange={setEstado}
        style={styles.picker}
      >
        <Picker.Item label="Activo" value="1" />
        <Picker.Item label="Inactivo" value="0" />
      </Picker>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleSubmit}
        >
          <Ionicons name="person-add" size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {student ? "Actualizar" : "Agregar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  picker: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: "#007bff",
  },
  addButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Formulario;
