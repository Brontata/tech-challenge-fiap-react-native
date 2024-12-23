import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useAuth } from "../Hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserNameFromToken } from "../utils/tokenUtils";

const Header = () => {
  const { isLogged, logout } = useAuth();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        setUserName(getUserNameFromToken(await AsyncStorage.getItem("token")));
      } catch (error) {
        console.error("Erro ao recuperar nome:", error);
      }
    };

    if (isLogged) {
      fetchUserName();
    }
  }, [isLogged]); 

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>XPTO</Text>
        {isLogged && (
          <View style={styles.userInfo}>
            <Text style={styles.username}>Olá, {userName}!</Text>
            <Button title="Sair" onPress={handleLogout} color="#FF3B30" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 30,
  },
  header: {
    height: 60,
    backgroundColor: "#6200ee",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#fff",
    marginRight: 8,
  },
});

export default Header;

