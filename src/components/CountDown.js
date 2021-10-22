import React , {useState, useEffect} from "react";
import { View, Text,StyleSheet } from "react-native";
import { colors } from "../utils/color";
import { fontSizes, spaces, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time

export const CountDown = ({
    minutes,
    isPaused,
    onProgress,
    onEnd
}) => {
    const interval = React.useRef(null);
    const [millis, setMillies] = useState(minutesToMillis(minutes));

    const countDown = () => {
        setMillies((time) => {
            if(time === 0){
                clearInterval(interval.current);
                return time;
            }

            const timeLeft = time - 1000;
            return timeLeft;
        })
    }

    useEffect(() => {
        setMillies(minutesToMillis(minutes));
    }, [minutes]);
    
    useEffect(() => {
        onProgress(millis / minutesToMillis(minutes));
        if(millis == 0){
            onEnd();
        }
    }, [millis]);

    useEffect(() => {
        if(isPaused){
            if(interval.current) clearInterval(interval.current)
            return;
        }
        interval.current = setInterval(countDown, 1000)

        return () => clearInterval(interval.current)
    }, [isPaused])

    
    const minute = Math.floor(millis / 1000 / 60) % 60;
    const second = Math.floor(millis / 1000) % 60;
    return (
        <Text style={styles.text}>
            {formatTime(minute)}:{formatTime(second)}
        </Text>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    text : {
        color:colors.white,
        fontSize: fontSizes.xxxl,
        fontWeight:"bold",
        padding: spacing.lg,
        backgroundColor: 'rgba(94, 132, 226, 0.3)'
    }
})