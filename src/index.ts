import { Observable } from "rxjs";

const socket: WebSocket = new WebSocket('wss://echo.websocket.org')
const sequence$ = new Observable((subscriber) => {
  socket.addEventListener('message', (e) => subscriber.next(e));

  // return () => {
  //   console.log('unsubscribe');
  //   clearInterval(intervalId);
  // }
});
//
// const subscription = sequence$.subscribe(
//   (v) => console.log(v) ,
//   (err) => console.log(err) ,
//   () => console.log('complete')
// );
//
// setInterval(() => {
//   subscription.unsubscribe()
// }, 3000);

// import { fromEvent, interval } from 'rxjs';
//
// const sequence$ = fromEvent<MouseEvent>(document, 'click')
//
const sub1 = sequence$.subscribe((v: any) => {
  console.log('Sub 1', v.data);
});

socket.addEventListener('open', () => {
  let count = 1;
  const intervalId = setInterval(() => {
    socket.send((count++).toString())
  }, 1000);
})

// unsubscribe - не завершает поток, только отписка. Завршает complete
// Холодный поток - получаешь все значения с самого начала
// Горячий поток - получаешь значения с момента подписки
setTimeout(() => {
  sequence$.subscribe((v: any) => {
    console.log('Sub 2', v.data);
  });
}, 5000);