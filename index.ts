// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Import required packages
import { config } from 'dotenv';
import * as path from 'path';
import http from 'http';
import createHttpError from 'http-errors';
import * as cardHelper from './server/cardHelper.js';
const __dirname = path.resolve();
console.log("======="+__dirname)

// // Import required bot services.
// // See https://aka.ms/bot-services to learn more about the different parts of a bot.
import { BotFrameworkAdapter, CardFactory, WebRequest, WebResponse } from 'botbuilder';

// // This bot's main dialog.
import { TeamsConversationBot, ConversationRef } from './server/teamsConversationBot.js';
import express from 'express';

// Read botFilePath and botFileSecret from .env file.
const ENV_FILE = path.join(__dirname, '.env');
config({ path: ENV_FILE });

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
const onTurnErrorHandler = async ( context: { sendTraceActivity: (arg0: string, arg1: string, arg2: string, arg3: string) => any; sendActivity: (arg0: string) => any; }, error: any ) => {
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
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '')));

// Listen for incoming requests.
app.post('/api/messages', (req: WebRequest, res: WebResponse) => {
    adapter.processActivity( req, res, async ( context ) => {
        await bot.run(context);
    });
});

app.post('/api/notify', async (req: { body: { message: any; }; },
    res: { setHeader: (arg0: string, arg1: string) => void;
        writeHead: (arg0: number) => void;
        write: (arg0: string) => void;
        end: () => void; }) => {
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

// view engine setup
app.set('views', path.join(__dirname, 'client/views'))
app.set('view engine', 'pug');

// Setup home page
app.get('/', (req: any, res: any) => {
    console.log("---------"+ path.join(__dirname, 'client/views'))
    res.render('main');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createHttpError(404));
});

// error handler
app.use(function(err: { message: any; status: any; },
    req: { app: { get: (arg0: string) => string; }; },
    res: { locals: { message: any; error: any; };
    status: (arg0: any) => void;
    render: (arg0: string) => void; },
    next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Get port from environment and store in Express.
 */
 var port = normalizePort(process.env.port || process.env.PORT || '3978');
 app.set('port', port);

 /**
  * Create HTTP server.
  */
 var server = http.createServer(app);

 /**
  * Listen on provided port, on all network interfaces.
  */
 server.listen(port, () => {
//    console.log( `\n${ server.name } listening to ${ server.url }` );
   console.log( '\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator' );
   console.log( '\nTo talk to your bot, open the emulator select "Open Bot"' );
 });

 // Listen for Upgrade requests for Streaming.
 server.on('upgrade', ( req, socket, head ) => {
   // Create an adapter scoped to this WebSocket connection to allow storing session data.
   const streamingAdapter = new BotFrameworkAdapter( {
       appId: process.env.MicrosoftAppId,
       appPassword: process.env.MicrosoftAppPassword
   } );
   // Set onTurnError for the BotFrameworkAdapter created for each connection.
   streamingAdapter.onTurnError = onTurnErrorHandler;

//    streamingAdapter.useWebSocket(req, socket, head, async (context) => {
//        // After connecting via WebSocket, run this logic for every request sent over
//        // the WebSocket connection.
//        await bot.run( context );
//    } );
 } );

 /**
  * Event listener for HTTP server "error" event.
  */

server.on('error', onError);
function onError(error: { syscall: string; code: any; }) {
   if (error.syscall !== 'listen') {
     throw error;
   }

   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
     default:
       throw error;
   }
}

 /**
  * Normalize a port into a number, string, or false.
  */

function normalizePort(val: string) {
   var port = parseInt(val, 10);

   if (isNaN(port)) {
     // named pipe
     return val;
   }

   if (port >= 0) {
     // port number
     return port;
   }

   return false;
}