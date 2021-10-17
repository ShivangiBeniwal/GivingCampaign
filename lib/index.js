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
// Define the state store for your bot.
// See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
// A bot requires a state storage system to persist the dialog and user state between messages.
// const memoryStorage = new MemoryStorage();
// // Create conversation and user state with in-memory storage provider.
// const conversationState = new ConversationState(memoryStorage);
// const userState = new UserState(memoryStorage);
// // Create the main dialog.
// const dialog = new MainDialog();
// // Create the main dialog.
// const ssoOAuthHelper = new SsoOAuthHelpler(process.env.ConnectionName, memoryStorage);
// // Create the bot that will handle incoming messages.
// const bot = new TeamsBot(ssoOAuthHelper, conversationState, userState, dialog)
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
    if (teamsConversationBot_1.ConversationRef.has(req.body.key)) {
        yield adapter.continueConversation(teamsConversationBot_1.ConversationRef.get(req.body.key), (turnContext) => __awaiter(void 0, void 0, void 0, function* () {
            const card = botbuilder_1.CardFactory.adaptiveCard(cardHelper.getCardForMessage(req.body.message));
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.write("attachments:" + JSON.stringify(card));
            res.end();
            yield turnContext.sendActivity(botbuilder_1.MessageFactory.attachment(card));
        }));
        return;
    }
    var error = "Error : " + teamsConversationBot_1.ConversationRef.size + ", " + req.body.key + "\n";
    teamsConversationBot_1.ConversationRef.forEach((value, key) => {
        error += "---" + key + "=" + value + (req.body.key === key) + "\n";
    });
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(500);
    res.write('<html><body><h1>ERROR : ' + error + 'Proactive message have not been sent because no matching user found in ConversationReferences.</h1></body></html>');
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
    // console.log(`\n${server.name} listening to ${server.url}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREO0FBQzVELGtDQUFrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxDLDJCQUEyQjtBQUMzQixtQ0FBZ0M7QUFDaEMsMkNBQTZCO0FBQzdCLGdEQUF3QjtBQUN4Qiw4REFBMEM7QUFDMUMsZ0VBQWtEO0FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRWhDLG1DQUFtQztBQUNuQyx1RkFBdUY7QUFDdkYsMkNBQTJLO0FBRTNLLDZCQUE2QjtBQUM3Qix3RUFBc0Y7QUFDdEYsc0RBQThCO0FBTTlCLHFEQUFxRDtBQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEQsSUFBQSxlQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUUzQixrQkFBa0I7QUFDbEIscUVBQXFFO0FBQ3JFLE1BQU0sT0FBTyxHQUFHLElBQUksZ0NBQW1CLENBQUM7SUFDcEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztJQUNqQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7Q0FDaEQsQ0FBQyxDQUFDO0FBRUgsd0JBQXdCO0FBQ3hCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBUSxPQUFxSSxFQUFFLEtBQVUsRUFBRyxFQUFFO0lBQ3JMLGlFQUFpRTtJQUNqRSw2RUFBNkU7SUFDN0UsOEJBQThCO0lBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUUscUNBQXNDLEtBQU0sRUFBRSxDQUFFLENBQUM7SUFFaEUsMkVBQTJFO0lBQzNFLE1BQU0sT0FBTyxDQUFDLGlCQUFpQixDQUMzQixtQkFBbUIsRUFDbkIsR0FBSSxLQUFNLEVB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