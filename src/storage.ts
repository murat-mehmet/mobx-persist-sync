export function clear() {
    window.localStorage.clear();
}

export function getItem(key: string): string {
    return window.localStorage.getItem(key);
}

export function removeItem(key: string) {
    window.localStorage.removeItem(key);
}


export function setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
}

export interface IStorage {
    getItem(key: string): string
    removeItem(key: string): void
    setItem(key: string, value: string): void
    [key: string]: any
}