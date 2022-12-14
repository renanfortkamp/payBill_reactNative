import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../Services/Service";
import { CmStyle } from "../../Styles/CmStyle";
import { useIsFocused } from "@react-navigation/native";
import barra from "../../imgs/barra.png";

export default function Boletos() {
    const { width, height } = Dimensions.get("screen");
    const [id, setId] = useState("");
    const [pagamentos, setPagamentos] = useState([]);
    const [render, setRender] = useState(false);
    const focused = useIsFocused();

    const getId = async () => {
        const values = await AsyncStorage.getItem("@storage_Key");
        if (values != null) {
            const idParse = JSON.parse(values);
            setId(idParse);
        }
    };

    function getPagamentos() {
        try {
            fetch(api + "/invoices?userId=" + id)
                .then(async (Response) => {
                    const dataInvoices = await Response.json();
                    if (dataInvoices.length >= 1) {
                        setPagamentos(dataInvoices);
                        setRender(true);
                    }
                })
                .catch((error) => {
                    alert(
                        "Nossos servidores estão indisponiveis, tente novamente mais tarde!"
                    );
                });
        } catch (error) {
            console.log("erro no try:", error);
        }
    }

    useEffect(() => {
        if(id){
            getPagamentos();
        }
        
    }, [focused]);

    
    useEffect(() => {
        setRender(false);
        if(!id){
            getId();
        }
    }, [focused]);
    return (
        <SafeAreaView
            style={{ ...CmStyle.conteiner, backgroundColor: "#212529" }}
        >
            <Text
                style={{
                    color:"#28ff52",
                    fontSize: 30,
                    fontWeight: "bold",
                    alignSelf: "center",
                    marginVertical: 10,
                }}
            >
                Boletos Pagos
            </Text>
            <ScrollView>
                {render == false && (
                    <Text
                        style={{
                            color:"#fff",
                            alignSelf: "center",
                            fontSize: 20,
                            textAlign: "center",
                            padding: 20,
                        }}
                    >
                        Nenhum pagamento realizado ou ainda não foi processado.
                    </Text>
                )}

                {render == true &&
                    pagamentos.map((boleto) => (
                        <View
                            style={{
                                borderColor: "#000",
                                borderWidth: 3,
                                padding: 5,
                                marginVertical: 5,
                                backgroundColor: "#FFF",
                                width: "95%",
                                alignSelf: "center",
                            }}
                            key={boleto.id}
                        >
                            <Text style={{ fontSize: 25, fontWeight: "bold",backgroundColor:"#fff",borderColor:"#000",borderWidth:2,textAlign:"center" }}>
                                {boleto.recipient}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 10,
                                    alignItems: "center",
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{ fontSize: 17 }}>
                                    {boleto.date}
                                </Text>
                                <Text
                                    style={{ fontSize: 25, fontWeight: "bold" }}
                                >
                                    R$ {boleto.amount}
                                </Text>
                            </View>

                            <Text
                                style={{fontSize: 17 }}
                            >
                                Cashback: R$ {boleto.cashback}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 17,
                                    alignSelf: "center",
                                    fontWeight: "bold",
                                    letterSpacing: 5,
                                    marginTop: 10,
                                }}
                            >
                                {boleto.code}
                            </Text>
                            <Image
                                style={{
                                    ...styles.tinyLogo,
                                    alignSelf: "center",
                                    marginBottom: 5,
                                    marginTop: 1,
                                }}
                                source={barra}
                            />
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: "100%",
        height: 50,
    },
});
