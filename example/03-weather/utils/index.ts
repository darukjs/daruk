import iconv = require('iconv-lite');

function getToday() {
  let today = new Date();
  return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}

function fixIP(buffer: Buffer) {
  const errMsg = 'error';
  try {
    let str = iconv.decode(buffer, 'gbk');
    str = str.replace(/^var returnCitySN = /g, '').replace(/;$/g, '');
    let res = JSON.parse(str);
    return res.cip;
  } catch (e) {
    return errMsg;
  }
}

export default {
  fixIP,
  getToday
};
