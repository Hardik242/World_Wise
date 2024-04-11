export function asyncTimeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
