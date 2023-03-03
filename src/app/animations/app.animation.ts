import {animate, state, style, transition, trigger} from "@angular/animations";

export function flyIn() {
  return trigger('flyIn', [
    state('*', style({
      transform: 'translateX(0)',
      opacity: 1
    })),
    transition(':enter', [
      style({
        transform: 'translateX(-100%)',
        opacity: 0
      }),
      animate('500ms ease-in')
    ])
  ]);
}

export function expand() {
  return trigger('expand', [
    state('*', style({
      transform: 'translateX(0)',
      opacity: 1
    })),
    transition(':enter', [
      style({
        transform: 'translateY(-50%)',
        opacity: 0
      }),
      animate('500ms ease-in', style({
        transform: 'translateX(0)',
        opacity: 1
      }))
    ])
  ]);
}
