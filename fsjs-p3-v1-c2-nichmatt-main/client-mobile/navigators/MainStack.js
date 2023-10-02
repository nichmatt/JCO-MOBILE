import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../Screen/DetailScreen";
import HomeScreen from "../Screen/HomeScreen";
import SettingScreen from "../Screen/SettingScreen";

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
