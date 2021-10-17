import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './src/components/Form';
import Card from './src/components/Card';
import colors from './src/utils/Color';

export default function App() {

  //State de citas
  const [cards, setCards] = useState([])
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect( () => {
    //Obtener citas del Storage
    const obtenerCardsStorage = async () => {
      try{
        const cardsStorage = await AsyncStorage.getItem('cards');
        if(cardsStorage)
        {
          setCards(JSON.parse(cardsStorage))
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }

    obtenerCardsStorage();
  }, [])

  //Eliminar pacientes del State
  const deleteCard = id => {
    const cardsFilter = cards.filter( card => card.id !== id )
    setCards( cardsFilter )
    guardarCardsStorage( JSON.stringify(cardsFilter) )
  }

  //Muestra u oculta el Formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
  }

  //Oculta teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  }

  //Agregar citas al Storage
  const guardarCardsStorage = async ( cardsJSON ) => {
    try
    {
      await AsyncStorage.setItem('cards', cardsJSON)
    }
    catch(error)
    {
      console.log(error);
    }
  }


  return (
    <TouchableWithoutFeedback 
      onPress = { () => cerrarTeclado() }
    >
      <View style = { styles.contenedor }>
        <Text style = { styles.titulo }>Tarjetas 🤑</Text>
        <View>
          <TouchableHighlight
            onPress = { () => mostrarFormulario() }
            style = { styles.btnMostrarForm }
          >
            <Text style = { styles.textoMostrarForm }>{ mostrarForm ? 'Cancelar' : 'Agregar tarjeta'}</Text>
          </TouchableHighlight>
        </View>
        <View style = { styles.contenido }>
          {
            mostrarForm ? (
              <>
                <Text style = { styles.titulo }>Agregar otra tarjeta</Text>
                <Form 
                  cards = { cards }
                  setCards = { setCards }
                  guardarMostrarForm = { guardarMostrarForm }
                  guardarCardsStorage = { guardarCardsStorage }
                />
              </>
            ) : (
              <>
                <Text style = { styles.titulo }>{ cards.length > 0 ? 'Administrar tus tarjetas' : 'No hay tarjetas, agrega una'}</Text>
                <FlatList 
                  style = { styles.listado }
                  data = { cards }
                  renderItem = { ({ item }) => <Card item = { item } deleteCard = { deleteCard } keyExtractor = { card => card.id } />}
                />
              </>
            )
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colors.PRIMARY_COLOR,
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20 ,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
