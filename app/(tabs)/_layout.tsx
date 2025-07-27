import CustomNavBar from "@/components/CustomNavBar";
import SideMenu from "@/components/SideMenu";
import { ThemedView } from "@/components/ThemedView";
import { Tabs } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function TabLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <CustomNavBar {...props} />}
        >
          <Tabs.Screen name="home" options={{ title: "Home" }} />
          <Tabs.Screen
            name="BudgetPlannerScreen"
            options={{ title: "Budget" }}
          />
          <Tabs.Screen name="seller_screen" options={{ title: "Seller" }} />
          <Tabs.Screen name="CartSummaryScreen" options={{ title: "Cart" }} />
          {/* <Tabs.Screen name="ChooseCategoriesScreen" options={{ title: "ChooseCategories" }} /> */}
        </Tabs>
      </ThemedView>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}
