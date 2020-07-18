export const GET_LOVE_PERCENTAGE = (fname: string, sname: string) => {
    return `https://love-calculator.p.rapidapi.com/getPercentage?fname=${fname}&sname=${sname}`;
}

export const GET_COVID_DATA = (country?: string) => {
    if (country) {
        return `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
    } else {
        return `https://covid-193.p.rapidapi.com/statistics`;
    }
}

export const GET_QUOTE_OF_THE_DAY = () => {
    return `https://quotes15.p.rapidapi.com/quotes/random/?language_code=en`;
}
