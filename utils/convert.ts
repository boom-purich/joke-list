export const convertStringToHTML = (str:string):string => {
    return str.replace(/&quot;/g, '"');
}