import React, { FC } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    StatusBar,
} from 'react-native';
import { Provider as StoreProvider } from "react-redux";
import { ToasterNC } from "Packages/Common/Toaster/Native";
import { createAppServices } from "./ServicesFactory";

const services = createAppServices();

export const App: FC = () => (
    <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View>
                    <StoreProvider store={services.store}>
                        <ToasterNC />
                    </StoreProvider>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
);
