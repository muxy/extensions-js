import User from "./user";
declare global {
    interface Window {
        ObtainHelixToken: () => void;
        ClearHelixToken: () => void;
    }
}
export declare function allowTestingHelixToken(id: string, user: User): {
    openHelixUrl: () => Promise<string>;
};
