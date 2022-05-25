// import { Observable } from "rxjs";
//
// const sequence$ = new Observable((subscriber) => {
//   let count = 1;
//   const intervalId = setInterval(() => {
//     subscriber.next(count++);
//     if (count % 5 === 0) {
//       clearInterval(intervalId);
//       subscriber.complete();
//       return
//     }
//   }, 1000);
//   return () => {
//     console.log('unsubscribe');
//     clearInterval(intervalId);
//   }
// });
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

import { fromEvent, interval } from 'rxjs';

const sequence$ = fromEvent<MouseEvent>(document, 'click')

const sub1 = sequence$.subscribe((v) => {
  console.log('Sub 1', v.clientX);
});

// unsubscribe - не завершает поток, только отписка. Завршает complete
// Холодный поток - получаешь все значения с самого начала
// Горячий поток - получаешь значения с момента подписки
setTimeout(() => {
  sequence$.subscribe((v) => {
    console.log('Sub 2', v.clientX);
  });
}, 5000);

