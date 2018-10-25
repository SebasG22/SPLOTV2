import * as authReducer from './auth.reducer';
import * as authActions from '../actions/auth.actions';

describe('AuthReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = authReducer;
            const action = {
                type: '' as any
            };
            const state = authReducer.reducer(undefined, action);
            expect(state).toBe(initialState);
        });
    });
    describe('VERIFY_AUTH_SUCCESS action', () => {
        it('should change the verifyAuth', () => {
            const action = new authActions.VerifyAuthSuccess();
            const state = authReducer.reducer(undefined, action);
            expect(state.loggedIn).toEqual(false);
        });
    });
});

describe('AuthReducer selectors', () => {
    describe('getAuthVerifyState', () => {
        it('should return the auth verify state', () => {
            const { initialState } = authReducer;
            // const verifyState = authReducer.getAuthVerifyState({ auth: { ...initialState, verifyAuth: true } });
            expect(authReducer.getAuthVerifyState.projector(initialState)).toEqual(false);
        });
    });
});
