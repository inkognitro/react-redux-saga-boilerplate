import React, { FC } from "react";
import {
    Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View,
} from 'react-native';
import { Provider as StoreProvider } from "react-redux";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createShowMessage, ToastTypes } from "packages/common/toaster/domain";
import uuidV4 from 'uuid/v4';
import { createAppServices } from "./services.factory";
import { Toaster } from "./foundation/toaster";

const services = createAppServices();

export const App: FC = () => (
    <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            <StoreProvider store={services.store}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Toaster Demo</Text>
                        <Text style={styles.sectionDescription}>
                            The toaster below uses the toaster domain logic
                            but the native view.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Button
                            onPress={() => services.store.dispatch(createShowMessage({
                                content: {
                                    translationId: uuidV4(),
                                    fallback: 'Some static typed sample message.',
                                },
                                toastType: ToastTypes.INFO,
                            }))}
                            title="Add message"
                            color="#841584"
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Toaster />
                    </View>
                </ScrollView>
            </StoreProvider>
        </SafeAreaView>
    </>
);

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    footer: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});
