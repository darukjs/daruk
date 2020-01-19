import { injectable } from 'inversify';
import { join } from 'path';
import recursive = require('recursive-readdir');
import { isJsTsFile, JsTsReg } from '../utils';

@injectable()
export default class Loader {
  public async loadFile(path: string) {
    return recursive(join(__dirname, path)).then((files) => {
      return files
        .filter((file) => isJsTsFile(file))
        .map((file) => file.replace(JsTsReg, ''))
        .forEach((path: string) => {
          require(path);
        });
    });
  }
}
