import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";

function SettingScreen() {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <Navbar />
          <View>
            <Text style={style.text1}>Setting Screen</Text>
            <Button
              title="Go to Detail Screen"
              onPress={() => navigation.navigate("Detail")}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const style = StyleSheet.create({
  text1: {
    fontSize: 50,
  },
});

export default SettingScreen;
