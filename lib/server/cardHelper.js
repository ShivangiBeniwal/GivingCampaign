"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityCard = exports.newsLetterCard = exports.orgSummaryCard = exports.updateCard = exports.fullCard = exports.newsLetterJson = exports.signedOutCard = exports.getCardForMessage = void 0;
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
exports.newsLetterJson = {
    url: "https://www.thisisarestaurant.com",
    name: "The Restaurant",
    image: "https://www.example.com/image-of-some-restaurant.jpg",
    description: "This is an example restaurant that serves American cuisine.",
    servesCuisine: [
        "American cuisine"
    ],
    hasMenu: {
        name: "Dine-In Menu",
        description: "Menu for in-restaurant dining only.",
        hasMenuSection: [
            {
                name: "Steak",
                description: "How would you like your steak prepared?",
                image: "https://contososcubademo.azurewebsites.net/assets/steak.jpg",
                offers: {
                    "availabilityEnds": "T8:22:00",
                    "availabilityStarts": "T8:22:00"
                },
                hasMenuSection: [
                    {
                        name: "Chicken",
                        description: "Do you have any allergies?",
                        image: "https://contososcubademo.azurewebsites.net/assets/chicken.jpg",
                        offers: {
                            "availabilityEnds": "T8:22:00",
                            "availabilityStarts": "T8:22:00"
                        },
                        hasMenuItem: {
                            name: "Potato Skins",
                            description: "Small serving of stuffed potato skins.",
                            offers: {
                                "price": "7.49",
                                "priceCurrency": "USD"
                            },
                            suitableForDiet: "http://schema.org/GlutenFreeDiet"
                        }
                    },
                    {
                        name: "Tofu",
                        description: "Would you like it prepared vegan?",
                        image: "https://contososcubademo.azurewebsites.net/assets/tofu.jpg",
                        offers: {
                            "availabilityEnds": "T8:22:00",
                            "availabilityStarts": "T8:22:00"
                        },
                        hasMenuItem: {
                            name: "Pea Soup",
                            description: "Creamy pea soup topped with melted cheese and sourdough croutons.",
                            offers: {
                                "price": "3.49",
                                "priceCurrency": "USD"
                            }
                        }
                    }
                ]
            }
        ]
    }
};
const fullCard = () => ({
    "type": "AdaptiveCard",
    "body": [{
            "type": "Container",
            "items": [{
                    "type": "TextBlock",
                    "text": "Digest card",
                    "size": "Large",
                    "weight": "Bolder"
                }]
        }],
    "msteams": {
        "width": "Full"
    },
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.4"
});
exports.fullCard = fullCard;
const updateCard = () => ({
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.4",
    "msteams": {
        "width": "Full"
    },
    "body": [
        {
            "type": "ImageSet",
            "imageSize": "large",
            "images": [
                {
                    "type": "Image",
                    "url": "https://givecampaignbot.azurewebsites.net/file?name=banner.jpg"
                },
                {
                    "type": "Image",
                    "url": "https://givecampaignbot.azurewebsites.net/file?name=dalai.png"
                },
                {
                    "type": "Image",
                    "url": "https://givecampaignbot.azurewebsites.net/file?name=financial.png"
                },
                {
                    "type": "Image",
                    "url": "https://givecampaignbot.azurewebsites.net/file?name=footer.png"
                },
                {
                    "type": "Image",
                    "url": "https://givecampaignbot.azurewebsites.net/file?name=fun.png"
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "Your registration is almost complete",
            "size": "Medium",
            "weight": "Bolder",
            "wrap": true
        },
        {
            "type": "TextBlock",
            "text": "What type of food do you prefer?",
            "wrap": true
        },
        {
            "type": "ImageSet",
            "imageSize": "medium",
            "images": [
                {
                    "type": "Image",
                    "url": exports.newsLetterJson.hasMenu.hasMenuSection[0].image
                },
                {
                    "type": "Image",
                    "url": exports.newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[0].image
                },
                {
                    "type": "Image",
                    "url": exports.newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[1].image
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": exports.newsLetterJson.hasMenu.hasMenuSection[0].name,
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": exports.newsLetterJson.hasMenu.hasMenuSection[0].description,
                        "size": "Medium",
                        "wrap": true
                    },
                    {
                        "type": "Input.ChoiceSet",
                        "id": "SteakTemp",
                        "style": "expanded",
                        "choices": [
                            {
                                "title": "Rare",
                                "value": "rare"
                            },
                            {
                                "title": "Medium-Rare",
                                "value": "medium-rare"
                            },
                            {
                                "title": "Well-done",
                                "value": "well-done"
                            }
                        ]
                    },
                    {
                        "type": "Input.Text",
                        "id": "SteakOther",
                        "isMultiline": true,
                        "placeholder": "Any other preparation requests?"
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK",
                        "data": {
                            "FoodChoice": "Steak"
                        }
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.ShowCard",
            "title": exports.newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[0].name,
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": exports.newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[0].description,
                        "size": "Medium",
                        "wrap": true
                    },
                    {
                        "type": "Input.ChoiceSet",
                        "id": "ChickenAllergy",
                        "style": "expanded",
                        "isMultiSelect": true,
                        "choices": [
                            {
                                "title": "I'm allergic to peanuts",
                                "value": "peanut"
                            }
                        ]
                    },
                    {
                        "type": "Input.Text",
                        "id": "ChickenOther",
                        "isMultiline": true,
                        "placeholder": "Any other preparation requests?"
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK",
                        "data": {
                            "FoodChoice": "Chicken"
                        }
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.ShowCard",
            "title": exports.newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[1].name,
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": exports.newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[1].description,
                        "size": "Medium",
                        "wrap": true
                    },
                    {
                        "type": "Input.Toggle",
                        "id": "Vegetarian",
                        "title": "Please prepare it vegan",
                        "valueOn": "vegan",
                        "valueOff": "notVegan",
                        "wrap": false
                    },
                    {
                        "type": "Input.Text",
                        "id": "VegOther",
                        "isMultiline": true,
                        "placeholder": "Any other preparation requests?"
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK",
                        "data": {
                            "FoodChoice": "Vegetarian"
                        }
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        }
    ]
});
exports.updateCard = updateCard;
const orgSummaryCard = () => ({
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.4",
    "msteams": {
        "width": "Full"
    },
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": 35,
                    "items": [
                        {
                            "type": "Image",
                            "size": "auto",
                            "url": "https://givecampaignbot.azurewebsites.net/file?name=orgsummary.png"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": 65,
                    "items": [
                        {
                            "type": "Container",
                            "height": "stretch",
                            "verticalContentAlignment": "center",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Your Org Participation By Percentage **56.06%**",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "Your Org Participation By INR **₹4,776,960/-**",
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": " ",
            "separator": true
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Participation By Percentage",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Image",
                        "size": "stretch",
                        "url": "https://givecampaignbot.azurewebsites.net/file?name=percentage.png"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.ShowCard",
            "title": "Participation By INR",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Image",
                        "size": "stretch",
                        "url": "https://givecampaignbot.azurewebsites.net/file?name=inr.png"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        }
    ]
});
exports.orgSummaryCard = orgSummaryCard;
const newsLetterCard = () => ({
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.4",
    "msteams": {
        "width": "Full"
    },
    "body": [
        {
            "type": "Container",
            "bleed": true,
            "size": "strech",
            "minHeight": "350px",
            "backgroundImage": "https://givecampaignbot.azurewebsites.net/file?name=highlight.png",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Top highlights of this week : 18th - 22nd Oct 2021",
                    "horizontalAlignment": "center",
                    "size": "Large",
                    "weight": "Bolder",
                    "wrap": true
                }
            ]
        },
        {
            "type": "ColumnSet",
            "separator": true,
            "columns": [
                {
                    "type": "Column",
                    "width": 35,
                    "items": [
                        {
                            "type": "Container",
                            "height": "stretch",
                            "verticalContentAlignment": "center",
                            "items": [
                                {
                                    "type": "Image",
                                    "size": "stretch",
                                    "url": "https://givecampaignbot.azurewebsites.net/file?name=dalai.png"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": 65,
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": 50,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "POWER OF GENEROSITY",
                                            "weight": "Bolder",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": 50,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "SPRITUAL EVENT",
                                            "horizontalAlignment": "right",
                                            "spacing": "None",
                                            "color": "Good",
                                            "wrap": true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "TextBlock",
                            "text": "We must each lead a way of life with self-awarness and compassion, to do as "
                                + "much as we can. Then, what ever happens we will have no regret. _Guest Speaker : Dalai Lama XIV_ ",
                            "isSubtle": true,
                            "wrap": true
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": 34,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "**Organizer:** Leadership In Action",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": 33,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "**Date of event:** 20th Oct 2021",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": 33,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "[**More Details**](https://aka.ms/Giving2021GuestSpeaker)",
                                            "wrap": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "ColumnSet",
            "separator": true,
            "columns": [
                {
                    "type": "Column",
                    "width": 35,
                    "items": [
                        {
                            "type": "Container",
                            "height": "stretch",
                            "verticalContentAlignment": "center",
                            "items": [
                                {
                                    "type": "Image",
                                    "size": "stretch",
                                    "url": "https://givecampaignbot.azurewebsites.net/file?name=fun.png"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": 65,
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": 50,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "5K/10K VIRTUAL RUN",
                                            "weight": "Bolder",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": 50,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "HEALTH EVENT",
                                            "horizontalAlignment": "right",
                                            "spacing": "None",
                                            "color": "Good",
                                            "wrap": true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "TextBlock",
                            "text": "To be eligible for prizes, the runs should be recorded using some tracking devices/apps like Garmin, Strava, Nike etc. "
                                + "and the link to the activity presented. We will also have prizes for the maximum mileage covered during the duration of the event (both men and women). ",
                            "isSubtle": true,
                            "wrap": true
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": 34,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "**Organizer:** Deepthi Vipparthy",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": 33,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "**Date of event:** 5th Nov 2021",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": 33,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "[**More Details**](https://microsoftindia.benevity.org/campaigns/844)",
                                            "wrap": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
exports.newsLetterCard = newsLetterCard;
const activityCard = () => ({
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.4",
    "msteams": {
        "width": "Full"
    },
    "body": [
        {
            "type": "ColumnSet",
            "bleed": true,
            "columns": [
                {
                    "type": "Column",
                    "width": "auto",
                    "items": [
                        {
                            "type": "Image",
                            "url": "https://givecampaignbot.azurewebsites.net/file?name=binu.png",
                            "style": "person",
                            "width": "35px"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "strech",
                    "items": [
                        {
                            "type": "Container",
                            "height": "stretch",
                            "verticalContentAlignment": "center",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "separator": "true",
                                    "text": "**Binu Raj** is organising",
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "Container",
            "style": "emphasis",
            "items": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": 50,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "FINANCIAL PLANNING TALK",
                                    "weight": "Bolder",
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": 50,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "EDUCATIONAL EVENT",
                                    "horizontalAlignment": "right",
                                    "spacing": "None",
                                    "color": "Good",
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": 35,
                            "items": [
                                {
                                    "type": "Image",
                                    "size": "stretch",
                                    "url": "https://givecampaignbot.azurewebsites.net/file?name=financial.png"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": 65,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "You will learn about stocks, bonds, mutual funds, real estate, gold, insurance, ESPP. "
                                        + "Binu will teach you to pick mutual funds that are likely to succeed in the future and "
                                        + "give you a starter list of mutual funds to get started.",
                                    "isSubtle": true,
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "[**More Details**](https://microsoftindia.benevity.org/campaigns/844)",
                                    "isSubtle": true,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "**Date of event:** Yet to be decided",
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": "**Minimun Criteria:** Donation of minimum **₹1000/-** in the listed NGOs",
                    "wrap": true
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.OpenUrl",
                            "title": "REGISTER NOW BY DONATING",
                            "url": "https://microsoftindia.benevity.org/campaigns/844"
                        }
                    ]
                }
            ]
        }
    ]
});
exports.activityCard = activityCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jYXJkSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE2QztBQUN0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sRUFBRSxvREFBb0Q7SUFDN0QsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxPQUFPO1NBQ2hCO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0csSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsR0FBRyxFQUFFLGlFQUFpRTtpQkFDeEU7YUFDSjtTQUNKO0tBQ0o7SUFDRCxJQUFJLEVBQUUsY0FBYztJQUNwQixPQUFPLEVBQUUsS0FBSztDQUNyQixDQUFDLENBQUM7QUF0QlUsUUFBQSxpQkFBaUIscUJBc0IzQjtBQUVJLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDaEMsT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsMkJBQTJCO1NBQ3BDO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDTDtZQUNJLElBQUksRUFBRSxlQUFlO1lBQ3JCLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFO2dCQUNGLEdBQUcsRUFBRSxPQUFPO2FBQ2Y7U0FDSjtLQUNKO0NBQ0osQ0FBQyxDQUFDO0FBbEJVLFFBQUEsYUFBYSxpQkFrQnZCO0FBRVUsUUFBQSxjQUFjLEdBQUc7SUFDMUIsR0FBRyxFQUFFLG1DQUFtQztJQUN4QyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEtBQUssRUFBRSxzREFBc0Q7SUFDN0QsV0FBVyxFQUFFLDZEQUE2RDtJQUMxRSxhQUFhLEVBQUU7UUFDWCxrQkFBa0I7S0FDckI7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsY0FBYztRQUNwQixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELGNBQWMsRUFBRTtZQUNaO2dCQUNJLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELEtBQUssRUFBRSw2REFBNkQ7Z0JBQ3BFLE1BQU0sRUFBRTtvQkFDSixrQkFBa0IsRUFBRSxVQUFVO29CQUM5QixvQkFBb0IsRUFBRSxVQUFVO2lCQUNuQztnQkFDRCxjQUFjLEVBQUU7b0JBQ1o7d0JBQ0ksSUFBSSxFQUFFLFNBQVM7d0JBQ2YsV0FBVyxFQUFFLDRCQUE0Qjt3QkFDekMsS0FBSyxFQUFFLCtEQUErRDt3QkFDdEUsTUFBTSxFQUFFOzRCQUNKLGtCQUFrQixFQUFFLFVBQVU7NEJBQzlCLG9CQUFvQixFQUFFLFVBQVU7eUJBQ25DO3dCQUNELFdBQVcsRUFBRTs0QkFDVCxJQUFJLEVBQUUsY0FBYzs0QkFDcEIsV0FBVyxFQUFFLHdDQUF3Qzs0QkFDckQsTUFBTSxFQUFFO2dDQUNKLE9BQU8sRUFBRSxNQUFNO2dDQUNmLGVBQWUsRUFBRSxLQUFLOzZCQUN6Qjs0QkFDRCxlQUFlLEVBQUUsa0NBQWtDO3lCQUN0RDtxQkFDSjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsTUFBTTt3QkFDWixXQUFXLEVBQUUsbUNBQW1DO3dCQUNoRCxLQUFLLEVBQUUsNERBQTREO3dCQUNuRSxNQUFNLEVBQUU7NEJBQ0osa0JBQWtCLEVBQUUsVUFBVTs0QkFDOUIsb0JBQW9CLEVBQUUsVUFBVTt5QkFDbkM7d0JBQ0QsV0FBVyxFQUFFOzRCQUNULElBQUksRUFBRSxVQUFVOzRCQUNoQixXQUFXLEVBQUUsbUVBQW1FOzRCQUNoRixNQUFNLEVBQUU7Z0NBQ0osT0FBTyxFQUFFLE1BQU07Z0NBQ2YsZUFBZSxFQUFFLEtBQUs7NkJBQ3pCO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtLQUNKO0NBQ0osQ0FBQztBQUVLLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdkIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsTUFBTSxFQUFFLENBQUM7WUFDTCxNQUFNLEVBQUUsV0FBVztZQUNuQixPQUFPLEVBQUUsQ0FBQztvQkFDTixNQUFNLEVBQUUsV0FBVztvQkFDbkIsTUFBTSxFQUFFLGFBQWE7b0JBQ3JCLE1BQU0sRUFBRSxPQUFPO29CQUNmLFFBQVEsRUFBRSxRQUFRO2lCQUNyQixDQUFDO1NBQ0wsQ0FBQztJQUVGLFNBQVMsRUFBRTtRQUNQLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0lBQ0QsU0FBUyxFQUFFLG9EQUFvRDtJQUMvRCxTQUFTLEVBQUUsS0FBSztDQUN2QixDQUFDLENBQUM7QUFqQlUsUUFBQSxRQUFRLFlBaUJsQjtBQUVJLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0IsU0FBUyxFQUFFLG9EQUFvRDtJQUMvRCxNQUFNLEVBQUUsY0FBYztJQUN0QixTQUFTLEVBQUUsS0FBSztJQUNoQixTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksTUFBTSxFQUFFLFVBQVU7WUFDbEIsV0FBVyxFQUFFLE9BQU87WUFDcEIsUUFBUSxFQUFFO2dCQUNOO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLEtBQUssRUFBRSxnRUFBZ0U7aUJBQzFFO2dCQUNEO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLEtBQUssRUFBRSwrREFBK0Q7aUJBQ3pFO2dCQUNEO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLEtBQUssRUFBRSxtRUFBbUU7aUJBQzdFO2dCQUNEO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLEtBQUssRUFBRSxnRUFBZ0U7aUJBQzFFO2dCQUNEO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLEtBQUssRUFBRSw2REFBNkQ7aUJBQ3ZFO2FBQ0o7U0FDSjtRQUNEO1lBQ0ksTUFBTSxFQUFFLFdBQVc7WUFDbkIsTUFBTSxFQUFFLHNDQUFzQztZQUM5QyxNQUFNLEVBQUUsUUFBUTtZQUNoQixRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsSUFBSTtTQUNmO1FBQ0Q7WUFDSSxNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUUsa0NBQWtDO1lBQzFDLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7UUFDRDtZQUNJLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFFBQVEsRUFBRTtnQkFDTjtvQkFDSSxNQUFNLEVBQUUsT0FBTztvQkFDZixLQUFLLEVBQUUsc0JBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQ3hEO2dCQUNEO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLEtBQUssRUFBRSxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQzFFO2dCQUNEO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLEtBQUssRUFBRSxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQzFFO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsU0FBUyxFQUFFO1FBQ1A7WUFDSSxNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE9BQU8sRUFBRSxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUN0RCxNQUFNLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxNQUFNLEVBQUUsV0FBVzt3QkFDbkIsTUFBTSxFQUFFLHNCQUFjLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO3dCQUM1RCxNQUFNLEVBQUUsUUFBUTt3QkFDaEIsTUFBTSxFQUFFLElBQUk7cUJBQ2Y7b0JBQ0Q7d0JBQ0ksTUFBTSxFQUFFLGlCQUFpQjt3QkFDekIsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxVQUFVO3dCQUNuQixTQUFTLEVBQUU7NEJBQ1A7Z0NBQ0ksT0FBTyxFQUFFLE1BQU07Z0NBQ2YsT0FBTyxFQUFFLE1BQU07NkJBQ2xCOzRCQUNEO2dDQUNJLE9BQU8sRUFBRSxhQUFhO2dDQUN0QixPQUFPLEVBQUUsYUFBYTs2QkFDekI7NEJBQ0Q7Z0NBQ0ksT0FBTyxFQUFFLFdBQVc7Z0NBQ3BCLE9BQU8sRUFBRSxXQUFXOzZCQUN2Qjt5QkFDSjtxQkFDSjtvQkFDRDt3QkFDSSxNQUFNLEVBQUUsWUFBWTt3QkFDcEIsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLGFBQWEsRUFBRSxJQUFJO3dCQUNuQixhQUFhLEVBQUUsaUNBQWlDO3FCQUNuRDtpQkFDSjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksTUFBTSxFQUFFLGVBQWU7d0JBQ3ZCLE9BQU8sRUFBRSxJQUFJO3dCQUNiLE1BQU0sRUFBRTs0QkFDSixZQUFZLEVBQUUsT0FBTzt5QkFDeEI7cUJBQ0o7aUJBQ0o7Z0JBQ0QsU0FBUyxFQUFFLG9EQUFvRDthQUNsRTtTQUNKO1FBQ0Q7WUFDSSxNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE9BQU8sRUFBRSxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDeEUsTUFBTSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxjQUFjO2dCQUN0QixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksTUFBTSxFQUFFLFdBQVc7d0JBQ25CLE1BQU0sRUFBRSxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQzlFLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixNQUFNLEVBQUUsSUFBSTtxQkFDZjtvQkFDRDt3QkFDSSxNQUFNLEVBQUUsaUJBQWlCO3dCQUN6QixJQUFJLEVBQUUsZ0JBQWdCO3dCQUN0QixPQUFPLEVBQUUsVUFBVTt3QkFDbkIsZUFBZSxFQUFFLElBQUk7d0JBQ3JCLFNBQVMsRUFBRTs0QkFDUDtnQ0FDSSxPQUFPLEVBQUUseUJBQXlCO2dDQUNsQyxPQUFPLEVBQUUsUUFBUTs2QkFDcEI7eUJBQ0o7cUJBQ0o7b0JBQ0Q7d0JBQ0ksTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLElBQUksRUFBRSxjQUFjO3dCQUNwQixhQUFhLEVBQUUsSUFBSTt3QkFDbkIsYUFBYSxFQUFFLGlDQUFpQztxQkFDbkQ7aUJBQ0o7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE1BQU0sRUFBRSxlQUFlO3dCQUN2QixPQUFPLEVBQUUsSUFBSTt3QkFDYixNQUFNLEVBQUU7NEJBQ0osWUFBWSxFQUFFLFNBQVM7eUJBQzFCO3FCQUNKO2lCQUNKO2dCQUNELFNBQVMsRUFBRSxvREFBb0Q7YUFDbEU7U0FDSjtRQUNEO1lBQ0ksTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixPQUFPLEVBQUUsc0JBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3hFLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsY0FBYztnQkFDdEIsTUFBTSxFQUFFO29CQUNKO3dCQUNJLE1BQU0sRUFBRSxXQUFXO3dCQUNuQixNQUFNLEVBQUUsc0JBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO3dCQUM5RSxNQUFNLEVBQUUsUUFBUTt3QkFDaEIsTUFBTSxFQUFFLElBQUk7cUJBQ2Y7b0JBQ0Q7d0JBQ0ksTUFBTSxFQUFFLGNBQWM7d0JBQ3RCLElBQUksRUFBRSxZQUFZO3dCQUNsQixPQUFPLEVBQUUseUJBQXlCO3dCQUNsQyxTQUFTLEVBQUUsT0FBTzt3QkFDbEIsVUFBVSxFQUFFLFVBQVU7d0JBQ3RCLE1BQU0sRUFBRSxLQUFLO3FCQUNoQjtvQkFDRDt3QkFDSSxNQUFNLEVBQUUsWUFBWTt3QkFDcEIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLGFBQWEsRUFBRSxJQUFJO3dCQUNuQixhQUFhLEVBQUUsaUNBQWlDO3FCQUNuRDtpQkFDSjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksTUFBTSxFQUFFLGVBQWU7d0JBQ3ZCLE9BQU8sRUFBRSxJQUFJO3dCQUNiLE1BQU0sRUFBRTs0QkFDSixZQUFZLEVBQUUsWUFBWTt5QkFDN0I7cUJBQ0o7aUJBQ0o7Z0JBQ0QsU0FBUyxFQUFFLG9EQUFvRDthQUNsRTtTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUF2TVUsUUFBQSxVQUFVLGNBdU1wQjtBQUVJLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakMsU0FBUyxFQUFFLG9EQUFvRDtJQUMvRCxNQUFNLEVBQUUsY0FBYztJQUN0QixTQUFTLEVBQUUsS0FBSztJQUNoQixTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksTUFBTSxFQUFFLFdBQVc7WUFDbkIsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE1BQU0sRUFBRSxRQUFRO29CQUNoQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxPQUFPLEVBQUU7d0JBQ0w7NEJBQ0ksTUFBTSxFQUFFLE9BQU87NEJBQ2YsTUFBTSxFQUFFLE1BQU07NEJBQ2QsS0FBSyxFQUFFLG9FQUFvRTt5QkFDOUU7cUJBQ0o7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLE9BQU8sRUFBRSxFQUFFO29CQUNYLE9BQU8sRUFBRTt3QkFDTDs0QkFDSSxNQUFNLEVBQUUsV0FBVzs0QkFDbkIsUUFBUSxFQUFFLFNBQVM7NEJBQ25CLDBCQUEwQixFQUFFLFFBQVE7NEJBQ3BDLE9BQU8sRUFBRTtnQ0FDTDtvQ0FDSSxNQUFNLEVBQUUsV0FBVztvQ0FDbkIsTUFBTSxFQUFFLGlEQUFpRDtvQ0FDekQsTUFBTSxFQUFFLElBQUk7aUNBQ2Y7Z0NBQ0Q7b0NBQ0ksTUFBTSxFQUFFLFdBQVc7b0NBQ25CLE1BQU0sRUFBRSxnREFBZ0Q7b0NBQ3hELE1BQU0sRUFBRSxJQUFJO2lDQUNmOzZCQUNKO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNEO1lBQ0ksTUFBTSxFQUFFLFdBQVc7WUFDbkIsTUFBTSxFQUFFLEdBQUc7WUFDWCxXQUFXLEVBQUUsSUFBSTtTQUNwQjtLQUNKO0lBQ0QsU0FBUyxFQUFFO1FBQ1A7WUFDSSxNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsTUFBTSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxjQUFjO2dCQUN0QixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksTUFBTSxFQUFFLE9BQU87d0JBQ2YsTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLEtBQUssRUFBRSxvRUFBb0U7cUJBQzlFO2lCQUNKO2dCQUNELFNBQVMsRUFBRSxvREFBb0Q7YUFDbEU7U0FDSjtRQUNEO1lBQ0ksTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsY0FBYztnQkFDdEIsTUFBTSxFQUFFO29CQUNKO3dCQUNJLE1BQU0sRUFBRSxPQUFPO3dCQUNmLE1BQU0sRUFBRSxTQUFTO3dCQUNqQixLQUFLLEVBQUUsNkRBQTZEO3FCQUN2RTtpQkFDSjtnQkFDRCxTQUFTLEVBQUUsb0RBQW9EO2FBQ2xFO1NBQ0o7S0FDSjtDQUNKLENBQUMsQ0FBQztBQXJGVSxRQUFBLGNBQWMsa0JBcUZ4QjtBQUVJLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakMsU0FBUyxFQUFFLG9EQUFvRDtJQUMvRCxNQUFNLEVBQUUsY0FBYztJQUN0QixTQUFTLEVBQUUsS0FBSztJQUNoQixTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksTUFBTSxFQUFFLFdBQVc7WUFDbkIsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUMsUUFBUTtZQUNmLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLGlCQUFpQixFQUFFLG1FQUFtRTtZQUN0RixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksTUFBTSxFQUFFLFdBQVc7b0JBQ25CLE1BQU0sRUFBRSxvREFBb0Q7b0JBQzVELHFCQUFxQixFQUFFLFFBQVE7b0JBQy9CLE1BQU0sRUFBRSxPQUFPO29CQUNmLFFBQVEsRUFBRSxRQUFRO29CQUNsQixNQUFNLEVBQUUsSUFBSTtpQkFDZjthQUNKO1NBQ0o7UUFDRDtZQUNJLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsT0FBTyxFQUFFO3dCQUNMOzRCQUNJLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixRQUFRLEVBQUUsU0FBUzs0QkFDbkIsMEJBQTBCLEVBQUUsUUFBUTs0QkFDcEMsT0FBTyxFQUFFO2dDQUNMO29DQUNJLE1BQU0sRUFBRSxPQUFPO29DQUNmLE1BQU0sRUFBRSxTQUFTO29DQUNqQixLQUFLLEVBQUUsK0RBQStEO2lDQUN6RTs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsT0FBTyxFQUFFO3dCQUNMOzRCQUNJLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixTQUFTLEVBQUU7Z0NBQ1A7b0NBQ0ksTUFBTSxFQUFFLFFBQVE7b0NBQ2hCLE9BQU8sRUFBRSxFQUFFO29DQUNYLE9BQU8sRUFBRTt3Q0FDTDs0Q0FDSSxNQUFNLEVBQUUsV0FBVzs0Q0FDbkIsTUFBTSxFQUFFLHFCQUFxQjs0Q0FDN0IsUUFBUSxFQUFFLFFBQVE7NENBQ2xCLE1BQU0sRUFBRSxJQUFJO3lDQUNmO3FDQUNKO2lDQUNKO2dDQUNEO29DQUNJLE1BQU0sRUFBRSxRQUFRO29DQUNoQixPQUFPLEVBQUUsRUFBRTtvQ0FDWCxPQUFPLEVBQUU7d0NBQ0w7NENBQ0ksTUFBTSxFQUFFLFdBQVc7NENBQ25CLE1BQU0sRUFBRSxnQkFBZ0I7NENBQ3hCLHFCQUFxQixFQUFFLE9BQU87NENBQzlCLFNBQVMsRUFBRSxNQUFNOzRDQUNqQixPQUFPLEVBQUUsTUFBTTs0Q0FDZixNQUFNLEVBQUUsSUFBSTt5Q0FDZjtxQ0FDSjtpQ0FDSjs2QkFDSjt5QkFDSjt3QkFDRDs0QkFDSSxNQUFNLEVBQUUsV0FBVzs0QkFDbkIsTUFBTSxFQUFFLDhFQUE4RTtrQ0FDaEYsbUdBQW1HOzRCQUN6RyxVQUFVLEVBQUUsSUFBSTs0QkFDaEIsTUFBTSxFQUFFLElBQUk7eUJBQ2Y7d0JBQ0Q7NEJBQ0ksTUFBTSxFQUFFLFdBQVc7NEJBQ25CLFNBQVMsRUFBRTtnQ0FDUDtvQ0FDSSxNQUFNLEVBQUUsUUFBUTtvQ0FDaEIsT0FBTyxFQUFFLEVBQUU7b0NBQ1gsT0FBTyxFQUFFO3dDQUNMOzRDQUNJLE1BQU0sRUFBRSxXQUFXOzRDQUNuQixNQUFNLEVBQUUscUNBQXFDOzRDQUM3QyxNQUFNLEVBQUUsSUFBSTt5Q0FDZjtxQ0FDSjtpQ0FDSjtnQ0FDRDtvQ0FDSSxNQUFNLEVBQUUsUUFBUTtvQ0FDaEIsT0FBTyxFQUFFLEVBQUU7b0NBQ1gsT0FBTyxFQUFFO3dDQUNMOzRDQUNJLE1BQU0sRUFBRSxXQUFXOzRDQUNuQixNQUFNLEVBQUUsa0NBQWtDOzRDQUMxQyxNQUFNLEVBQUUsSUFBSTt5Q0FDZjtxQ0FDSjtpQ0FDSjtnQ0FDRDtvQ0FDSSxNQUFNLEVBQUUsUUFBUTtvQ0FDaEIsT0FBTyxFQUFFLEVBQUU7b0NBQ1gsT0FBTyxFQUFFO3dDQUNMOzRDQUNJLE1BQU0sRUFBRSxXQUFXOzRDQUNuQixNQUFNLEVBQUUsMkRBQTJEOzRDQUNuRSxNQUFNLEVBQUUsSUFBSTt5Q0FDZjtxQ0FDSjtpQ0FDSjs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRDtZQUNJLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsT0FBTyxFQUFFO3dCQUNMOzRCQUNJLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixRQUFRLEVBQUUsU0FBUzs0QkFDbkIsMEJBQTBCLEVBQUUsUUFBUTs0QkFDcEMsT0FBTyxFQUFFO2dDQUNMO29DQUNJLE1BQU0sRUFBRSxPQUFPO29DQUNmLE1BQU0sRUFBRSxTQUFTO29DQUNqQixLQUFLLEVBQUUsNkRBQTZEO2lDQUN2RTs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsT0FBTyxFQUFFO3dCQUNMOzRCQUNJLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixTQUFTLEVBQUU7Z0NBQ1A7b0NBQ0ksTUFBTSxFQUFFLFFBQVE7b0NBQ2hCLE9BQU8sRUFBRSxFQUFFO29DQUNYLE9BQU8sRUFBRTt3Q0FDTDs0Q0FDSSxNQUFNLEVBQUUsV0FBVzs0Q0FDbkIsTUFBTSxFQUFFLG9CQUFvQjs0Q0FDNUIsUUFBUSxFQUFFLFFBQVE7NENBQ2xCLE1BQU0sRUFBRSxJQUFJO3lDQUNmO3FDQUNKO2lDQUNKO2dDQUNEO29DQUNJLE1BQU0sRUFBRSxRQUFRO29DQUNoQixPQUFPLEVBQUUsRUFBRTtvQ0FDWCxPQUFPLEVBQUU7d0NBQ0w7NENBQ0ksTUFBTSxFQUFFLFdBQVc7NENBQ25CLE1BQU0sRUFBRSxjQUFjOzRDQUN0QixxQkFBcUIsRUFBRSxPQUFPOzRDQUM5QixTQUFTLEVBQUUsTUFBTTs0Q0FDakIsT0FBTyxFQUFFLE1BQU07NENBQ2YsTUFBTSxFQUFFLElBQUk7eUNBQ2Y7cUNBQ0o7aUNBQ0o7NkJBQ0o7eUJBQ0o7d0JBQ0Q7NEJBQ0ksTUFBTSxFQUFFLFdBQVc7NEJBQ25CLE1BQU0sRUFBRSx5SEFBeUg7a0NBQzNILDBKQUEwSjs0QkFDaEssVUFBVSxFQUFFLElBQUk7NEJBQ2hCLE1BQU0sRUFBRSxJQUFJO3lCQUNmO3dCQUNEOzRCQUNJLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixTQUFTLEVBQUU7Z0NBQ1A7b0NBQ0ksTUFBTSxFQUFFLFFBQVE7b0NBQ2hCLE9BQU8sRUFBRSxFQUFFO29DQUNYLE9BQU8sRUFBRTt3Q0FDTDs0Q0FDSSxNQUFNLEVBQUUsV0FBVzs0Q0FDbkIsTUFBTSxFQUFFLGtDQUFrQzs0Q0FDMUMsTUFBTSxFQUFFLElBQUk7eUNBQ2Y7cUNBQ0o7aUNBQ0o7Z0NBQ0Q7b0NBQ0ksTUFBTSxFQUFFLFFBQVE7b0NBQ2hCLE9BQU8sRUFBRSxFQUFFO29DQUNYLE9BQU8sRUFBRTt3Q0FDTDs0Q0FDSSxNQUFNLEVBQUUsV0FBVzs0Q0FDbkIsTUFBTSxFQUFFLGlDQUFpQzs0Q0FDekMsTUFBTSxFQUFFLElBQUk7eUNBQ2Y7cUNBQ0o7aUNBQ0o7Z0NBQ0Q7b0NBQ0ksTUFBTSxFQUFFLFFBQVE7b0NBQ2hCLE9BQU8sRUFBRSxFQUFFO29DQUNYLE9BQU8sRUFBRTt3Q0FDTDs0Q0FDSSxNQUFNLEVBQUUsV0FBVzs0Q0FDbkIsTUFBTSxFQUFFLHVFQUF1RTs0Q0FDL0UsTUFBTSxFQUFFLElBQUk7eUNBQ2Y7cUNBQ0o7aUNBQ0o7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUE5T1UsUUFBQSxjQUFjLGtCQThPeEI7QUFFSSxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLFNBQVMsRUFBRSxvREFBb0Q7SUFDL0QsTUFBTSxFQUFFLGNBQWM7SUFDdEIsU0FBUyxFQUFFLEtBQUs7SUFDaEIsU0FBUyxFQUFFO1FBQ1AsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFDRCxNQUFNLEVBQUU7UUFDSjtZQUNJLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE1BQU0sRUFBRSxRQUFRO29CQUNoQixPQUFPLEVBQUUsTUFBTTtvQkFDZixPQUFPLEVBQUU7d0JBQ0w7NEJBQ0ksTUFBTSxFQUFFLE9BQU87NEJBQ2YsS0FBSyxFQUFFLDhEQUE4RDs0QkFDckUsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLE9BQU8sRUFBRSxNQUFNO3lCQUNsQjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsT0FBTyxFQUFFLFFBQVE7b0JBQ2pCLE9BQU8sRUFBRTt3QkFDTDs0QkFDSSxNQUFNLEVBQUUsV0FBVzs0QkFDbkIsUUFBUSxFQUFFLFNBQVM7NEJBQ25CLDBCQUEwQixFQUFFLFFBQVE7NEJBQ3BDLE9BQU8sRUFBRTtnQ0FDTDtvQ0FDSSxNQUFNLEVBQUUsV0FBVztvQ0FDbkIsV0FBVyxFQUFFLE1BQU07b0NBQ25CLE1BQU0sRUFBRSw0QkFBNEI7b0NBQ3BDLE1BQU0sRUFBRSxJQUFJO2lDQUNmOzZCQUNKO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNEO1lBQ0ksTUFBTSxFQUFFLFdBQVc7WUFDbkIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsT0FBTyxFQUFFO2dCQUNMO29CQUNJLE1BQU0sRUFBRSxXQUFXO29CQUNuQixTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksTUFBTSxFQUFFLFFBQVE7NEJBQ2hCLE9BQU8sRUFBRSxFQUFFOzRCQUNYLE9BQU8sRUFBRTtnQ0FDTDtvQ0FDSSxNQUFNLEVBQUUsV0FBVztvQ0FDbkIsTUFBTSxFQUFFLHlCQUF5QjtvQ0FDakMsUUFBUSxFQUFFLFFBQVE7b0NBQ2xCLE1BQU0sRUFBRSxJQUFJO2lDQUNmOzZCQUNKO3lCQUNKO3dCQUNEOzRCQUNJLE1BQU0sRUFBRSxRQUFROzRCQUNoQixPQUFPLEVBQUUsRUFBRTs0QkFDWCxPQUFPLEVBQUU7Z0NBQ0w7b0NBQ0ksTUFBTSxFQUFFLFdBQVc7b0NBQ25CLE1BQU0sRUFBRSxtQkFBbUI7b0NBQzNCLHFCQUFxQixFQUFFLE9BQU87b0NBQzlCLFNBQVMsRUFBRSxNQUFNO29DQUNqQixPQUFPLEVBQUUsTUFBTTtvQ0FDZixNQUFNLEVBQUUsSUFBSTtpQ0FDZjs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxNQUFNLEVBQUUsV0FBVztvQkFDbkIsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE1BQU0sRUFBRSxRQUFROzRCQUNoQixPQUFPLEVBQUUsRUFBRTs0QkFDWCxPQUFPLEVBQUU7Z0NBQ0w7b0NBQ0ksTUFBTSxFQUFFLE9BQU87b0NBQ2YsTUFBTSxFQUFFLFNBQVM7b0NBQ2pCLEtBQUssRUFBRSxtRUFBbUU7aUNBQzdFOzZCQUNKO3lCQUNKO3dCQUNEOzRCQUNJLE1BQU0sRUFBRSxRQUFROzRCQUNoQixPQUFPLEVBQUUsRUFBRTs0QkFDWCxPQUFPLEVBQUU7Z0NBQ0w7b0NBQ0ksTUFBTSxFQUFFLFdBQVc7b0NBQ25CLE1BQU0sRUFBRSx3RkFBd0Y7MENBQzFGLHdGQUF3RjswQ0FDeEYseURBQXlEO29DQUMvRCxVQUFVLEVBQUUsSUFBSTtvQ0FDaEIsTUFBTSxFQUFFLElBQUk7aUNBQ2Y7Z0NBQ0Q7b0NBQ0ksTUFBTSxFQUFFLFdBQVc7b0NBQ25CLE1BQU0sRUFBRSx1RUFBdUU7b0NBQy9FLFVBQVUsRUFBRSxJQUFJO29DQUNoQixNQUFNLEVBQUUsSUFBSTtpQ0FDZjs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxNQUFNLEVBQUUsV0FBVztvQkFDbkIsTUFBTSxFQUFFLHNDQUFzQztvQkFDOUMsTUFBTSxFQUFFLElBQUk7aUJBQ2Y7Z0JBQ0Q7b0JBQ0ksTUFBTSxFQUFFLFdBQVc7b0JBQ25CLE1BQU0sRUFBRSwwRUFBMEU7b0JBQ2xGLE1BQU0sRUFBRSxJQUFJO2lCQUNmO2dCQUNEO29CQUNJLE1BQU0sRUFBRSxXQUFXO29CQUNuQixTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksTUFBTSxFQUFFLGdCQUFnQjs0QkFDeEIsT0FBTyxFQUFFLDBCQUEwQjs0QkFDbkMsS0FBSyxFQUFFLG1EQUFtRDt5QkFDN0Q7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUEzSVUsUUFBQSxZQUFZLGdCQTJJdEIifQ==