/**
 * Daruk 配置
 */
import { Daruk } from 'daruk-rpc';
import path = require('path');

export default function(daruk: Daruk) {
  const { rootPath } = daruk.options;

  const darukConfig: any = {};

  darukConfig.middlewareOrder = [

  ];
  darukConfig.middleware = {

  };
  darukConfig.util = {};
  darukConfig.timer = {};

  return darukConfig;
}
