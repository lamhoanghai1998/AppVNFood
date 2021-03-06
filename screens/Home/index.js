import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { fetchDetails } from "../../store/actions/details";
import styles from "./styles";
import Card from "../../components/UI/Card";
import Btn from "../../components/UI/Btn";
import Input from "../../components/UI/Input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ticket from "../../components/UI/Ticket";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      await dispatch(fetchDetails());
      setIsLoading(false);
    };
    loadDetails();
  }, [dispatch]);

  const details = useSelector((state) => state.details.allDetails);
  const renderInfo = (id, name) => {
    props.navigation.navigate("info", {
      id,
      name,
    });
  };

  if (false) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <Input
          placeholder={"Tìm kiếm: Hiện tại - Đích đến"}
          style={styles.searchBar}
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <TouchableOpacity
          style={styles.searchButton}
          activeOpacity={0.6}
          onPress={() => {
            if (search)
              props.navigation.navigate("searchBar", {
                search,
              });
          }}
        >
          <Text style={styles.btnText}> Tìm kiếm </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {details.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.touchable}
            onPress={() => renderInfo(item.id, item.name)}
          >
            <Ticket item={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
