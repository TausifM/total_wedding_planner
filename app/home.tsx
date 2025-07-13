//import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Home() {
  //const router = useRouter();
  const userName = 'Priya'; // You can fetch from user context

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.heading}>Hi, {userName} 👋</Text>
        <Text style={styles.subtext}>Let’s plan your perfect wedding</Text>
      </View>

      {/* <Image
        source={require('../assets/images/wedding-banner.png')} // Add a soft, modern banner image
        style={styles.banner}
        resizeMode="cover"
      /> */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore</Text>

        {/* <HomeCard title="Venues" icon="location" onPress={() => router.push('/venues')} />
        <HomeCard title="Dresses" icon="shirt" onPress={() => router.push('/dresses')} />
        <HomeCard title="Checklist" icon="checkbox" onPress={() => router.push('/checklist')} />
        <HomeCard title="Schedule" icon="calendar" onPress={() => router.push('/schedule')} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Playfair-Bold',
    color: '#7A3E3E',
  },
  subtext: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#8D6E63',
    marginTop: 4,
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 20,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Playfair-Bold',
    color: '#7A3E3E',
    marginBottom: 16,
  },
});
