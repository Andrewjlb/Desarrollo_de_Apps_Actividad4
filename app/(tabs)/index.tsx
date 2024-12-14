import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { Ionicons } from "@expo/vector-icons"; // Importar íconos

type IndexScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "index"
>;

const Index = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<IndexScreenNavigationProp>();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://192.168.100.6:5000/api/estudiante"
      );
      const studentsArray = Object.values(response.data);
      setStudents(studentsArray);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchStudents cada vez que la pantalla tiene el foco
  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

  const handleNavigateToFormulario = (student?: any) => {
    navigation.navigate("Formulario", {
      student,
      onSave: fetchStudents,
    });
  };

  const deleteStudent = async (cedula: string) => {
    const handleDelete = async () => {
      try {
        await axios.delete(`http://192.168.100.6:5000/api/estudiante/${cedula}`);
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.cedula !== cedula)
        );
        Alert.alert("Éxito", "El estudiante ha sido eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el estudiante:", error);
        Alert.alert("Error", "No se pudo eliminar el estudiante.");
      }
    };

    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar este estudiante?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: handleDelete },
      ]
    );
  };

  const renderRow = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.cedula}</Text>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.apellido}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.edad}</Text>
      <Text style={styles.cell}>{item.estado ? "Activo" : "Inactivo"}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => handleNavigateToFormulario(item)}
          style={styles.editButton}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteStudent(item.cedula)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"\n"}Tabla de Estudiantes</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleNavigateToFormulario()}
      >
        <Text style={styles.addButtonText}>Agregar Estudiante</Text>
      </TouchableOpacity>

      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Cédula</Text>
        <Text style={styles.cell}>Nombre</Text>
        <Text style={styles.cell}>Apellido</Text>
        <Text style={styles.cell}>Email</Text>
        <Text style={styles.cell}>Edad</Text>
        <Text style={styles.cell}>Estado</Text>
        <Text style={styles.cell}>Acciones</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.cedula}
          renderItem={renderRow}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 30,
    width: "50%",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 5,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
});

export default Index;
