import { connect } from "react-redux";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { TranslationTextWC as DumbTranslationTextWC, TranslationTextWCState } from "Packages/Common/Translator";
import { Translation } from "Packages/Common/CommonTypes";

type TranslationTextWCProps = {
    translationData: Translation
};

const mapStateToProps = (rootState: RootState, props: TranslationTextWCProps): TranslationTextWCState => ({
    translatorState: rootState.translator,
    translation: props.translationData,
});

export const TranslationTextWC = connect(mapStateToProps)(DumbTranslationTextWC);
