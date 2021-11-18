import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import shortid from 'shortid';
import colors from '../utils/Color';

const Form = ({ cards, setCards, guardarMostrarForm, guardarCardsStorage }) => {
    const [bank, saveBank] = useState('');
    const [cardNumber, saveCardNumber] = useState('');
    const [interest, saveInterest] = useState('');

    const [deposit, saveDeposit] = useState('');

    const [date, saveDate] = useState('');

    //Funcion para crear nueva cita
    const createNewCard = () => {
        if(bank.trim() === '' ||
        cardNumber.trim() === '' ||
        interest.trim() === '' ||
        deposit.trim() === '' ||
        date.trim() === '')
        {
            mostrarAlerta();
            return;
        }

        const card = { bank, cardNumber, interest,deposit, date }
        card.id = shortid.generate();

        //Agregar al state
        const cardNew = [ ...cards, card ];
        setCards(cardNew);

        //Agregar citas al Storage
        guardarCardsStorage(JSON.stringify(cardNew));

        //Ocultar formulario
        guardarMostrarForm(false);

        //Resetear el formulario
        saveBank('');
        saveCardNumber('');
        saveInterest('');
        saveDeposit('');
        saveDate('');
    }

    //Validar tarjeta.

    const validateCreditCardNumber = (text) => {
        const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        const mastPattern = /^(?:5[1-5][0-9]{14})$/;
        const amexPattern = /^(?:3[47][0-9]{13})$/;
        const discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/; 
        // const ccNum  = document.getElementById("cardNum").value;

        const isVisa = visaPattern.test( text ) === true;
        const isMast = mastPattern.test( text ) === true;
        const isAmex = amexPattern.test( text ) === true;
        const isDisc = discPattern.test( text ) === true;

        if( isVisa || isMast || isAmex || isDisc ) {
            // at least one regex matches, so the card number is valid.

            if( isVisa ) {
                // Visa-specific logic goes here
                return saveCardNumber(`VISA: ${text}`) 
            }
            else if( isMast ) {
                // Mastercard-specific logic goes here
                return saveCardNumber(`Matercard: ${text}`)
            }
            else if( isAmex ) {
                // AMEX-specific logic goes here
                return saveCardNumber(`AMEX: ${text}`)
            }
            else if( isDisc ) {
                // Discover-specific logic goes here
                return saveCardNumber(`Discover: ${text}`)
            }
        }
        // else {
        //     alert("Please enter a valid card number.");
        // }
    }

    //Mostrar alertas si falla la validacion
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',    //titulo
            'Todos los campos son obligatorios',    //mensaje
            [{  
                text: 'OK'  //Arreglo de botones
            }]
        )
    }

    return(
        <>
            <ScrollView style = { styles.formulario } >
                <View>
                    <Text style = { styles.label }>Banco encargado: </Text>
                    <TextInput 
                        style= { styles.input }
                        onChangeText = { text => saveBank(text) }
                    />
                </View>
                <View>
                    <Text style = { styles.label }>Número de tarjeta: </Text>
                    <TextInput 
                        style= { styles.input } 
                        onChangeText = { text => validateCreditCardNumber(text)}
                    />
                </View>
                <View>
                    <Text style = { styles.label }>Interes: </Text>
                    <TextInput 
                        style= { styles.input }
                        onChangeText = { text => saveInterest(text) }
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style = { styles.label }>Saldo actual:</Text>
                    <TextInput
                        multiline
                        style = { styles.input }
                        onChangeText = { texto => saveDeposit(texto) }
                    />
                </View>
                <View>
                    <Text style = { styles.label }>Fecha de vencimiento:</Text>
                    <TextInput
                        multiline
                        style = { styles.input }
                        onChangeText = { texto => saveDate(texto) }
                    />
                </View>
                <View>
                    <TouchableHighlight 
                        onPress = { () => createNewCard() }
                        style = { styles.btnSubmit }
                    >
                        <Text style = { styles.textoSubmit }>Añadir nueva tarjeta</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Form;