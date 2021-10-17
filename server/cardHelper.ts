// Adaptive Card with assets detail and note.
export const getCardForMessage = (message: any) => ({
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

export const signedOutCard = () => ({
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