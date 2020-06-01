import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

import styles from "./styles";
import Colors from "../constants/colors";
import DrawerBarIcon from "../components/UI/DrawerBarIcon";

import Login from "../screens/LoginScreen";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import MapScreen from "../screens/MapScreen";
import Info from "../screens/Info";
import SearchBar from "../screens/SearchScreen";
import Booking from "../screens/Booking";
import BookingForm from "../screens/BookingForm";
import BookingInfo from "../screens/BookingInfo";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="login"
    headerMode="screen"
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <AuthStack.Screen
      name="login"
      component={Login}
      options={{ title: "Vé xe điện tử" }}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    initialRouteName="home"
    headerMode="screen"
    screenOptions={(route) => ({
      headerTitleAlign: "center",
      headerRight: () => <DrawerBarIcon route={route} />,
    })}
  >
    <HomeStack.Screen
      name="home"
      component={Home}
      options={{
        title: "Danh sách chuyến xe",
      }}
    />
    <HomeStack.Screen
      name="info"
      component={Info}
      options={({ route }) => {
        return { headerTitle: route.params.name };
      }}
    />
    <HomeStack.Screen
      name="searchBar"
      component={SearchBar}
      options={({ route }) => {
        return { headerTitle: "Tìm kiếm chuyến xe" };
      }}
    />
    <HomeStack.Screen
      name="bookingForm"
      component={BookingForm}
      options={({ route }) => {
        return { headerTitle: "Apply for Ticket" };
      }}
    />
  </HomeStack.Navigator>
);

const BookingStack = createStackNavigator();
const BookingStackScreen = () => (
  <BookingStack.Navigator
    screenOptions={(route) => ({
      headerTitleAlign: "center",
      headerRight: () => <DrawerBarIcon route={route} />,
    })}
  >
    <BookingStack.Screen
      name="booking"
      component={Booking}
      options={{
        title: "My Booking",
      }}
    />
    <BookingStack.Screen
      name="bookingInfo"
      component={BookingInfo}
      options={({ route }) => {
        return { headerTitle: route.params.name };
      }}
    />
  </BookingStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={(route) => ({
      headerTitleAlign: "center",
      headerRight: () => <DrawerBarIcon route={route} />,
    })}
  >
    <ProfileStack.Screen
      name="profile"
      component={Profile}
      options={{ headerTitle: "Profile" }}
    />
    <ProfileStack.Screen
      name="mapScreen"
      component={MapScreen}
      options={{
        headerTitle: "Location",
      }}
    />
  </ProfileStack.Navigator>
);

const TabNavigator = createBottomTabNavigator();
const TabNavigatorScreen = () => (
  <TabNavigator.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "home")
          iconName = focused ? "account-check" : "account-check-outline";
        else if (route.name === "booking")
          iconName = focused ? "ticket-confirmation" : "ticket-outline";

        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
    })}
    tabBarOptions={{
      labelStyle: {
        fontSize: 14,
      },
      activeTintColor: Colors.primary,
      inactiveTintColor: "black",
    }}
  >
    <TabNavigator.Screen
      name="home"
      component={HomeStackScreen}
      options={{
        title: "Chi tiết",
      }}
    />
    <TabNavigator.Screen
      name="booking"
      component={BookingStackScreen}
      options={{
        title: "Vé của tôi",
      }}
    />
  </TabNavigator.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator drawerPosition="right" drawerType="front">
    <Drawer.Screen
      name="home"
      component={TabNavigatorScreen}
      options={{ title: "HOME" }}
    />
    <Drawer.Screen
      name="profile"
      component={ProfileStackScreen}
      options={{ title: "PROFILE" }}
    />
  </Drawer.Navigator>
);
const AuthContext = React.createContext();

export default () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    setTimeout(() => {
      const bootstrapAsync = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };
      bootstrapAsync();
    }, 2000);
  })
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        setTimeout(() => {
          dispatch({ type: 'SIGN_IN', token: data });
        }, 2000);
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        setTimeout(() => {
          dispatch({ type: 'SIGN_IN', token: data });
        }, 2000);
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken !== null ? <DrawerScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
