import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Images from '../../assets';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {storeData, getData} from '../../localStorage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = () => {
    axios
      .post('http://api-test.q.camp404.com/public/api/login', {
        email: email,
        password: password,
        password_confirmation: password,
      })
      .then(response => {
        let res = response.data;
        dispatch({
          type: 'SET_LOGIN',
          value: {user: res.user, access_token: res.access_token},
        });
        storeData('user', {user: res.user, access_token: res.access_token});
        navigation.replace('MainApp');
      })
      .catch(error => {
        Alert.alert('Login Failed', error.response.data.message);
      });
  };

  useEffect(() => {
    getData('user').then(res => {
      if (res !== null) {
        dispatch({
          type: 'SET_LOGIN',
          value: res,
        });
        navigation.replace('MainApp');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Image source={Images.ILLogin} style={styles.image} />
        <Text style={styles.title}>Camp404 store</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.emailInput}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.passwordInput}
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.breakLine} />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#1F8597',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2F2F2',
    alignSelf: 'center',
    marginBottom: 77,
    marginTop: 16,
  },
  emailInput: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: '#F4A896',
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#F4A896',
  },
  breakLine: {
    backgroundColor: '#C4C4C4',
    marginVertical: 40,
    marginHorizontal: 16,
    height: 1,
  },
  button: {
    backgroundColor: '#F4A896',
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
