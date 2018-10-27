import { Action } from '@ngrx/store';
import { RouterParams } from '../models/router.model';

export const ON_GO_TO_PAGE_SPLOT = '[ Router ] - On Go to';

export class OnGoToPageSplot implements Action {
    readonly type = ON_GO_TO_PAGE_SPLOT;
    constructor(public payload: RouterParams) { }
}

export type All = OnGoToPageSplot;



