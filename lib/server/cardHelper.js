// Adaptive Card with assets detail and note.
export const getCardForMessage = (message) => ({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jYXJkSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1QyxPQUFPLEVBQUUsb0RBQW9EO0lBQzdELElBQUksRUFBRTtRQUNGO1lBQ0ksSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUUsT0FBTztTQUNoQjtRQUNEO1lBQ0ksSUFBSSxFQUFFLFdBQVc7WUFDakIsT0FBTyxFQUFFO2dCQUNMO29CQUNHLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLEdBQUcsRUFBRSxpRUFBaUU7aUJBQ3hFO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsSUFBSSxFQUFFLGNBQWM7SUFDcEIsT0FBTyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDIn0=