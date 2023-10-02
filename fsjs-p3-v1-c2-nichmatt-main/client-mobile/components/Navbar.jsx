import { StyleSheet, Text, View } from "react-native";

function Navbar() {
  return (
    <>
      <View style={styles.nav}>
        <Text style={styles.title}>JCO</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    // height: 40,
    backgroundColor: "white",
    borderBottomColor: "orange",
    borderBottomWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  title: {
    fontSize: 30,
    height: 60,
    padding: 20,
    margin: 5,
    color: "#5F1B00",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default Navbar;
