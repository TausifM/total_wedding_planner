import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import BackHeader from "./BackHeader"; // adjust path as needed

const screenWidth = Dimensions.get("window").width;

const ImageCarousel = ({ images }: { images: number[] }) => {
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    Array(images.length).fill(true)
  );

  const handleImageLoaded = (index: number) => {
    const updated = [...loadingStates];
    updated[index] = false;
    setLoadingStates(updated);
  };

  return (
    <View style={styles.imageWrapper}>
      <Carousel
        loop
        width={screenWidth}
        height={300}
        autoPlay
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            {loadingStates[index] && (
              <ActivityIndicator style={styles.loader} size="small" color="#888" />
            )}
            <Image
              source={item}
              style={styles.heroImage}
              onLoadEnd={() => handleImageLoaded(index)}
            />
          </View>
        )}
      />
      <BackHeader />
      <TouchableOpacity style={styles.bookmarkIcon}>
        <Ionicons name="heart-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  imageWrapper: {
    position: "relative",
    top: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  loader: {
    zIndex: 1,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
});
