export const PDF_FROM_URL = () => {
    return `https://api.html2pdf.app/v1/generate/`;
}

export const PDF_FROM_URL_TEST = (url: string) => {
    return `https://api.html2pdf.app/v1/test?url=${url}`;
}