import React , {useState, useEffect} from "react";
import { View, Text,StyleSheet } from "react-native";
import { colors } from "../../utils/color";
import { fontSizes, spaces, spacing } from "../../utils/sizes";

import { RoundedButton } from "../../components/RoundedButton";


export const Timing = ({onChangeTime}) => {
    return (
        <React.Fragment>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="10" onPress={() =>  onChangeTime(10)}></RoundedButton>
            </View>

            <View style={styles.timingButton}>
                <RoundedButton size={75} title="15" onPress={() =>  onChangeTime(15)}></RoundedButton>
            </View>

            <View style={styles.timingButton}>
                <RoundedButton size={75} title="20" onPress={() =>  onChangeTime(20)}></RoundedButton>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    timingButton : {
        color:colors.white,
      
    }
})