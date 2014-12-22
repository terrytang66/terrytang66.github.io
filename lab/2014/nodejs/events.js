// 事件发射器 events.EventEmitter
var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('someEvent', function(arg1, arg2) {
	console.log('listen1', arg1, arg2);
})

emitter.on('someEvent', function(arg1, arg2) {
	console.log('listen2', arg1, arg2);
})
emitter.emit('someEvent', 'hello', 111);

// EventEmitter.on(event, listener) 为指定事件注册一个监听器， 接受一个字
// 符串 event 和一个回调函数 listener。 
// EventEmitter.emit(event, [arg1], [arg2], [...]) 发射 event 事件， 传
// 递若干可选参数到事件监听器的参数表。 
// EventEmitter.once(event, listener) 为指定事件注册一个单次监听器， 即
// 监听器最多只会触发一次， 触发后立刻解除该监听器。 EventEmitter.removeListener(event, listener) 移除指定事件的某个监听
// 器， listener 必须是该事件已经注册过的监听器。
// EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器，
// 如果指定 event，则移除指定事件的所有监听器。