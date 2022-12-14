import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

import React from "react";

import Qrimg from "../../imgs/94946-qr-scanner.json";

const { height, width } = Dimensions.get("screen");

import { CmStyle } from "../../Styles/CmStyle";

export default function Home({ navigation }) {
    function navigateToSingUp() {
        navigation.navigate("SingUp");
    }

    function navigateToLogin() {
        navigation.navigate("Login");
    }

    return (
        <SafeAreaView style={{ ...CmStyle.conteiner, alignItems: "center" }}>
            <StatusBar />
            <View
                style={{
                    width: width,
                    height: height * 0.23,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LottieView
                    autoPlay
                    style={{
                        marginTop: 15,
                        width: width * 0.9,
                    }}
                    source={Qrimg}
                />
            </View>

            <View>
                <ImageBackground
                    style={{ ...CmStyle.logoEdpCom, alignSelf: "center" }}
                    resizeMode="contain"
                    source={require("../../imgs/logo.png")}
                ></ImageBackground>
            </View>

            <TouchableOpacity
                onPress={navigateToSingUp}
                style={{
                    ...CmStyle.button,
                    alignSelf: "center",
                }}
            >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Abrir conta gratuita
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={navigateToLogin}
                style={{ ...CmStyle.button, alignSelf: "center" }}
            >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Fazer Login
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: "#212529",
        flex: 1,
    },
});
