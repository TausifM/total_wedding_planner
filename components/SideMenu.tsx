import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedText } from './ThemedText';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SideMenu({ visible, onClose }: Props) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return visible ? (
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.drawer}>
        {/* Profile Section */}
        <View style={styles.profile}>
          <Image
            source={require('../assets/images/unnamed.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Dwayne Johnson</Text>
          <Text style={styles.username}>@Dwaynejohnson</Text>
        </View>

        {/* Menu Items */}
        <ScrollView>
          <MenuItem label="My Profile" />
          <MenuItem label="Vendors" />
          <MenuItem label="Planning Checklist" />
          <MenuItem label="Budget Tracker" />
          <MenuItem label="Guest List" />
          <MenuItem
            label="Notifications"
            toggle
            toggleValue={notificationsEnabled}
            onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <MenuItem label="Logout" />
        </ScrollView>
      </View>
    </TouchableOpacity>
  ) : null;
}

function MenuItem({
  label,
  toggle = false,
  toggleValue = false,
  onToggle,
}: {
  label: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
      <ThemedText type='default'>{label}</ThemedText>
      {toggle && (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          thumbColor={toggleValue ? '#C07D7D' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#F2D4D4' }}
        />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    zIndex: 9999, // 👈 ensures it's above everything
    elevation: 9999
  },
  drawer: {
    width: '75%',
    backgroundColor: '#FAF8F5',
    paddingTop: 50,
    paddingHorizontal: 24,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 20, // 👈 Android shadow layer
    zIndex: 10000, // 👈 optional but helpful for drawer stacking
  },
  profile: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E9CFCF',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Playfair-Bold',
    color: '#5C3D3D',
  },
  username: {
    fontSize: 14,
    color: '#A07B7B',
    fontFamily: 'Montserrat-Medium',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#EEE6E6',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#453535',
  },
});
