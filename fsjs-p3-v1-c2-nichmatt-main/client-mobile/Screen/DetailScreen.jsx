// import { useNavigation } from "@react-navigation/native";
// import { Button, Text, View } from "react-native";
// import { StyleSheet } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import Navbar from "../components/Navbar";

// function DetailScreen() {
//   const navigation = useNavigation();
//   return (
//     <>
//       <SafeAreaProvider>
//         <SafeAreaView>
//           <Navbar />
//           <View>
//             <Text style={style.text1}>Detail Screen</Text>
//             <Button
//               title="Go to Home Screen"
//               onPress={() => navigation.navigate("Home")}
//             />
//           </View>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </>
//   );
// }

// const style = StyleSheet.create({
//   text1: {
//     fontSize: 50,
//   },
// });

// export default DetailScreen;
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_DETAIL } from "../queries/productQuery";
import { GET_USERS_DETAIL } from "../queries/userQuery";

function DetailScreen({ route }) {
  const { productId } = route.params;
  console.log(productId, "ini productid nya");
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(GET_PRODUCTS_DETAIL, {
    variables: {
      id: +productId,
    },
  });

  console.log(data, "ini DATA DETAILNYA");

  // const {
  //   loading: loadingUser,
  //   error: errorUser,
  //   dataUser,
  // } = useQuery(GET_USERS_DETAIL, {
  //   variables: {
  //     id: data.getItem.authorId,
  //   },
  // });

  // console.log(dataUser, "ini data user nya dari detail");

  if (loading) return <ActivityIndicator size={"large"} />;
  if (error) return <Text>Error : {error.message}</Text>;
  // console.log(dataUser, "ini dataUsernya dari detail");

  return (
    // <SafeAreaView style={styles.container}>
    <>
      <Navbar />
      <View style={styles.contentContainer}>
        <View style={styles.contentContainerInner}>
          <Image
            source={{
              uri: data.getItem.imgUrl,
            }}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{data.getItem.name}</Text>
            <Text style={styles.price}>Rp. {data.getItem.price}</Text>
            <Text style={styles.description}>{data.getItem.description}</Text>
            <Text style={styles.name}>
              CreatedBy: {data.getItem.user.username}
            </Text>
            <Text style={styles.email}>Email: {data.getItem.user.email}</Text>
            <Button
              title="Go to Home Screen"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </View>
    </>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  contentContainerInner: {
    borderRadius: 30,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  image: {
    // borderRadius: 0,
    width: "100%",
    height: 300,
    resizeMode: "cover",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    // elevation: 4,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  description: {
    marginVertical: 15,
    fontSize: 14,
    lineHeight: 20,
  },
  name: {
    // marginVertical: 5,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "bold",
  },
  email: {
    // marginVertical: 5,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "bold",
  },
});

export default DetailScreen;
