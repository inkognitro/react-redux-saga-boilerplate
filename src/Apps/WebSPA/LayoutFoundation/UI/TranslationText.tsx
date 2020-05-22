import { connect } from "react-redux";
import { RootState } from "Apps/WebSPA/_bootstrap/ServicesFactory";
import { TranslationText as DumbTranslationText, TranslationComponentState } from "Packages/Common/Translator/WebUI/TranslationText";
import {Translation} from "Packages/Common/Types";

type TranslationTextProps = {
    translationData: TranslationData
};

const mapStateToProps = (rootState: RootState, props: TranslationTextProps): TranslationComponentState => ({
    translatorState: rootState.translator,
    translation: props.translationData,
});

export const TranslationText = connect(mapStateToProps)(DumbTranslationText);
