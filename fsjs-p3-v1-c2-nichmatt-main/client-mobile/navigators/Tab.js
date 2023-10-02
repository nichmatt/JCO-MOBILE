import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "./MainStack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screen/HomeScreen";
import DetailScreen from "../Screen/DetailScreen";
import SettingScreen from "../Screen/SettingScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            const iconName = focused ? "ios-home" : "ios-home-outline";
            const colorIcon = focused ? "orange" : "grey";
            return <Ionicons name={iconName} size={size} color={colorIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            const iconName = focused ? "apps" : "apps-outline";
            const colorIcon = focused ? "orange" : "grey";
            return <Ionicons name={iconName} size={size} color={colorIcon} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
