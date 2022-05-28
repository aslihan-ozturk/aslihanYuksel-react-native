import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

type BubbleProps = {
  options: Options[];
  onOptionSelect: (optName: string) => void;
  initialId?: string;
};

type Options = {
  name: string;
  id: string;
  createdAt: string;
};

const BubbleOptions = (props: BubbleProps) => {
  const [selectedOption, setSelectedOption] = useState(
    props.initialId === undefined ? "" : props.initialId
  );

  const selectOption = (optId: string, index: number) => {
    setSelectedOption(optId);
    props.onOptionSelect(props.options[index].name);
  };
  return (
    <View style={styles.container}>
      {props.options.map((opt: Options, index: number) => {
        return (
          <TouchableOpacity
            style={[
              styles.bubbles,
              { backgroundColor: selectedOption === opt.id ? "grey" : "white" },
            ]}
            key={opt.id}
            onPress={() => selectOption(opt.id, index)}
          >
            <Text style={styles.text}>{opt.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
  },
  bubbles: {
    backgroundColor: "#DFDFDE",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#7F8487",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    flex: 1,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  text: {
    color: "black",
    fontSize: 11,
  },
});

export default BubbleOptions;
