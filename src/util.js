
// https://stackoverflow.com/a/326076/136408
export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}