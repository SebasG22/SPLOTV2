# Authentication Flow

<!-- ![image](https://user-images.githubusercontent.com/17608169/47473609-e8984080-d7d8-11e8-9f1a-9a85b3e58eea.png) -->


### Auth Providers

- Email - **(Administrators Users)**
- Google 
- Github

### Checking Session
1. Check if the user has an active session with firebase
```typescript
 export const CHECK_AUTH_SESSION = ['Auth - Check Auth Session'];
 export const CHECK_AUTH_SESSION_SUCCESS = ['Auth - Check Auth Session'];
```

2. If the user has NOT an active auth session:
    - Redirect to login page

3. If the user has an active auth session:

    - Get the information from the users collection on firebase `\users\$userId`
    - Map theirs app permissions to the user information
    - Redirect to home page

### Login With Providers

1. Each provider will have theirs rxjs action:
```typescript
export const LOGIN_WITH_GOOGLE = '[ Auth ] - Login with google';
export const LOGIN_WITH_EMAIL = '[Auth] - Login with email';
export const LOGIN_WITH_GITHUB = '[ Auth ] - Login with github';
```


