import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/Storage";

const intialCountables = [
  { name: "Crow", count: 0 },
  { name: "Woodpecker", count: 3 },
];

// From https://javascript.info/currying-partials
function curry(f) {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

function sort(countables) {
  return countables.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
}

export default function App() {
  const [countables, setCountables] = useState(intialCountables);

  useEffect(() => {
    loadCountables().then((result) => setCountables(result));
  }, []);

  const changeCounts = (index, amount) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
    saveCountables(newState);
  };

  const addNewCountable = (name) => {
    const newState = [...countables, { name, count: 0 }];

    if (!countables.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      setCountables(sort(newState));
      saveCountables(sort(newState));
    }
  };

  const onDelete = (countable) => {
    setCountables(countables.filter((item) => item !== countable));
    saveCountables(countables.filter((item) => item !== countable));
  };

  const onEdit = (countable, name) => {
    if (
      !countables.some((c) => c.name.toLowerCase() === name.toLowerCase()) &&
      name !== ""
    ) {
      countable.name = name;
      setCountables([...countables]);
      saveCountables([...countables]);
    } else {
      return false;
    }
  };

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
  if (countables?.length) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCounts={curry(changeCounts)(index)}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
          <StatusBar style="auto" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Text style={styles.text}>No items yet, add something!</Text>
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
          <StatusBar style="auto" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 250,
  },
});
