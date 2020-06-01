import React, { useState, useReducer } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../store/actions/auth";
import { LOGIN, REGISTER } from "../../store/actions/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Btn from "../../components/UI/Btn";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const formReducer = (state, { type, key, payload }) => {
  switch (type) {
    case "INPUT":
      if (key === "email") return { ...state, email: payload };
      else return { ...state, password: payload };
    default:
      return state;
  }
};

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = React.useState({
    username: "", password: "", name: "", phone_number: ""
  })
  const [screen, setScreen] = useState(true);
  const errorAlert = (error) => {
    Alert.alert("Error", error, [{ text: "OK" }], { cancelable: false });
  };

  const inputHandler = ({ text, key }) => {
    setFormState({ ...formState, [key]: text })
  };

  const authHandler = async (type) => {
    console.log("calling", type);
    if (formState.email && formState.password) {
      let event;
      if (type === LOGIN) event = LOGIN;
      else event = REGISTER;

      const error = await dispatch(
        auth(event, formState)
      );
      if (error) {
        errorAlert(error);
      }
    } else {
      errorAlert("Vui lòng điền vào chỗ trống");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.screen}>
          <Image
            style={styles.image}
            source={require("../../assets/images/5228.jpg")}
          />
          <View style={styles.container}>
            <Text style={styles.title}>{screen ? "LOGIN" : "REGISTER"}</Text>
            <Card style={styles.inputContainer}>
              {!screen && <React.Fragment>
                <Input
                  placeholder={"Họ tên"}
                  returnKeyType="next"
                  autoCorrent={false}
                  autoCapitalize={"none"}
                  style={styles.textInput}
                  value={formState.name}
                  onChangeText={(text) => inputHandler({ text, key: "name" })}
                />
                <Input
                  placeholder={"Số điện thoại"}
                  returnKeyType="next"
                  autoCorrent={false}
                  autoCapitalize={"none"}
                  style={styles.textInput}
                  value={formState.phone_number}
                  onChangeText={(text) => inputHandler({ text, key: "phone_number" })}
                />
              </React.Fragment>}
              <Input
                keyboardType={"email-address"}
                onChangeText={(text) => inputHandler({ text, key: "email" })}
                value={formState.email}
                autoCapitalize={"none"}
                autoCorrent={false}
                placeholder={"Email"}
                style={styles.textInput}
                returnKeyType="next"
              />
              <Input
                onChangeText={(text) => inputHandler({ text, key: "password" })}
                value={formState.password}
                placeholder={"Mật khẩu"}
                style={styles.textInput}
                secureTextEntry={true}
                returnKeyType="done"
              />
              <View style={styles.buttonContainer}>
                {screen ? (
                  <Btn
                    style={styles.btn}
                    onPress={() => {
                      authHandler(LOGIN);
                    }}
                  >
                    Đăng nhập
                  </Btn>
                ) : (
                    <Btn
                      style={styles.btn}
                      onPress={() => {
                        authHandler(REGISTER);
                      }}
                    >
                      Đăng kí
                    </Btn>
                  )}
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.switcher}
                onPress={() => {
                  setScreen((prevState) => {
                    return !prevState;
                  });
                }}
              >
                <Text style={styles.tag}>
                  {screen ? "Chưa có tài khoản?" : "Bạn muốn đăng kí?"}
                </Text>
                <Text style={{ ...styles.tag, ...styles.tagSwitcher }}>
                  {screen ? "Đăng kí ngay" : "Đăng nhập ngay"}
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
