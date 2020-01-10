declare function loggerDecorator(fileInfo?: string): (proto: any, propertyKey: string) => void;
export declare const logger: typeof loggerDecorator;
export {};
