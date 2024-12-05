import { useState } from "react";


const useApi = () => {
  const [sensorData, setSensorData] = useState(null);
  const [aguaData, setAguaData] = useState("");
  const [recomendacionResult, setRecomendacionResult] = useState("");
  const [allSensorData, setAllSensorData] = useState(null);

  const obtenerDatosSensor = async () => {
    try {
      const response = await fetch("https://agricultura-precision-service.onrender.com/sensor-data");
      const data = await response.json();
      setSensorData(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los datos del sensor:", error);
      throw error;
    }
  };

  const guardarDatos = async () => {
    if (!sensorData) {
      throw new Error("Primero obtén los datos del sensor");
    }
    try {
      const response = await fetch("https://agricultura-precision-service.onrender.com/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sensorData),
      });
      if (!response.ok) {
        throw new Error(`Error al guardar datos: ${response.statusText}`);
      }
      const result = await response.text();
      return result;
    } catch (error) {
      console.error("Error al guardar datos:", error);
      throw error;
    }
  };

  const calcularCantidadAgua = async (aguaInput) => {
    const datos = aguaInput.split(",").map((x) => parseFloat(x.trim()));
    if (datos.length !== 4) {
      throw new Error(
        "Debes proporcionar exactamente cuatro valores separados por comas",
      );
    }
    const requestBody = {
      area: datos[0],
      temperatura: datos[1],
      humedad_aire: datos[2],
      humedad_suelo: datos[3],
    };
    try {
      const response = await fetch("https://agricultura-precision-service.onrender.com/cantidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(
          `Error al calcular cantidad de agua: ${response.statusText}`,
        );
      }
      const result = await response.text();
      setAguaData(result);
      return result;
    } catch (error) {
      console.error("Error al calcular cantidad de agua:", error);
      throw error;
    }
  };

  const generarRecomendacion = async (promptInput) => {
    const requestBody = { prompt: promptInput };
    try {
      const response = await fetch("https://agricultura-precision-service.onrender.com/generar_respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(
          `Error al generar recomendación: ${response.statusText}`,
        );
      }
      const data = await response.json();
      const cleanData = data.response.replace(/\*\*/g, "");
      setRecomendacionResult(cleanData);
      return cleanData;
    } catch (error) {
      console.error("Error al generar recomendación:", error);
      throw error;
    }
  };
  
  const obtenerTodosDataSensor = async () => {
    try {
      const response = await fetch("https://agricultura-precision-service.onrender.com/data");
      const data = await response.json();
      setAllSensorData(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los datos del sensor:", error);
      throw error;
    }
  };

  return {
    sensorData,
    aguaData,
    recomendacionResult,
    obtenerDatosSensor,
    guardarDatos,
    calcularCantidadAgua,
    generarRecomendacion,
    obtenerTodosDataSensor,
  };
};

export default useApi;
