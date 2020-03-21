import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {Translator} from "Common/Translator/Domain/Translator";
import {SetUILanguage} from "Common/Translator/Domain/Command/SetUILanguage";

export class TranslatorCommandHandler implements CommandHandler {
    private readonly translator: Translator;

    constructor(translator: Translator) {
        this.translator = translator;
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.SET_UI_LANGUAGE,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.SET_UI_LANGUAGE) {
            this.translator.setUiLanguage(command.payload.languageId);
            return;
        }
    }
}

type SupportedCommand = (SetUILanguage);

export enum CommandTypes {
    SET_UI_LANGUAGE = 'SET_UI_LANGUAGE-42486f3c-e848-4371-810e-5c55d3cce2a6',
}