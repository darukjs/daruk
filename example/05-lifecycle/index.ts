import { Context, Daruk, DarukEvents } from 'daruk';

DarukEvents.on('utilLoaded', (daruk: Daruk) => {
  daruk.registerUtil({
    name: 'randomWord',
    export: (randomFlag: boolean, min: number, max: number) => {
      let str = '';
      let range = min;
      let arr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ];
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    }
  });
});

DarukEvents.on('access', (ctx: Context) => {
  console.log(ctx.request.id);
});

DarukEvents.on('exit', (err: Error, daruk: Daruk) => {
  // maybe you can send a exit error or email
  daruk.logger.error('exit');
});

const myApp = new Daruk('myapp', { rootPath: __dirname, debug: process.env.NODE_ENV === 'dev' });
const port = 3000;

myApp.run(port);
