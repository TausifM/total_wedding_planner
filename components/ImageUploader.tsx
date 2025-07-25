import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SellerImageUploader() {
  const [images, setImages] = useState<string[]>([]);

  const pickImages = async () => {
    if (images.length >= 5)
      return Alert.alert("Limit Reached", "You can upload up to 5 images.");

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const selected = result.assets.map((asset) => asset.uri);
        const combined = [...images, ...selected].slice(0, 5);
        setImages(combined);
      }
    } catch (error) {
      console.warn("Image picker error:", error);
    }
  };

  const removeImage = (uriToRemove: string) => {
    setImages(images.filter((uri) => uri !== uriToRemove));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Image upload</Text>
      <TouchableOpacity style={styles.imageUpload} onPress={pickImages}>
        <Ionicons name="image-outline" size={24} color="#999" />
        <Text style={styles.imageText}>
          {images.length < 5 ? "Upload Service Image" : "Max 5 Images Reached"}
        </Text>
      </TouchableOpacity>

      <View style={styles.previewContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeImage(uri)}
            >
              <Ionicons name="close-circle" size={20} color="#ff5555" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 2,
    color: "#8A003B",
  },
  imageUpload: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderColor: "#6E002D",
  },
  imageText: {
    marginLeft: 10,
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  previewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10, // RN 0.71+
  },
  imageWrapper: {
    position: "relative",
    marginRight: 8,
    marginBottom: 8,
  },
  previewImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
