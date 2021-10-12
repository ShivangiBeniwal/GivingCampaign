"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardForMessage = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jYXJkSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE2QztBQUN0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sRUFBRSxvREFBb0Q7SUFDN0QsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxPQUFPO1NBQ2hCO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0csSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsR0FBRyxFQUFFLGlFQUFpRTtpQkFDeEU7YUFDSjtTQUNKO0tBQ0o7SUFDRCxJQUFJLEVBQUUsY0FBYztJQUNwQixPQUFPLEVBQUUsS0FBSztDQUNqQixDQUFDLENBQUM7QUF0Qk0sUUFBQSxpQkFBaUIscUJBc0J2QiJ9