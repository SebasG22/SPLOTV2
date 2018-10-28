import { Action } from '@ngrx/store';
import { IErrorMessage } from '../models/error.model';

export const SET_ERROR_SPLOT = '[ Error ] - Set error';

export class SetErrorSplot implements Action {
    readonly type = SET_ERROR_SPLOT;
    public constructor(public payload: IErrorMessage) { }
}

export type All = SetErrorSplot;
