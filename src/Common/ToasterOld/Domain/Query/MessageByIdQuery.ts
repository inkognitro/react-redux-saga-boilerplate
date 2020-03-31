import {Message, ToasterState} from "Common/ToasterOld/Domain/Types";

export function findMessageById(state: ToasterState, messageId: string): (null | Message) {
    for(let index in state.toasts) {
        const toast = state.toasts[index];
        const foundMessage = toast.messages.find((message) => (message.id === messageId));
        if(foundMessage) {
            return foundMessage;
        }
    }
    return null;
}