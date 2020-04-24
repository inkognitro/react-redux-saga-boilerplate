import { Command } from "Common/Domain/Bus/Command";
import { ToasterCommandTypes } from "Common/Domain/Toaster/Types";

export function createRemoveMessage(messageId: string): RemoveMessage {
  return {
    type: ToasterCommandTypes.REMOVE_MESSAGE,
    payload: {
      messageId,
    },
  };
}

export type RemoveMessage = Command<
  ToasterCommandTypes.REMOVE_MESSAGE,
  {
    messageId: string;
  }
>;
