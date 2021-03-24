import {animate, query, style, transition, trigger} from "@angular/animations";

/**
 * Animates page by changing opacity from 0 to 1 and pulling it up from the bottom
 * of the screen
 */
export const fader =
  trigger('routeAnimations',[
    transition('*<=>*',[
      query(':enter, :leave',[
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ]),
      query(':enter', [
        animate('600ms ease',
          style({opacity:1, transform: 'scale(1) translateY(0)'})
        )
      ])
    ])
  ])
