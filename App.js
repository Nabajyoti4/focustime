import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View , Platform, AsyncStorage} from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/color';
import { spacing } from './src/utils/sizes';

import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUS = {
  COMPLETE : 1,
  FAILURE : 2
}


export default function App() {
  const [focusSubject, setFocusSubject] = useState(null)
  const [focusHistory, setFocusHistory] = useState([])


const addFocusHistorySubjectWithState = (subject, status) => {
  setFocusHistory([...focusHistory, {key:String(focusHistory.length + 1), subject, status}])
}


const onClear = () => {
  setFocusHistory([])
}

const saveFocusHistory = async () => {
  try {
    AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
  }catch(e){
    console.log(e)
  }
}


const loadFocusHistory = async () => {
  try{
    const history = await AsyncStorage.getItem('focusHistory');

    if(history && JSON.parse(history).length){
      setFocusHistory(JSON.parse(history))
    }
  }catch(e){
console.log(e)
  }
}

useEffect(() => {
  loadFocusHistory();
}, [])

useEffect(()=>{
  saveFocusHistory()
}, [focusHistory])

  return (
    <View style={styles.container}>
       {/* if focus subject is given show timer, pass the focus subject state */}
      {focusSubject ? 
      (<Timer 
        focusSubject={focusSubject} 
        clearSubject={() =>
           {addFocusHistorySubjectWithState(focusSubject, STATUS.FAILURE), 
           setFocusSubject(null)}}
        onTimerEnd={() => {
           addFocusHistorySubjectWithState(focusSubject, STATUS.COMPLETE)
           setFocusSubject(null)
      }}></Timer>) :
      // Else show focus enter screen
      (
        <View style={{ flex: 1 }}>
  <Focus addSubject={setFocusSubject}></Focus>
  <FocusHistory focusHistory={focusHistory} onClear={() => onClear()}></FocusHistory>
        </View>
    
      )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue
  },
});


//29