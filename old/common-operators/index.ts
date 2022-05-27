import {fromEvent, interval} from "rxjs";
import {debounceTime, filter, map, pluck, skip, take, tap} from "rxjs/operators";

const sequence1$ = interval(1000);

sequence1$
  .pipe(
    map((x) => ({ v: x })),
    pluck('v'),
    filter((x:number) => x % 2 === 0),
    map((x:number) => x ** 2),
    skip(2),
    take(1)
  )
  .subscribe(
    (v) => { console.log('Result', v) },
    (err: any) => { console.log(err) },
    () => { console.log('COMPLETE!')}
  );

const el = document.querySelector('input') as HTMLInputElement;

fromEvent(el, 'input').pipe(
  debounceTime(300),
  pluck('target', 'value')
).subscribe(
  (v) => console.log(v)
);