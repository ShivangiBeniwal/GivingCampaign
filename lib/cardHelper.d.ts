export declare const getCardForMessage: (message: any) => {
    $schema: string;
    body: ({
        type: string;
        size: string;
        weight: string;
        text: any;
        actions?: undefined;
    } | {
        type: string;
        actions: {
            type: string;
            title: string;
            url: string;
        }[];
        size?: undefined;
        weight?: undefined;
        text?: undefined;
    })[];
    type: string;
    version: string;
};
