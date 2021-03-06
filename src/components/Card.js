import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const Card = ({ item, deleteCard }) => {

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
        deleteCard(id);
    }

    return(
        <View style = { styles.cita }>
            <View>
                <Text style = { styles.label }>Banco: </Text>
                <Text style = { styles.texto }>{ item.bank }</Text>
            </View>
            <View>
                <Text style = { styles.label }>Tarjeta: </Text>
                <Text style = { styles.texto }>{ item.cardNumber }</Text>
            </View>
            <View>
                <Text style = { styles.label }>Saldo: </Text>
                <Text style = { styles.texto }>{ '$ '+ item.deposit }</Text>
            </View>
            <View>
                <TouchableHighlight onPress = { () => dialogoEliminar(item.id) }
                    style = { styles.btnEliminar }>
                    <Text style = { styles.textoEliminar }>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderRadius:15,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: '#ad00a5',
        marginVertical: 10,
    },
    textoEliminar:{
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default Card;