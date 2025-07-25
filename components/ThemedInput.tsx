import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { Colors } from "../constants/Themes";

type ThemedInputProps = {
  label?: string;
  error?: string;
  touched?: boolean;
  rightIcon?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
} & TextInputProps;

const ThemedInput: React.FC<ThemedInputProps> = ({
  label,
  error,
  touched,
  ...props
}) => {
  console.log("Global input style", GlobalStyles.input);
  return (
    <View style={styles.container}>
      {label && <Text style={GlobalStyles.label}>{label}</Text>}
      <TextInput
        style={[
          GlobalStyles.input,
          touched && error ? styles.errorBorder : null,
          props.style,
        ]}
        placeholderTextColor="#999"
        {...props}
      />
      {touched && error ? (
        <Text style={GlobalStyles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
});
