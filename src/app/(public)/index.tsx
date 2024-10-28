
import React, { useEffect, useState } from 'react';
import { Redirect, router } from "expo-router";
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';

import * as Linking from 'expo-linking'

import { useOAuth } from '@clerk/clerk-expo';

import * as WebBrowser from 'expo-web-browser'
import { Button } from '@/components/Button';

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin@test.com' && password === 'password') {
      Alert.alert('Login', 'Login realizado com sucesso!');
    } else {
      Alert.alert('Login', 'Credenciais inválidas.');
    }
  };

  const gooleOAuth = useOAuth({strategy: 'oauth_google'})
  const [isLoading, setIsLoading] = useState(false)


  async function onGoogleSingIn(){
    try{
      const redirectUrl = Linking.createURL('/')

      const oAuthFlow = await gooleOAuth.startOAuthFlow({redirectUrl})

      if (oAuthFlow.authSessionResult?.type === 'success'){
        if((oAuthFlow.setActive)){
          await oAuthFlow.setActive({session: oAuthFlow.createdSessionId})
        }
      }else{
        setIsLoading(false)
      }

    }catch (error){
      console.log(error);
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    WebBrowser.warmUpAsync()
    return () => {
      WebBrowser.coolDownAsync
    }
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
          source={require('../../../assets/images/fundoLogin.gif')} // URL da imagem de fundo
          style={styles.imgBack}>
        <View style={styles.backLogin}>
          <View style={{margin: 30}}>
            <Text style={styles.title}>Bem Vindo(a)!</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity>
              <Text style={styles.forgotPass}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.othersMet}>
              <Text>Outros metodos</Text>
              <View style={styles.icons}>
                <TouchableOpacity>
                  <Button title='Google' icon={'logo-google'} onPress={onGoogleSingIn} isLoading={isLoading}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/images/facebook.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Register}>
              <Text>Novo no app? </Text>

            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  imgBack:{ // A imagem vai cobrir toda a tela
    flex: 1
  },
  backLogin:{
    flex: 1,
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  button:{
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#284DEB',
    padding: 11,
    borderRadius: 20,
    marginTop: 20,
  },
  btnText:{
    fontSize: 15,
    color: 'white',
  },
  othersMet:{
    marginTop: 25,
    alignItems: 'center',
  },
  icon:{
    width:50,
    height: 50,
    marginHorizontal: 20,
    marginTop: 10
  },
  icons: {
    flexDirection: 'row',
  },
  forgotPass:{
    color: 'blue',
    fontSize: 13
  },
  Register:{
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  btnRegister:{
    color: 'blue',
  }
});

export default LoginScreen;
