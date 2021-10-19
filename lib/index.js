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
const Config = __importStar(require("./server/config/default"));
const routes_1 = __importDefault(require("./server/routes"));
console.log("=======" + __dirname);
// // Import required bot services.
// // See https://aka.ms/bot-services to learn more about the different parts of a bot.
const botbuilder_1 = require("botbuilder");
// // This bot's main dialog.
const givingBot_1 = require("./server/givingBot");
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
const bot = new givingBot_1.GivingBot();
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
    // if (ConversationRef.has(req.body.key)) {
    givingBot_1.ConversationRef.forEach((value, key) => {
        adapter.continueConversation(value, (turnContext) => __awaiter(void 0, void 0, void 0, function* () {
            const card = botbuilder_1.CardFactory.adaptiveCard(cardHelper.newsLetterCard());
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.write("attachments:" + JSON.stringify(card));
            res.end();
            yield turnContext.sendActivity(botbuilder_1.MessageFactory.attachment(card));
        }));
    });
    // return
    // }
    //   var error = ConversationRef.size + ", " + req.body.key +"\n"
    //   ConversationRef.forEach((value:Partial<ConversationReference>, key: string) => {
    //     error += "---" + key + "=" + value + (req.body.key === key) +"\n"
    //   })
    //   res.setHeader('Content-Type', 'text/html');
    //   res.writeHead(500);
    // res.write('<html><body><h1>'
    //   + 'ERROR : Proactive message have not been sent because no matching user found in ConversationReferences.<br>'
    //   + error + '</h1></body></html>');
    //   res.end();
}));
// view engine setup
app.set('views', path.join(__dirname, '..', 'client/views'));
app.set('view engine', 'pug');
app.use('/static', express_1.default.static(path.join(__dirname, '..', 'client/')));
//setup other routes
(0, routes_1.default)(app);
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
var port = normalizePort(process.env.port || process.env.PORT || Config.io.port);
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    console.log(`App is running at ${port}`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
    //  dbConnect();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREO0FBQzVELGtDQUFrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxDLDJCQUEyQjtBQUMzQixtQ0FBZ0M7QUFDaEMsMkNBQTZCO0FBQzdCLGdEQUF3QjtBQUN4Qiw4REFBMEM7QUFDMUMsZ0VBQWtEO0FBQ2xELGdFQUFrRDtBQUVsRCw2REFBcUM7QUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDLENBQUE7QUFFaEMsbUNBQW1DO0FBQ25DLHVGQUF1RjtBQUN2RiwyQ0FBMks7QUFFM0ssNkJBQTZCO0FBQzdCLGtEQUFnRTtBQUNoRSxzREFBOEI7QUFNOUIscURBQXFEO0FBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNwRCxJQUFBLGVBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBRTNCLGtCQUFrQjtBQUNsQixxRUFBcUU7QUFDckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQ0FBbUIsQ0FBQztJQUNwQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO0lBQ2pDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQjtDQUNoRCxDQUFDLENBQUM7QUFFSCx3QkFBd0I7QUFDeEIsTUFBTSxrQkFBa0IsR0FBRyxDQUFRLE9BQXFJLEVBQUUsS0FBVSxFQUFHLEVBQUU7SUFDckwsaUVBQWlFO0lBQ2pFLDZFQUE2RTtJQUM3RSw4QkFBOEI7SUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBRSxxQ0FBc0MsS0FBTSxFQUFFLENBQUUsQ0FBQztJQUVoRSwyRUFBMkU7SUFDM0UsTUFBTSxPQUFPLENBQUMsaUJBQWlCLENBQzNCLG1CQUFtQixFQUNuQixHQUFJLEtBQU0sRUFBRSxFQUNaLDRDQUE0QyxFQUM1QyxXQUFXLENBQ2QsQ0FBQztJQUVGLDZCQUE2QjtJQUM3QixNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUUsc0NBQXNDLENBQUUsQ0FBQztJQUNyRSxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUUsOERBQThELENBQUUsQ0FBQztBQUNqRyxDQUFDLENBQUEsQ0FBQztBQUVGLDZEQUE2RDtBQUM3RCxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO0FBRXpDLHVDQUF1QztBQUN2Qyw4RUFBOEU7QUFDOUUsK0ZBQStGO0FBQy9GLDZDQUE2QztBQUU3Qyx5RUFBeUU7QUFDekUsa0VBQWtFO0FBQ2xFLGtEQUFrRDtBQUVsRCw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3Qix5RkFBeUY7QUFDekYsd0RBQXdEO0FBQ3hELGlGQUFpRjtBQUNqRixNQUFNLEdBQUcsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztBQUU1QixzQkFBc0I7QUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFbEQsZ0NBQWdDO0FBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBZSxFQUFFLEdBQWdCLEVBQUUsRUFBRTtJQUM1RCxPQUFPLENBQUMsZUFBZSxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBUSxPQUFPLEVBQUcsRUFBRTtRQUNuRCxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBTyxHQUFnRCxFQUMzRSxHQUdzQixFQUFFLEVBQUU7SUFDMUIsMkNBQTJDO0lBRXpDLDJCQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBcUMsRUFBRSxHQUFXLEVBQUUsRUFBRTtRQUM3RSxPQUFPLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQU0sV0FBVyxFQUFDLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEdBQUcsd0JBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDbkUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDUixNQUFNLFdBQVcsQ0FBQyxZQUFZLENBQUMsMkJBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDRCxTQUFTO0lBQ1gsSUFBSTtJQUVOLGlFQUFpRTtJQUNqRSxxRkFBcUY7SUFDckYsd0VBQXdFO0lBQ3hFLE9BQU87SUFDUCxnREFBZ0Q7SUFDaEQsd0JBQXdCO0lBQ3hCLCtCQUErQjtJQUMvQixtSEFBbUg7SUFDbkgsc0NBQXNDO0lBQ3RDLGVBQWU7QUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILG9CQUFvQjtBQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtBQUM1RCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUU5QixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3pFLG9CQUFvQjtBQUNwQixJQUFBLGdCQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFFWix5Q0FBeUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUMzQixJQUFJLENBQUMsSUFBQSxxQkFBZSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxnQkFBZ0I7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQW1DLEVBQ2hELEdBQWlELEVBQ2pELEdBRWlDLEVBQ2pDLElBQVM7SUFDVCxrREFBa0Q7SUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRW5FLHdCQUF3QjtJQUN4QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7SUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUVIOztHQUVHO0FBQ0YsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFdEI7O0dBRUc7QUFDSCxJQUFJLE1BQU0sR0FBRyxjQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXBDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxvRUFBb0UsQ0FBRSxDQUFDO0lBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUUsNERBQTRELENBQUUsQ0FBQztJQUM3RSxnQkFBZ0I7QUFDakIsQ0FBQyxDQUFDLENBQUM7QUFFSCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRyxFQUFFO0lBQzNDLHVGQUF1RjtJQUN2RixNQUFNLGdCQUFnQixHQUFHLElBQUksZ0NBQW1CLENBQUU7UUFDOUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztRQUNqQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7S0FDaEQsQ0FBRSxDQUFDO0lBQ0osMkVBQTJFO0lBQzNFLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztJQUVsRCxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQWdDLEVBQUUsSUFBSSxFQUFFLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDekYsNkVBQTZFO1FBQzdFLDRCQUE0QjtRQUM1QixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUUsT0FBTyxDQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFBLENBQUUsQ0FBQztBQUNOLENBQUMsQ0FBRSxDQUFDO0FBRUo7O0dBRUc7QUFFSixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QixTQUFTLE9BQU8sQ0FBQyxLQUFzQztJQUNwRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzlCLE1BQU0sS0FBSyxDQUFDO0tBQ2I7SUFFRCxJQUFJLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRO1FBQ2pDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSTtRQUNoQixDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUVuQix1REFBdUQ7SUFDdkQsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1FBQ2xCLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLCtCQUErQixDQUFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLFlBQVk7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEI7WUFDRSxNQUFNLEtBQUssQ0FBQztLQUNmO0FBQ0osQ0FBQztBQUVBOztHQUVHO0FBRUosU0FBUyxhQUFhLENBQUMsR0FBVztJQUMvQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTdCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2YsYUFBYTtRQUNiLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDYixjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2hCLENBQUMifQ==