
export function dateAndTimeFormatter(timestamp : number):string{
    const dateTime = new Date(timestamp * 1000).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false
    });
    return dateTime;
}