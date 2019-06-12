/**
 * @fileOverview Daruk event bus
 * 因为 daurk 实例化是同步进行的，
 * 因此需要借助 event bus 在 daruk 实例化之前监听生命周期事件
 */

import EventEmitter = require('events');

class Events extends EventEmitter {}

const emitter = new Events();

// 增加limit 上限,暂定 100
emitter.setMaxListeners(100);

export default emitter;
