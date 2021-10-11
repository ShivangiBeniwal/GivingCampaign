// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Import required packages
import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import * as send from 'send';
import * as cardHelper from './cardHelper';

import { INodeSocket } from 'botframework-streaming';

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
import { BotFrameworkAdapter, CardFactory } from 'botbuilder';

// This bot's main dialog.
import { TeamsConversationBot, ConversationRef } from './teamsConversationBot';

// Read botFilePath and botFileSecret from .env file.
const ENV_FILE = path.join(__dirname, '..', '.env');
config({ path: ENV_FILE });

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
const onTurnErrorHandler = async ( context, error ) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error( `\n [onTurnError] unhandled error: ${ error }` );

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity( 'The bot encountered an error or bug.' );
    await context.sendActivity( 'To continue to run this bot, please fix the bot source code.' );
};

// Set the onTurnError for the singleton BotFrameworkAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Create the bot that will handle incoming messages.
const bot = new TeamsConversationBot();

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log( `\n${ server.name } listening to ${ server.url }` );
    console.log( '\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator' );
    console.log( '\nTo talk to your bot, open the emulator select "Open Bot"' );
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity( req, res, async ( context ) => {
        await bot.run(context);
    });
});

server.post('/api/Notify', async (req, res) => {
    console.log("inside noti")
    for (const conversationReference of Object.values(ConversationRef)) {
        await adapter.continueConversation(conversationReference, async turnContext => {
            await turnContext.sendActivity({ attachments: [CardFactory.adaptiveCard(cardHelper.getCardForMessage(req.body.message))] });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write('<html><body><h1>Proactive messages have been sent.</h1></body></html>');
    res.end();
});

server.get(
    '/*',
    restify.plugins.serveStatic({
        directory: path.join(__dirname)
    })
);

// Setup home page
server.get('/', (req, res) => {
    send(req, 'src/views/hello.html').pipe(res);
});

// Listen for Upgrade requests for Streaming.
server.on( 'upgrade', ( req, socket, head ) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter( {
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    } );
    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler;

    streamingAdapter.useWebSocket(req, socket as unknown as INodeSocket, head, async (context) => {
        // After connecting via WebSocket, run this logic for every request sent over
        // the WebSocket connection.
        await bot.run( context );
    } );
} );
