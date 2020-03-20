import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {UpdateUser} from "Common/EntityCache/Domain/User/Command/UpdateUser";
import {UserRepository} from "Common/EntityCache/Domain/User/UserRepository";

export class RequestCommandHandler implements CommandHandler {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.UPDATE_USER,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.UPDATE_USER) {
            this.userRepository.updateUser(command.payload.user);
        }
    }
}

type SupportedCommand = (
    UpdateUser
);

export enum CommandTypes {
    UPDATE_USER = 'SEND_HTTP_REQUEST-7ad21656-3750-4b46-a227-a97f27c6dc91',
}