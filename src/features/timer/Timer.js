import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { colors } from "../../utils/color";
import { fontSizes, spaces, spacing } from "../../utils/sizes";
import { useKeepAwake } from "expo-keep-awake";

import { CountDown } from "../../components/CountDown";
import { RoundedButton } from "../../components/RoundedButton";
import { Timing } from "../timer/Timing";

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME); // set default time at start
  const [isStarted, setIsStarted] = useState(false); // set the timer off at start
  const [progress, setProgress] = useState(1); // set the progress bar state

  // update progress bar state on timer start
  const onProgress = (progress) => {
    setProgress(progress);
  };

  // vibrate the phone on time end
  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  // update state when timer ends
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        ></CountDown> 
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing On: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color="#5E84E2"
          progress={progress}
          style={{ height: 10 }}
        ></ProgressBar>
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime}></Timing>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            onPress={() => setIsStarted(false)}
          ></RoundedButton>
        ) : (
          <RoundedButton
            title="start"
            onPress={() => setIsStarted(true)}
          ></RoundedButton>
        )}
            
      </View>
      <View style={styles.clearSubject}>
      <RoundedButton
            title="cancel"
            size={50}
            onPress={() => clearSubject()}
          ></RoundedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    textAlign: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject :{
    paddingBottom: 25,
    paddingLeft : 25,

  }
});
