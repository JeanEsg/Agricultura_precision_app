import { View, StyleSheet} from "react-native";
import { Stack } from "expo-router";
import { Logo } from "../components/Logo";

export default function Layout(){
    return (
        <View style={styles.app}>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: "green" },
                    headerTintColor: "white",
                    headerTitle: "Sistema de Monitoreo de Cultivos",
                    headerLeft: () => <Logo />,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
    },
});

