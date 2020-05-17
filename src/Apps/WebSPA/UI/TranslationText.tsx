import { connect } from "react-redux";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { TranslationText as DumbTranslationText, TranslationComponentState } from "Packages/Common/UI/Web/TranslationText";
import {Translation} from "Packages/Common/Domain/Types";

type TranslationTextProps = {
    translationData: TranslationData
};

const mapStateToProps = (rootState: RootState, props: TranslationTextProps): TranslationComponentState => ({
    translatorState: rootState.translator,
    translation: props.translationData,
});

export const TranslationText = connect(mapStateToProps)(DumbTranslationText);
