import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { useAuth } from "@clerk/clerk-expo";

export default function Home(){
    const {signOut} = useAuth()

    return(
        <View style={styles.container}>
            <Button icon='exit' title='Sair' style={styles.button} onPress={() => signOut()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      },
    button:{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#284DEB',
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center'
      },
})