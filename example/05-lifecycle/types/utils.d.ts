import 'daruk';

declare module 'daruk' {
  interface Util {
    randomWord: (randomFlag: boolean, min: number, max: number) => string;
  }
}
