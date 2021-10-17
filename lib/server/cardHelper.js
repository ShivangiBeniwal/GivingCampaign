"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signedOutCard = exports.getCardForMessage = void 0;
// Adaptive Card with assets detail and note.
const getCardForMessage = (message) => ({
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    body: [
        {
            type: 'TextBlock',
            size: 'Medium',
            weight: 'Bolder',
            text: message
        },
        {
            type: 'ActionSet',
            actions: [
                {
                    type: "Action.OpenUrl",
                    title: "View documents",
                    url: "https://microsoftapc.sharepoint.com/_layouts/15/sharepoint.aspx"
                }
            ]
        }
    ],
    type: 'AdaptiveCard',
    version: '1.4'
});
exports.getCardForMessage = getCardForMessage;
const signedOutCard = () => ({
    version: '1.0.0',
    type: 'AdaptiveCard',
    body: [
        {
            type: 'TextBlock',
            text: 'You have been signed out.'
        }
    ],
    actions: [
        {
            type: 'Action.Submit',
            title: 'Close',
            data: {
                key: 'close'
            }
        }
    ]
});
exports.signedOutCard = signedOutCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jYXJkSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE2QztBQUN0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sRUFBRSxvREFBb0Q7SUFDN0QsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxPQUFPO1NBQ2hCO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0csSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsR0FBRyxFQUFFLGlFQUFpRTtpQkFDeEU7YUFDSjtTQUNKO0tBQ0o7SUFDRCxJQUFJLEVBQUUsY0FBYztJQUNwQixPQUFPLEVBQUUsS0FBSztDQUNqQixDQUFDLENBQUM7QUF0Qk0sUUFBQSxpQkFBaUIscUJBc0J2QjtBQUVBLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUIsT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsMkJBQTJCO1NBQ3BDO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDTDtZQUNJLElBQUksRUFBRSxlQUFlO1lBQ3JCLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFO2dCQUNGLEdBQUcsRUFBRSxPQUFPO2FBQ2Y7U0FDSjtLQUNKO0NBQ0osQ0FBQyxDQUFDO0FBbEJNLFFBQUEsYUFBYSxpQkFrQm5CIn0=