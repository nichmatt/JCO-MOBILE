import { useNavigation } from "@react-navigation/native";
import {
  Button,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { useQuery, gql } from "@apollo/client";
import { GET_PRODUCTS } from "../queries/productQuery";

function HomeScreen() {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  console.log(loading, error, data);
  if (loading) return <ActivityIndicator size={"large"} />;
  if (error) return <Text>Error : {error.message}</Text>;
  // return <Text>test</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <FlatList
        data={data.getAllItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.push("Detail", { productId: item.id })}
          >
            <Image source={{ uri: item.imgUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>Rp.{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: 35,
  },
  card: {
    flex: 1,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 3,
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  cardContent: {
    paddingVertical: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 10,
  },
  price: {
    fontSize: 12,
    fontWeight: "normal",
    textAlign: "left",
    paddingLeft: 10,
  },
  description: {
    marginTop: 8,
    color: "#555",
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
});

export default HomeScreen;
