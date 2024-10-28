import { isLoading } from 'expo-font'
import { TouchableOpacity,TouchableOpacityProps, Text, ActivityIndicatorBase } from 'react-native'
import { Ionicons} from '@expo/vector-icons'

import {styles} from './styles'

interface ButtonProps extends TouchableOpacityProps{
    title: string
    isLoading?:boolean
    icon: keyof typeof Ionicons.glyphMap
}

export function Button({title, isLoading, icon, ...rest}: ButtonProps){
    return(
        <TouchableOpacity 
        style={styles.button} 
        disabled={isLoading} 
        activeOpacity={0.8} {...rest}>
            {isLoading ? (
                <ActivityIndicatorBase/> 
            ) :(<>
                <Ionicons name={icon}/>
                <Text>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    )
}