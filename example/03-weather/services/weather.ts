import request = require('request-promise');
// @ts-ignore
import { provide } from '../../../src';
import utils from '../utils';

@provide('weather')
export default class Weather {
  public async getLatLong(ip: string) {
    return await request(`https://ipapi.co/${ip}/latlong/`);
  }
  public async getIP() {
    let json = await request('http://pv.sohu.com/cityjson', { encoding: null });
    return utils.fixIP(json);
  }
  public async getWeather() {
    const API_KEY = 'f4019f67f66c97d24751ac71c72f936f';
    const ip = await this.getIP();
    let latlong = await this.getLatLong(ip);
    latlong = latlong.replace(/"/g, '');
    latlong = latlong.split(',');
    let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${latlong[0]}&lon=${latlong[1]}&appid=${API_KEY}`;
    return await request(weatherAPI);
  }
}
