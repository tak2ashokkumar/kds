export class RapidAPIHeaders {
    //https://rapidapi.com/
    'x-rapidapi-host': string;
    'x-rapidapi-key': string = `17657b4f76msh44aa853e1c8deb6p165dacjsncb5ba85cccae`;
    constructor() { }
}
export const GET_NEWSAPIORG_API_KEY = () => {
    //https://newsapi.org/
    return `dff6f634d4714a13a831cfc864ecbf84`;
};
export const RAPID_API_KEY = () => `17657b4f76msh44aa853e1c8deb6p165dacjsncb5ba85cccae`;

export const GET_LOVE_PERCENTAGE = (fname: string, sname: string) => `https://love-calculator.p.rapidapi.com/getPercentage?fname=${fname}&sname=${sname}`;

export const GET_COVID_DATA = (country?: string) => {
    if (country) {
        return `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
    } else {
        return `https://covid-193.p.rapidapi.com/statistics`;
    }
}

export const GET_QUOTE_OF_THE_DAY = () => `https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info`;
