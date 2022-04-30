import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const CountButton = ({ text, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={{ fontSize: 20 }}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
