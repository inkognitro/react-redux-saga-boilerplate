import { connect } from "react-redux";
import { RootState } from "SinglePageWebApp/Bootstrap/ServicesFactory";
import { TranslatedText as DumbTranslation, TranslationComponentState } from "Packages/Common/UI/Web/TranslatedText";
import { Translation as TranslationData } from "Entity/Domain/Translation";

type TranslationProps = {
    translationData: TranslationData
};

const mapStateToProps = (rootState: RootState, props: TranslationProps): TranslationComponentState => ({
    translatorState: rootState.translator,
    translationData: props.translationData,
});

export const TranslatedText = connect(mapStateToProps)(DumbTranslation);
