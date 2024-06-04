import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/authContext";
import { StatusBar } from "expo-status-bar";
import ChatList from "../../components/ChatList";
import { usersRef } from "../../firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../../components/Loading";

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.uid) 
    getUsers();
    
  }, []);
const getUsers = async () => {
  try {
    const q = query(usersRef, where('userId', '!=', user?.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data() });
    });
    console.log("Users fetched", data);
    setUsers(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      { 
         users.length > 0 ? (
        <ChatList key={users.length} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          {/* <ActivityIndicator size="larger" /> */}
          <Loading size={hp(10)} />
        </View>
      )}
    </View>
  );
}
