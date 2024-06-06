export declare function clear(): void;
export declare function getItem(key: string): string;
export declare function removeItem(key: string): void;
export declare function setItem(key: string, value: string): void;
export interface IStorage {
    getItem(key: string): string;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
    [key: string]: any;
}
