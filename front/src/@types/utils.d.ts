declare type NonNullProperty<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? NonNullable<T[P]> : T[P];
};

type AnyObject = { [key: string]: any };
