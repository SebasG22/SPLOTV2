import { VerifyAuth, VERIFY_AUTH } from './auth.actions';

describe('Verify Auth', () => {
    it('Should create an action', () => {
        const action = new VerifyAuth();
        expect({ ...action }).toEqual({
            type: VERIFY_AUTH
        });
    })
});