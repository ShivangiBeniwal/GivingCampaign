import { TeamsActivityHandler, TurnContext } from 'botbuilder';
export declare const ConversationRef: {};
export declare const ConversationDataRef: {};
export declare class TeamsConversationBot extends TeamsActivityHandler {
    constructor();
    addConversationReference(activity: any): void;
    addConversationDataReference(context: any): Promise<void>;
    cardActivityAsync(context: TurnContext, isUpdate: any): Promise<void>;
    sendUpdateCard(context: TurnContext, cardActions: any): Promise<void>;
    sendWelcomeCard(context: TurnContext, cardActions: any): Promise<void>;
    getSingleMember(context: TurnContext): Promise<void>;
    mentionActivityAsync(context: TurnContext): Promise<void>;
    deleteCardActivityAsync(context: TurnContext): Promise<void>;
    messageAllMembersAsync(context: TurnContext): Promise<void>;
    getPagedMembers(context: TurnContext): Promise<any>;
}
