//Операторы создания

import { defer, from, iif, of } from "rxjs";
import { ajax } from "rxjs/ajax";

//Создает из перечисления
// const sequence$ = of(1,2,3,4,5);

//Создает из массива и promise
// const sequence$ = from([1,2,3,4,5]);


const random = Math.round(Math.random() * 10);

//Создает по условию как тернарник
const sequence$ = iif(() => {
  return random > 5;
}, of('Value > 5'), of('Value < 5'));

//Позволяет прописывать более кол-во условий
// const sequence$ = defer(() => {
//   return random > 5 ? random >= 8
//     ? of('Value > 8') : of('Value > 5 < 8')
//     : of('Value < 5')
// });

// const sequence$ = ajax('https://app.fakejson.com/q');

sequence$.subscribe((v) => {
  console.log(v)
});