import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const CountableRow = ({ countable, changeCounts, onDelete, onEdit }) => {
  const [name, setName] = useState(countable.name);

  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        <TextInput
          style={CommonStyles.textItem}
          onChangeText={setName}
          onBlur={() => {
            if (!onEdit(countable, name)) setName(countable.name);
          }}
          value={name}
        />
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <CountButton
          text="Del"
          submit={() => {
            onDelete(countable);
          }}
        />
        <CountButton
          text="+"
          submit={() => {
            changeCounts(1);
          }}
        />
        <CountButton
          text="-"
          submit={() => {
            if (countable.count !== 0) changeCounts(-1);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
});
