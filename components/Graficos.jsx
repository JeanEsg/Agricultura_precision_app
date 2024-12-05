import React, { useState, useEffect } from "react";
import { View, Dimensions, Text, Pressable, StyleSheet, ScrollView} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Picker } from '@react-native-picker/picker';


export function Graficos({ datos }) {
  const [tipo, setTipo] = useState("temperatura");
  const [rangoTiempo, setRangoTiempo] = useState("dia"); // Estado para el rango temporal
  
  const screenWidth = Dimensions.get("window").width;

  if(!datos){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Cargando datos...</Text>
      </View>
    );
  }

  if (!Array.isArray(datos)) {
    return <Text>Error: Los datos no son un arreglo o están vacíos.</Text>;
  }

  // Función para filtrar datos por rango temporal
  const filtrarDatosPorRango = (datos, tipo, rangoTiempo) => {
    const ahora = new Date();

    return datos
      .filter((item) => {
        if (!item.tiempo) return false;
        const fecha = new Date(item.tiempo.fecha);

        switch (rangoTiempo) {
          case "dia":
            return (
              fecha.getDate() === ahora.getDate() &&
              fecha.getMonth() === ahora.getMonth() &&
              fecha.getFullYear() === ahora.getFullYear()
            );
          case "semana":
            const inicioSemana = new Date(
              ahora.setDate(ahora.getDate() - ahora.getDay())
            );
            return fecha >= inicioSemana && fecha <= new Date();
          case "mes":
            return (
              fecha.getMonth() === ahora.getMonth() &&
              fecha.getFullYear() === ahora.getFullYear()
            );
          case "ano":
            return fecha.getFullYear() === ahora.getFullYear();
          default:
            return true;
        }
      })
      .map((item) => ({
        fecha: item.tiempo ? new Date(item.tiempo.fecha).toLocaleString() : "",
        valor: item[tipo],
      }));
  };

  // Función para generar etiquetas
  const generarLabels = (datosFiltrados) => {
    return datosFiltrados.map((item) => item.fecha.split(",")[0]); // Solo el día y mes
  };

  // Filtrar datos y generar etiquetas dinámicamente
  const datosFiltrados = filtrarDatosPorRango(datos, tipo, rangoTiempo);
  const valoresFiltrados = datosFiltrados.map((item) => item.valor);
  const etiquetasFiltradas = generarLabels(datosFiltrados);

  // Función para obtener color dinámico según el tipo
  const obtenerColor = (tipo) => {
    switch (tipo) {
      case "temperatura":
        return "rgba(255, 99, 132, 1)";
      case "humedadAire":
        return "rgba(54, 162, 235, 1)";
      case "humedadSuelo":
        return "rgba(75, 192, 192, 1)";
      default:
        return "rgba(153, 102, 255, 1)";
    }
  };
  
  return (
    <View>
      <Text style={styles.titulo}>
        Gráfico de {tipo === "temperatura" ? "Temperatura" : tipo === "humedadAire" ? "Humedad del Aire" : "Humedad del Suelo"}
      </Text>

      {/* Selector de rango temporal */}
      <Picker
        selectedValue={rangoTiempo}
        style={styles.picker}
        onValueChange={(itemValue) => setRangoTiempo(itemValue)}
      >
        <Picker.Item label="Hoy" value="dia" />
        <Picker.Item label="Esta Semana" value="semana" />
        <Picker.Item label="Este Mes" value="mes" />
        <Picker.Item label="Este Año" value="ano" />
      </Picker>

      {/* Gráfico de Línea */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <LineChart
            data={{
              labels: etiquetasFiltradas,
              datasets: [
                {
                  data: valoresFiltrados,
                },
              ],
            }}
            width={screenWidth * 3}
            height={220}
            yAxisSuffix={tipo === "temperatura" ? "°C" : "%"}
            chartConfig={{
              backgroundColor: "#f1f1f1",
              backgroundGradientFrom: "#1E2923",
              backgroundGradientTo: "#08130D",
              decimalPlaces: 2,
              color: (opacity = 1) => obtenerColor(tipo),
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>

      {/* Botones para seleccionar el tipo de gráfico */}
      <Pressable style={styles.button} onPress={() => setTipo("temperatura")} >
        <Text style={styles.buttonText}>Mostrar Temperatura</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setTipo("humedad_aire")} >
        <Text style={styles.buttonText}>Mostrar Humedad Aire</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setTipo("humedad_suelo")} >
        <Text style={styles.buttonText}>Mostrar Humedad Suelo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  button: {
    backgroundColor: '#01c459',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

