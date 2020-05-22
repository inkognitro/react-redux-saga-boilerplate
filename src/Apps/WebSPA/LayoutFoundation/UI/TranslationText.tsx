import { connect } from "react-redux";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { TranslationTextWC as DumbTranslationText, WCTranslationTextState } from "Packages/Common/Translator/UI/TranslationTextWC";
import {Translation} from "Packages/Common/Types";

type TranslationTextProps = {
    translationData: TranslationData
};

const mapStateToProps = (rootState: RootState, props: TranslationTextProps): WCTranslationTextState => ({
    translatorState: rootState.translator,
    translation: props.translationData,
});

export const TranslationText = connect(mapStateToProps)(DumbTranslationText);
