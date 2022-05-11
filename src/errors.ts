export declare class InvalidStateError extends IbbError {}

export interface IbbErrorOptions {
  name?: string;
  cause?: Error;
}
export declare class IbbError extends Error {
  private options;
  readonly cause: Error | undefined;
  constructor(message: string, options?: IbbErrorOptions);
  getLongMessage(): string;
  getLongStack(): string;
  private isIbbError;
}