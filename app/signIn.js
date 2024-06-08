import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../context/authContext";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Input fields' states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Focus states
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }

    setLoading(true);
    const response = await login(email, password);
    setLoading(false);
    console.log("sign in response: ", response);
    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* SignIn image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/images/login.png")}
          />
        </View>

        {/* Form inputs */}
        <View style={{ marginBottom: hp(3) }}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>
            Log in to your existing account of
          </Text>
        </View>

        <View style={{ marginBottom: hp(2) }}>
          <View
            style={[
              styles.inputContainer,
              isEmailFocused && styles.inputFocused,
            ]}
          >
            <Octicons
              name="mail"
              style={[
                styles.icon,
                { marginLeft: hp(1) },
                isEmailFocused && styles.iconFocused,
              ]}
              size={hp(2)}
              color={isEmailFocused ? "#0052d1" : "#666"}
            />
            <TextInput
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              onChangeText={setEmail}
              value={email}
              style={[
                styles.input,
                isEmailFocused && styles.inputTextFocused,
              ]}
              placeholder="Email address"
              blurOnSubmit={false}
              placeholderTextColor={isEmailFocused ? "#0052d1" : '#aaa'}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              isPasswordFocused && styles.inputFocused,
            ]}
          >
            <Octicons
              name="lock"
              size={hp(2)}
              style={[
                styles.icon,
                { marginLeft: hp(1) },
                isPasswordFocused && styles.iconFocused,
              ]}
              color={isPasswordFocused ? "#0052d1" : "#666"}
            />
            <TextInput
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChangeText={setPassword}
              value={password}
              style={[
                styles.input,
                isPasswordFocused && styles.inputTextFocused,
              ]}
              placeholder="Password"
              blurOnSubmit={false}
              secureTextEntry
              placeholderTextColor={isPasswordFocused ? "#0052d1" : '#aaa'}
            />
          </View>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </View>

        {/* Submit button */}
        <View style={{ marginBottom: hp(2) }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Loading size={hp(6.5)} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>LOG IN</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ justifyContent: "center" }}>
          <View style={{ alignItems: "center", marginTop: hp(2.5) }}>
            <Text style={styles.orConnectText}>Or connect using</Text>
          </View>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.facebookButton}
            >
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.googleButton}
            >
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign up text */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("signUp")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: hp(1),
    marginTop: hp(3),
  },
  image: {
    height: hp(20),
  },
  welcomeText: {
    fontSize: hp(3),
    fontWeight: "bold",
    textAlign: "center",
    color: "#444",
    marginBottom: hp(1),
  },
  subtitleText: {
    fontSize: hp(1.8),
    textAlign: "center",
    color: "#888",
    marginBottom: hp(2),
  },
  inputContainer: {
    height: hp(7),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputFocused: {
    borderColor: "#0052d1",
  },
  icon: {
    marginLeft: hp(1),
  },
  iconFocused: {
    color: "#0052d1",
  },
  input: {
    fontSize: hp(2),
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },
  inputTextFocused: {
    color: "#0052d1",
  },
  forgotPasswordText: {
    fontSize: hp(1.8),
    textAlign: "right",
    color: "#444"
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButton: {
    height: hp(6),
    width: "60%",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#0052d1",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowOpacity: 0.25, // iOS
    shadowRadius: 3.84, // iOS
  },
  loginButtonText: {
    fontSize: hp(2),
    color: "white",
    fontWeight: "bold",
  },
  orConnectText: {
    fontSize: hp(1.8),
    color: "#888",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(2),
  },
  facebookButton: {
    height: hp(5),
    width: "35%",
    marginRight: wp(2.5),
    backgroundColor: "#3B5998",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    height: hp(5),
    width: "35%",
    backgroundColor: "#D14836",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonText: {
    fontSize: hp(1.5),
    color: "white",
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: hp(7),
    justifyContent: "center",
  },
  signUpText: {
    fontSize: hp(1.8),
    color: "#444",
  },
  signUpLink: {
    fontSize: hp(1.8),
    color: "#0052d1",
    fontWeight: "bold",
  },
});
