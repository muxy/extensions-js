declare module 'base-64' {
  export interface base64Type {
    decode(string): string;
  }

  const base64Value : base64Type;
  export default base64Value;
}

declare module 'gumshoe' {
  export interface gumshoe {
    (opts: object): void;

    transport(v: object): void;
    reqwest(opts: object, cb: () => void): void;
    send(category: string, data: object): void;
  }

  export interface gumshoeFactoryType {
    () : gumshoe
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}
