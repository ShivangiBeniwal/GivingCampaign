import { TurnContext } from "botbuilder";
import { TeamsConversationBot } from "../teamsConversationBot";
export declare class storage {
    static set(bot: TeamsConversationBot, context: TurnContext): void;
    static get(): {
        bot: TeamsConversationBot;
        context: TurnContext;
    };
}
