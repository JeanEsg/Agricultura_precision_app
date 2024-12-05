import { StyleSheet, Text, View, TextInput, Alert, ScrollView, Pressable} from "react-native";
import React, { useState } from "react";
import useApi from "../lib/ADP";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Graficos } from "./Graficos";

export function Main() {
  const {
    sensorData,
    obtenerDatosSensor,
    guardarDatos,
    calcularCantidadAgua,
    generarRecomendacion,
    obtenerTodosDataSensor,
  } = useApi();
  
  const insets = useSafeAreaInsets();

  const [waterInput, setWaterInput] = useState("");
  const [recommendationInput, setRecommendationInput] = useState("");
  const [result, setResult] = useState("");
  const [waterResult, setWaterResult] = useState("");
  const [recommendationResult, setRecommendationResult] = useState("");
  const [allResult, setAllResult] = useState("");

  // Manejar obtener datos del sensor
  const handleObtenerDatos = async () => {
    try {
      const data = await obtenerDatosSensor();
  
      // Formatea los datos obtenidos en un formato más legible
      const formattedData = data.map((item) => `
        - Temperatura: ${item.temperatura}°C
        - Humedad del Aire: ${item.humedad_aire}%
        - Humedad del Suelo: ${item.humedad_suelo}%
        - Fecha: ${item.tiempo.dia}/${item.tiempo.mes}/${item.tiempo.año}
      `).join("\n");
  
      setResult(`Datos obtenidos:\n${formattedData}`);
    } catch (error) {
      setResult(`Error al obtener datos: ${error.message}`);
    }
  };

  // Manejar guardar datos
  const handleGuardarDatos = async () => {
    try {
      if (!sensorData) {
        Alert.alert("Error", "Primero obtén los datos del sensor");
        return;
      }
      const response = await guardarDatos();
      Alert.alert("Éxito", `Datos guardados exitosamente: ${response}`);
    } catch (error) {
      Alert.alert("Error", `Error al guardar datos: ${error.message}`);
    }
  };

  // Manejar cálculo de litros de agua
  const handleCalcularAgua = async () => {
    try {
      const result = await calcularCantidadAgua(waterInput);
      setWaterResult(`Litros calculados: ${result}`);
    } catch (error) {
      setWaterResult(`Error: ${error.message}`);
    }
  };

  // Manejar generación de recomendaciones
  const handleGenerarRecomendacion = async () => {
    try {
      const result = await generarRecomendacion(recommendationInput);
      setRecommendationResult(`Recomendación: ${result}`);
    } catch (error) {
      setRecommendationResult(`Error: ${error.message}`);
    }
  };

  const handleGrafico = async () => {
    try {
      const data = await obtenerTodosDataSensor();
  
      // Verifica que 'data' sea un arreglo o el formato esperado
      if (!data || !Array.isArray(data) || data.length === 0) {
        setAllResult("No hay datos disponibles para generar los gráficos.");
        return;
      }
  
      setAllResult(data);
    } catch (error) {
      setAllResult(`Error al obtener datos: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Obtener Datos del Sensor */}
        <View style={styles.section}>
        <Pressable style={styles.button} onPress={handleObtenerDatos}>
            <Text style={styles.buttonText}>OBTENER DATOS</Text>
          </Pressable>
          <Text style={styles.result}>{result}</Text>
        </View>

        {/* Guardar Datos */}
        <View style={styles.section}>
        <Pressable style={styles.button} onPress={handleGuardarDatos}>
            <Text style={styles.buttonText}>GUARDAR DATOS</Text>
          </Pressable>
        </View>

        {/* Calcular Litros de Agua */}
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Área, temperatura, humedad aire, humedad suelo"
            value={waterInput}
            onChangeText={setWaterInput}
            multiline={true}
            textAlignVertical="top"
          />
           <Pressable style={styles.button} onPress={handleCalcularAgua}>
            <Text style={styles.buttonText}>CALCULAR LITROS DE AGUA</Text>
          </Pressable>
          <Text style={styles.result}>{waterResult}</Text>
        </View>

        {/* Generar Recomendaciones */}
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Escribe para recibir una recomendación"
            value={recommendationInput}
            onChangeText={setRecommendationInput}
            multiline={true}
            textAlignVertical="top"
          />
           <Pressable style={styles.button} onPress={handleGenerarRecomendacion}>
            <Text style={styles.buttonText}>OBTENER RECOMENDACIONES</Text>
          </Pressable>
          <Text style={styles.result}>{recommendationResult}</Text>
        </View>

        {/* Generar Graficos */}
        <View style={styles.section}>
           <Pressable style={styles.button} onPress={handleGrafico}>
            <Text style={styles.buttonText}>Generar Graficas</Text>
          </Pressable>
          <Graficos datos= { allResult } />
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  section: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: '#01c459',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',

  },
});