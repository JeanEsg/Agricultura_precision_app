import { StatusBar } from "expo-status-bar";
import { StyleSheet, View,} from "react-native";
import { Main } from "./components/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="dark-content" // Esto garantiza que los íconos sean visibles, incluso con un tema oscuro
        hidden={false} // Esto asegura que la barra de estado no esté oculta
        backgroundColor="transparent" // Hace que el fondo sea transparente 
        />
      <View style={styles.container}>
        <Main />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});