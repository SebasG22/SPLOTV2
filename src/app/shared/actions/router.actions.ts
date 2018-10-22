import { Action } from '@ngrx/store';

export const ON_GO = '[ Router ] - On Go to';

export class OnGo implements Action {
    readonly type = ON_GO;
    constructor(public payload: { route: '' }) { }
}
