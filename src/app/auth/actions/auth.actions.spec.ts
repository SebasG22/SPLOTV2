import { VerifyAuth, VERIFY_AUTH } from './auth.actions';

fdescribe('Verify Auth', () => {
    fit('Should create an action', () => {
        const action = new VerifyAuth();
        expect({ ...action }).toEqual({
            type: VERIFY_AUTH
        });
    })
});