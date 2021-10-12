// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import required packages
import { config } from 'dotenv';
import * as path from 'path';
import http from 'http';
import createHttpError from 'http-errors';
import * as cardHelper from './server/cardHelper.js';
const __dirname = path.resolve();
console.log("=======" + __dirname);
// // Import required bot services.
// // See https://aka.ms/bot-services to learn more about the different parts of a bot.
import { BotFrameworkAdapter, CardFactory } from 'botbuilder';
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
const onTurnErrorHandler = (context, error) => __awaiter(void 0, void 0, void 0, function* () {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    // Send a trace activity, which will be displayed in Bot Framework Emulator
    yield context.sendTraceActivity('OnTurnError Trace', `${error}`, 'https://www.botframework.com/schemas/error', 'TurnError');
    // Send a message to the user
    yield context.sendActivity('The bot encountered an error or bug.');
    yield context.sendActivity('To continue to run this bot, please fix the bot source code.');
});
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
app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, (context) => __awaiter(void 0, void 0, void 0, function* () {
        yield bot.run(context);
    }));
});
app.post('/api/notify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside noti");
    for (const conversationReference of Object.values(ConversationRef)) {
        yield adapter.continueConversation(conversationReference, (turnContext) => __awaiter(void 0, void 0, void 0, function* () {
            yield turnContext.sendActivity({ attachments: [CardFactory.adaptiveCard(cardHelper.getCardForMessage(req.body.message))] });
        }));
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write('<html><body><h1>Proactive messages have been sent.</h1></body></html>');
    res.end();
}));
// view engine setup
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'pug');
// Setup home page
app.get('/', (req, res) => {
    console.log("---------" + path.join(__dirname, 'client/views'));
    res.render('main');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createHttpError(404));
});
// error handler
app.use(function (err, req, res, next) {
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
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});
// Listen for Upgrade requests for Streaming.
server.on('upgrade', (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    });
    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler;
    //    streamingAdapter.useWebSocket(req, socket, head, async (context) => {
    //        // After connecting via WebSocket, run this logic for every request sent over
    //        // the WebSocket connection.
    //        await bot.run( context );
    //    } );
});
/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', onError);
function onError(error) {
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
function normalizePort(val) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0REFBNEQ7QUFDNUQsa0NBQWtDOzs7Ozs7Ozs7O0FBRWxDLDJCQUEyQjtBQUMzQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLGVBQWUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxLQUFLLFVBQVUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDLENBQUE7QUFFaEMsbUNBQW1DO0FBQ25DLHVGQUF1RjtBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUEyQixNQUFNLFlBQVksQ0FBQztBQUV2Riw2QkFBNkI7QUFDN0IsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pGLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUU5QixxREFBcUQ7QUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFFM0Isa0JBQWtCO0FBQ2xCLHFFQUFxRTtBQUNyRSxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDO0lBQ3BDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7SUFDakMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CO0NBQ2hELENBQUMsQ0FBQztBQUVILHdCQUF3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