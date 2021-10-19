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

export const newsLetterJson = {
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

export const fullCard = () => ({
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

export const updateCard = () => ({
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
                    "url": newsLetterJson.hasMenu.hasMenuSection[0].image
                },
                {
                    "type": "Image",
                    "url": newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[0].image
                },
                {
                    "type": "Image",
                    "url": newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[1].image
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": newsLetterJson.hasMenu.hasMenuSection[0].name,
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": newsLetterJson.hasMenu.hasMenuSection[0].description,
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
            "title": newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[0].name,
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[0].description,
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
            "title": newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[1].name,
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": newsLetterJson.hasMenu.hasMenuSection[0].hasMenuSection[1].description,
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

export const orgSummaryCard = () => ({
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

export const newsLetterCard = () => ({
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
            "size":"strech",
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

export const activityCard = () => ({
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