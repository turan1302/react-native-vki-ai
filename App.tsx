import React, {useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import RestClient from "./src/RestAPI/RestClient";
import AppUrl from "./src/RestAPI/AppUrl";

const App = () => {
    const [boy, setBoy] = useState('');
    const [loading, setLoading] = useState(false);
    const [tahmin, setTahmin] = useState(null);

    const predictKilo = async () => {

        setLoading(true);
        setTahmin("");
        await RestClient.postRequest(AppUrl.predict, {
            boy
        }).then((res)=>{
            const data = res.data;
            setTahmin(data.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 18, marginBottom: 15}}>TensorFlow.js React Native Boy-Kilo Tahmini</Text>


            <TextInput
                style={styles.input}
                placeholder="Boy (Örn: 1.70 gibi)"
                keyboardType="numeric"
                value={boy}
                onChangeText={setBoy}
            />

            <Button title={loading ? 'Tahmin Yapılıyor...' : 'Kilo Tahmin Et'} onPress={predictKilo}
                    disabled={loading || !boy}/>

            {tahmin !== null && <Text style={{marginTop: 20, fontSize: 16}}>Tahmini Kilo: {tahmin} kg</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    input: {borderWidth: 1, borderColor: '#999', padding: 10, marginVertical: 10, borderRadius: 5},
});

export default App
