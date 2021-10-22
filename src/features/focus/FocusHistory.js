import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";
import { colors } from "../../utils/color";

export const FocusHistory = ({
    focusHistory,
    onClear
}) => {
    
    const onClearHistory = () => {
        onClear()
    }

    const HistoryItem = ({item, index}) => {
        return <Text key={item.key} style={styles.historyItem(item.status)}>{JSON.stringify(item.subject)}</Text>
    }

    return (
        <React.Fragment>
            <SafeAreaView style={{flex : 1, alignItems: "center"}}>
            {!!focusHistory.length && (
                <>
                <Text style={styles.title}>Focused things</Text>
               
                    <FlatList style={{flex: 1}}
                               contentContainerStyle={{flex: 1, alignItems:'center'}}
                               data={focusHistory}
                               renderItem={HistoryItem}>
                    </FlatList>
                         <View style={styles.clearContainer}>
                         <RoundedButton size={75} title="Clear" onPress={() => {onClearHistory()}}></RoundedButton>
                     </View>
                     </>
                )}
            </SafeAreaView>
       
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    historyItem: (status) => ({
        color : status > 1 ? 'red' : 'green',
        fontSize : fontSizes.md
    }),
    title : {
        color : 'white',
        fontSize : fontSizes.lg
    },
    clearContainer:{
        alignItems:"center",
        padding: spacing.md
    }
  });
  