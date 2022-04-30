import { useState } from "react";
import { View, TextInput, Keyboard } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <TextInput
        style={{ fontSize: 30 }}
        placeholder="Enter name"
        onChangeText={setName}
        value={name}
      />
      <View style={{ marginLeft: "auto" }}>
        <CountButton
          text="Add"
          submit={() => {
            if (name !== "") addNewCountable(name);
            setName("");
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};
