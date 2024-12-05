import { Tabs } from "expo-router";
import { HomeIcon, InfoIcon } from "../../components/icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#01c459",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />

            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarIcon: ({ color }) => <InfoIcon color={color} />,
                }}
            />      
        </Tabs>
        );
    }