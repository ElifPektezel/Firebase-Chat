import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  // States for input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  // States for input focus
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isProfileFocused, setIsProfileFocused] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !username || !profileUrl) {
      Alert.alert('Sign Up', 'Please fill all the fields!');
      return;
    }
    setLoading(true);

    let response = await register(email, password, username, profileUrl);
    setLoading(false);

    console.log('got result: ', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* SignUp image */}
        <View style={styles.imageContainer}>
          {/* Add your image here if any */}
        </View>

        {/* Form inputs */}
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Let's Get Started!</Text>
          <Text style={styles.signInText}>Create an account to Q Allure to get all features</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={[
            styles.inputContainer,
            isUsernameFocused && styles.inputFocused,
          ]}>
            <Feather
              name="user"
              size={hp(2.5)}
              style={[
                styles.icon,
                isUsernameFocused && styles.iconFocused,
              ]}
              color={isUsernameFocused ? "#0052d1" : "#666"}
            />
            <TextInput
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              onChangeText={setUsername}
              value={username}
              style={[
                styles.input,
                isUsernameFocused && styles.inputTextFocused,
              ]}
              placeholder='Username'
              blurOnSubmit={false}
              placeholderTextColor={isUsernameFocused ? "#0052d1" : '#aaa'}
            />
          </View>

          <View style={[
            styles.inputContainer,
            isEmailFocused && styles.inputFocused,
          ]}>
            <Octicons
              name="mail"
              size={hp(2.5)}
              style={[
                styles.icon,
                isEmailFocused && styles.iconFocused,
              ]}
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
              placeholder='Email address'
              blurOnSubmit={false}
              placeholderTextColor={isEmailFocused ? "#0052d1" : '#aaa'}
            />
          </View>

          <View style={[
            styles.inputContainer,
            isPasswordFocused && styles.inputFocused,
          ]}>
            <Octicons
              name="lock"
              size={hp(2.5)}
              style={[
                styles.icon,
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
              placeholder='Password'
              blurOnSubmit={false}
              secureTextEntry
              placeholderTextColor={isPasswordFocused ? "#0052d1" : '#aaa'}
            />
          </View>

          <View style={[
            styles.inputContainer,
            isProfileFocused && styles.inputFocused,
          ]}>
            <Feather
              name="image"
              size={hp(2.5)}
              style={[
                styles.icon,
                isProfileFocused && styles.iconFocused,
              ]}
              color={isProfileFocused ? "#0052d1" : "#666"}
            />
            <TextInput
              onFocus={() => setIsProfileFocused(true)}
              onBlur={() => setIsProfileFocused(false)}
              onChangeText={setProfileUrl}
              value={profileUrl}
              style={[
                styles.input,
                isProfileFocused && styles.inputTextFocused,
              ]}
              placeholder='Profile URL'
              blurOnSubmit={false}
              placeholderTextColor={isProfileFocused ? "#0052d1" : '#aaa'}
            />
          </View>
        </View>

        {/* Submit button */}
        <View style={{ marginBottom: hp(2) }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Loading size={hp(6.5)} />
            </View>
          ) : (
            <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>CREATE</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sign in text */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <Pressable onPress={() => router.push('signIn')}>
            <Text style={styles.signInLink}>Sign In</Text>
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
    justifyContent: 'center'
  },
  imageContainer: {
    marginBottom: hp(10),
  },
  image: {
    height: hp(18),
  },
  formContainer: {
    marginBottom: hp(3),

  },
  headerText: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
  },
  inputContainer: {
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    color: '#333',
  },
  inputTextFocused: {
    color: "#0052d1",
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButton: {
    height: hp(6),
    width: "60%",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: '#0052d1',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowOpacity: 0.25, // iOS
    shadowRadius: 3.84, // iOS
  },
  registerButtonText: {
    fontSize: hp(2),
    color: 'white',
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: hp(18),
    justifyContent: 'center',
  },
  signInText: {
    fontSize: hp(1.8),
    color: '#444',
    textAlign:'center',
  },
  signInLink: {
    fontSize: hp(1.8),
    color: '#0052d1',
    fontWeight: 'bold',
  },
});
