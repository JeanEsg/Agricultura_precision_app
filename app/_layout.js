import { Text, View, StyleSheet, Dimensions} from "react-native";
import { Stack } from "expo-router";
import { Logo } from "../components/Logo";

export default function Layout(){
    return (
        <View style={styles.app}>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: "#01c459" },
                    headerTintColor: "white",
                    headerTitle: () =>(
                        <Text style={styles.headerTitle}>
                            Sistema de Monitoreo de Cultivos
                        </Text>
                    ),
                    headerLeft: () => (
                        <View style={styles.logo}>
                          <Logo />
                        </View>
                    ),
                }}
            />
                </View>
              );
            }

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    app: {
    flex: 1,
    },
    logo: {
    marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        flexWrap: "wrap",
        alignSelf: "center",
      },
});

