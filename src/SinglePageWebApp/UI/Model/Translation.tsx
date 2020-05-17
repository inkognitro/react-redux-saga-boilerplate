import { connect } from "react-redux";
import { RootState } from "SinglePageWebApp/Bootstrap/ServicesFactory";
import { Translation as DumbTranslation, TranslationComponentState } from "Packages/Common/UI/Web/Model/Translation";
import { Translation as TranslationData } from "Packages/Common/Domain/Model/Translation";

type TranslationProps = {
    translationData: TranslationData
};

const mapStateToProps = (rootState: RootState, props: TranslationProps): TranslationComponentState => ({
    translatorState: rootState.translator,
    translationData: props.translationData,
});

export const Translation = connect(mapStateToProps)(DumbTranslation);
