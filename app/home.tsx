// HomeScreen.tsx
import BigImageCard from '@/components/BigImageCard';
import HamburgerHeader from '@/components/HamburgerHeader';
import SideMenu from '@/components/SideMenu';
import SmallImageCard from '@/components/SmallImageCard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const categories = [
    { name: 'Venues', image: require('../assets/images/unnamed.jpg') },
    { name: 'Catering', image: require('../assets/images/unnamed.jpg') },
    { name: 'Photography', image: require('../assets/images/unnamed.jpg') },
    { name: 'Bridal Wear', image: require('../assets/images/unnamed.jpg') },
    { name: 'Groom Wear', image: require('../assets/images/unnamed.jpg') },
    { name: 'Makeup', image: require('../assets/images/unnamed.jpg') },
    { name: 'Decor', image: require('../assets/images/unnamed.jpg') },
    { name: 'Entertainment', image: require('../assets/images/unnamed.jpg') },
  ];

  const popularServices = [
    {
      name: 'Dream Palace Venue',
      price: 'Starting from $5,000',
      rating: '⭐ 4.9',
      time: 'Available in Oct',
      image: require('../assets/images/unnamed.jpg'),
      tag: 'Exclusive',
    },
    {
      name: 'Elite Photography',
      price: '$1,500/day',
      rating: '⭐ 4.8',
      time: 'Flexible Slots',
      image: require('../assets/images/unnamed.jpg'),
      tag: 'Popular',
    },
    {
      name: 'Royal Catering Co.',
      price: 'From $25/person',
      rating: '⭐ 4.7',
      time: '2 Weeks Notice',
      image: require('../assets/images/unnamed.jpg'),
      tag: 'Best Seller',
    },
  ];

  return (
    <View style={styles.parentContainer}>
      <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <HamburgerHeader onPress={() => setMenuVisible(true)} />
        <Text style={styles.navTitle}>Wedding Planner</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search services..."
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
        <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.item}>
            <View style={styles.imageWrapper}>
              <Image source={cat.image} style={styles.image} />
            </View>
            <Text style={styles.label}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
<View style={styles.popularSection}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>Popular Wedding Services</Text>
    <TouchableOpacity>
      <Text style={styles.viewAll}>View All</Text>
    </TouchableOpacity>
  </View>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.cardScrollContainer}
  >
    {popularServices.map((service, index) => (
      <View key={index}>
      <TouchableOpacity
  onPress={() =>
    router.push({
      pathname: '/ServiceDetails',
      params: {
        title: service.name,
        subtitle: service.price,
        rating: service.rating,
        price: service.price,
        time: service.time,
        image: service.image ? service.image : require('../assets/images/unnamed.jpg'),
      },
    })
  }
>
  <SmallImageCard title="Service Card"
    subtitle={service.price}
    image={service.image}
    onPress={() => router.push('/ServiceDetails')}
 />
</TouchableOpacity>
      </View>
    ))}
  </ScrollView>
</View>

    <View style={styles.foodContainer}>
      {
        popularServices.map((service, index) => (
          <BigImageCard
            key={index}
            image={service.image}
            restaurant={service.name}
            rating={service.rating}
            deliveryTime={service.time}
            deliveryType= {service.tag} 
          />
        ))
      }
    </View>
      {/* Side Menu */}
    </View>
    </ScrollView>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#FFF8F5',
    paddingTop: 30, // Adjust for status bar height
    paddingBottom: 20,
  },
  container: {
    marginVertical: 20,
    paddingHorizontal: 8,
  },
  foodContainer: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#888',
    fontSize: 14,
  },
  scrollContainer: {
    paddingRight: 15,
  },
 card: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRating: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  cardTime: {
    fontSize: 12,
    color: '#372030',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 22,
    fontFamily: 'Playfair-Bold',
    color: '#372030',
  },
  popularSection: {
  marginTop: 20,
},

sectionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

sectionTitle: {
  fontSize: 14,
  fontFamily: 'Poppins-Regular',
  fontWeight: '700',
  color: '#372030',
},

cardScrollContainer: {
  paddingLeft: 20,
  paddingRight: 8,
},

serviceCard: {
  backgroundColor: '#fff',
  borderRadius: 16,
  marginRight: 16,
  width: 200,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 10,
  elevation: 4,
  overflow: 'hidden',
},

serviceImage: {
  width: '100%',
  height: 120,
  resizeMode: 'cover',
},

serviceContent: {
  padding: 12,
},

serviceTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 4,
},

servicePrice: {
  fontSize: 14,
  color: '#888',
  marginBottom: 8,
},

serviceMeta: {
  flexDirection: 'row',
  alignItems: 'center',
},

serviceRating: {
  fontSize: 13,
  marginLeft: 4,
  marginRight: 10,
  color: '#666',
},

serviceTime: {
  fontSize: 13,
  color: '#666',
},

  searchContainer: {
    flexDirection: 'row',
    marginVertical: 18,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
      borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  searchIcon: {
    marginLeft: 10,
  },

  item: {
    alignItems: 'center',
    marginRight: 16,
  },
  imageWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    color: '#5C3D3D',
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    // marginLeft: 20,
    // marginTop: 24,
    color: '#372030',
  },
  cardScroll: {
    marginTop: 10,
    paddingLeft: 20,
    paddingBottom: 20,
  },
 
});
