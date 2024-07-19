export const linkRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/?[\w.-]*)*\/?(\?([\w%.-]+=[\w%.-]+&?)*)?$/i;
export const validateLink = (link) => linkRegex.test(link);
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const getFilesSize = (files) => {
    return Array.from(files).reduce((acc, pic) => acc + pic.size, 0) / 1000000;
};
export const getDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}