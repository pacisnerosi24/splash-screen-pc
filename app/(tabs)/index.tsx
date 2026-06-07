import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// 1. Evitamos que el splash nativo se quite de golpe
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  // Estado para saber cuándo quitar nuestro splash falso
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  // Valores animados: 'scale' para el tamaño y 'opacity' para desvanecer el fondo
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function animateSplash() {
      // Oculta el splash nativo
      await SplashScreen.hideAsync();

      //Inicia la secuencia de animación
      Animated.sequence([
        Animated.delay(1000), // Pausa para logo.
        Animated.parallel([
          // tamaño logo animacion
          Animated.timing(scale, {
            toValue: 20,
            duration: 1500,
            useNativeDriver: true,
          }),
          // desvanecimiento fondo azul
          Animated.timing(opacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setAnimationComplete(true);
      });
    }

    animateSplash();
  }, [scale, opacity]);

  return (
    <View style={styles.container}>
      {/* ----- PANTALLA PRINCIPAL (Home Screen) ----- */}
      <Image
        source={require('@/assets/images/splash-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>¡Vamos La Tri!</Text>
      <Text style={styles.description}>
        La Selección Ecuatoriana de Fútbol representa a Ecuador en las competiciones internacionales. Sus colores tradicionales son el amarillo, azul y rojo.
      </Text>
      {/* ----- LISTA DE INFORMACIÓN ----- */}
      <View style={styles.infoList}>
        <Text style={styles.listItem}>
          <Text style={styles.label}>• Confederación:</Text> CONMEBOL
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.label}>• Entrenador:</Text> Sebastián Beccacece
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.label}>• Estadio - Sede:</Text> Estadio Rodrigo Paz Delgado (Quito)
        </Text>
      </View>

      {/* ----- OVERLAY DEL SPLASH ANIMADO ----- */}
      {!isSplashAnimationComplete && (
        <Animated.View
          style={[
            styles.splashOverlay,
            { opacity: opacity },
          ]}
        >
          <Animated.Image
            source={require('@/assets/images/splash-icon.png')}
            style={[
              styles.splashLogo,
              { transform: [{ scale: scale }] },
            ]}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#002255',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444444',
    lineHeight: 24,
  },

  // ESTILOS PARA LA LISTA! ---
  infoList: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  listItem: {
    fontSize: 16,
    color: '#444444',
    marginBottom: 8,
    lineHeight: 22,
  },
  label: {
    fontWeight: 'bold',
    color: '#002255',
  },

  // --- Estilos de la capa del Splash Animado ---
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#002255',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  splashLogo: {
    width: 200,
    height: 200,
  },
});