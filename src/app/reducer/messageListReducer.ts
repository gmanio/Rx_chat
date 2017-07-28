/**
 * Created by jimanPark on 2017. 7. 31..
 */
// counter.ts
import { Action } from '@ngrx/store';
import Message from '../type/message.model';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DEL_MESSAGE = 'DEL_MESSAGE';
export const RESET = 'RESET';

export function messageListReducer(state = [], action: Action) {
  switch ( action.type ) {
    case ADD_MESSAGE:
      return state.concat(state);
    case DEL_MESSAGE:
      // return state.push(message);
    case RESET:
      return state;
    default:
      return state;
  }
}
