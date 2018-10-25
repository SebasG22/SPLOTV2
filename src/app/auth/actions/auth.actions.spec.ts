import {
    CheckAuthSession,
    CHECK_AUTH_SESSION,
    CheckAuthSessionSuccess,
    CHECK_AUTH_SESSION_SUCCESS,
    LoginWithGoogle,
    LOGIN_WITH_GOOGLE,
    LOGIN_WITH_EMAIL,
    LOGIN_WITH_GITHUB,
    LoginWithEmail,
    LoginWithGithub,
    LoginSuccess,
    LOGIN_SUCCESS,
    LoginFailed,
    Logout,
    LOGOUT,
    LogoutSuccess,
    LOGOUT_SUCCESS,
    LogoutFailed,
    LOGOUT_FAILED,
    LOGIN_FAILED
} from './auth.actions';
import { UserProvider } from '../models';

fdescribe('Check auth session', () => {
    it('Should create the action', () => {
        const action = new CheckAuthSession();
        expect({ ...action }).toEqual({
            type: CHECK_AUTH_SESSION
        });
    });

    it('Should create the success action', () => {
        const payload = true;
        const action = new CheckAuthSessionSuccess(payload);
        expect({ ...action }).toEqual({
            type: CHECK_AUTH_SESSION_SUCCESS,
            payload
        });
    });
});

fdescribe('Login actions', () => {
    it('should create an action for google provider', () => {
        const action = new LoginWithGoogle();
        expect({ ...action }).toEqual({
            type: LOGIN_WITH_GOOGLE
        });
    });
    it('should create an action for email provider', () => {
        const payload = { email: '123@123.com', password: '123' };
        const action = new LoginWithEmail(payload);
        expect({ ...action }).toEqual({
            type: LOGIN_WITH_EMAIL,
            payload
        });
    });

    it('should create an action for github provider', () => {
        const action = new LoginWithGithub();
        expect({ ...action }).toEqual({
            type: LOGIN_WITH_GITHUB
        });
    });

    it('should create an action for login success', () => {
        const payload: UserProvider = {
            id: '1',
            name: 'Test User',
            email: '123@123.com',
            photo: ''
        };
        const action = new LoginSuccess(payload);
        expect({ ...action }).toEqual({
            type: LOGIN_SUCCESS,
            payload
        });
    });

    it('should create an action for login failed', () => {
        const payload = { message: 'The system is down' };
        const action = new LoginFailed(payload);
        expect({ ...action }).toEqual(
            jasmine.objectContaining({
                type: LOGIN_FAILED,
                payload
            })
        );
    });

});

fdescribe('Logout actions', () => {
    it('should create an action for logout', () => {
        const action = new Logout();
        expect({ ...action }).toEqual({
            type: LOGOUT
        });
    });

    it('should create an action for logout success', () => {
        const action = new LogoutSuccess();
        expect({ ...action }).toEqual({
            type: LOGOUT_SUCCESS
        });
    });

    it('should create and action for logout failed', () => {
        const payload = { message: 'The system is down' };
        const action = new LogoutFailed(payload);
        expect({ ...action }).toEqual(
            jasmine.objectContaining({
                type: LOGOUT_FAILED,
                payload
            })
        );
    });
});
