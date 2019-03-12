/**
 * @fileOverview Daruk event bus
 * 因为 daurk 实例化是同步进行的，
 * 因此需要借助 event bus 在 daruk 实例化之前监听生命周期事件
 */

import EventEmitter = require('events');

class Events extends EventEmitter {}

export default new Events();
