import { connect } from "react-redux";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { Message as DumbMessage, MessageComponentState } from "Common/UI/Model/Message";
import { Message as MessageData } from "Common/Domain/Model/Message";

type MessageProps = {
    messageData: MessageData
};

const mapStateToProps = (rootState: RootState, props: MessageProps): MessageComponentState => ({
    getTranslatorState: () => rootState.translator,
    messageData: props.messageData,
});

export const Message = connect(mapStateToProps)(DumbMessage);
