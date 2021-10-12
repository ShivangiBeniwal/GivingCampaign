"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required packages
const dotenv_1 = require("dotenv");
const path = __importStar(require("path"));
const http_1 = __importDefault(require("http"));
const http_errors_1 = __importDefault(require("http-errors"));
const cardHelper = __importStar(require("./server/cardHelper"));
console.log("=======" + __dirname);
// // Import required bot services.
// // See https://aka.ms/bot-services to learn more about the different parts of a bot.
const botbuilder_1 = require("botbuilder");
// // This bot's main dialog.
const teamsConversationBot_1 = require("./server/teamsConversationBot");
const express_1 = __importDefault(require("express"));
// Read botFilePath and botFileSecret from .env file.
const ENV_FILE = path.join(__dirname, '..', '.env');
(0, dotenv_1.config)({ path: ENV_FILE });
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new botbuilder_1.BotFrameworkAdapter({
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
const bot = new teamsConversationBot_1.TeamsConversationBot();
// Create HTTP server.
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path.join(__dirname, '')));
// Listen for incoming requests.
app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, (context) => __awaiter(void 0, void 0, void 0, function* () {
        yield bot.run(context);
    }));
});
app.post('/api/notify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside noti");
    if (teamsConversationBot_1.ConversationRef.size > 0) {
        teamsConversationBot_1.ConversationRef.forEach((value, key) => {
            adapter.continueConversation(value, (turnContext) => __awaiter(void 0, void 0, void 0, function* () {
                const card = botbuilder_1.CardFactory.adaptiveCard(cardHelper.getCardForMessage(req.body.message));
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.write("attachments:" + JSON.stringify(card));
                res.end();
                yield turnContext.sendActivity(botbuilder_1.MessageFactory.attachment(card));
            }));
        });
        return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(500);
    res.write('<html><body><h1>ERROR : Proactive messages have not been sent as there are no ConversationReferences.</h1></body></html>');
    res.end();
}));
// view engine setup
app.set('views', path.join(__dirname, '..', 'client/views'));
app.set('view engine', 'pug');
// Setup home page
app.get('/', (req, res) => {
    console.log("---------" + path.join(__dirname, '..', 'client/views'));
    res.render('main');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
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
var server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    console.log(`\n${JSON.stringify(server)} listening to ${server.address}`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});
// Listen for Upgrade requests for Streaming.
server.on('upgrade', (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new botbuilder_1.BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    });
    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler;
    streamingAdapter.useWebSocket(req, socket, head, (context) => __awaiter(void 0, void 0, void 0, function* () {
        // After connecting via WebSocket, run this logic for every request sent over
        // the WebSocket connection.
        yield bot.run(context);
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREO0FBQzVELGtDQUFrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxDLDJCQUEyQjtBQUMzQixtQ0FBZ0M7QUFDaEMsMkNBQTZCO0FBQzdCLGdEQUF3QjtBQUN4Qiw4REFBMEM7QUFDMUMsZ0VBQWtEO0FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRWhDLG1DQUFtQztBQUNuQyx1RkFBdUY7QUFDdkYsMkNBQThIO0FBRTlILDZCQUE2QjtBQUM3Qix3RUFBc0Y7QUFDdEYsc0RBQThCO0FBRzlCLHFEQUFxRDtBQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEQsSUFBQSxlQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUUzQixrQkFBa0I7QUFDbEIscUVBQXFFO0FBQ3JFLE1BQU0sT0FBTyxHQUFHLElBQUksZ0NBQW1CLENBQUM7SUFDcEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztJQUNqQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7Q0FDaEQsQ0FBQyxDQUFDO0FBRUgsd0JBQXdCO0FBQ3hCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBUSxPQUFxSSxFQUFFLEtBQVUsRUFBRyxFQUFFO0lBQ3JMLGlFQUFpRTtJQUNqRSw2RUFBNkU7SUFDN0UsOEJBQThCO0lBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUUscUNBQXNDLEtBQU0sRUFBRSxDQUFFLENBQUM7SUFFaEUsMkVBQTJFO0lBQzNFLE1BQU0sT0FBTyxDQUFDLGlCQUFpQixDQUMzQixtQkFBbUIsRUFDbkIsR0FBSSxLQUFNLEVB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