import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Definimos la estructura exacta de nuestros datos para TypeScript
type Jugador = {
    id: string;
    nombre: string;
    posicion: string;
    imagen: string;
};

//Indicamos explícitamente a TypeScript que este arreglo contiene objetos de tipo Jugador
const jugadores: Jugador[] = [
    {
        id: '1',
        nombre: 'Moisés Caicedo',
        posicion: 'Mediocampista',
        imagen: 'https://ui-avatars.com/api/?name=Moises+Caicedo&background=002255&color=fff&size=150'
    },
    {
        id: '2',
        nombre: 'Enner Valencia',
        posicion: 'Delantero',
        imagen: 'https://ui-avatars.com/api/?name=Enner+Valencia&background=002255&color=fff&size=150'
    },
    {
        id: '3',
        nombre: 'Piero Hincapié',
        posicion: 'Defensa',
        imagen: 'https://ui-avatars.com/api/?name=Piero+Hincapie&background=002255&color=fff&size=150'
    },
    {
        id: '4',
        nombre: 'Kendry Páez',
        posicion: 'Mediocampista',
        imagen: 'https://ui-avatars.com/api/?name=Kendry+Paez&background=002255&color=fff&size=150'
    },
    {
        id: '5',
        nombre: 'Alexander Domínguez',
        posicion: 'Arquero',
        imagen: 'https://ui-avatars.com/api/?name=Alexander+Dominguez&background=002255&color=fff&size=150'
    },
];

export default function JugadoresScreen() {

    //Parámetro 'item' es estrictamente de tipo 'Jugador'
    const renderItem = ({ item }: { item: Jugador }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.nombre}</Text>
                <Text style={styles.cardPosition}>{item.posicion}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>Nuestra Plantilla</Text>

            <FlatList
                data={jugadores}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#002255',
        textAlign: 'center',
        marginVertical: 20,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    cardInfo: {
        flex: 1,
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    cardPosition: {
        fontSize: 14,
        color: '#666666',
    },
});