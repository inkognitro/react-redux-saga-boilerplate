import { connect } from "react-redux";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { Translation as DumbTranslation, TranslationComponentState } from "Common/UI/Model/Translation";
import { Translation as TranslationData } from "Common/Domain/Model/Translation";

type TranslationProps = {
    translationData: TranslationData
};

const mapStateToProps = (rootState: RootState, props: TranslationProps): TranslationComponentState => ({
    getTranslatorState: () => rootState.translator,
    translationData: props.translationData,
});

export const Translation = connect(mapStateToProps)(DumbTranslation);
