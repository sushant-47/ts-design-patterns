# 📚 Strategy Pattern
- Follows Dependency Inversion Principle.
- Create strategies that implement a common interface ("contract").
- Declare dependency to the common interface rather than a concrete strategy in the container class ("OAuthContext").
- Consumer calls the `authenticate()` method of the container class, which internally calls the `authenticate()` method declared in `IOAuth` contract.

![strategy-design-pattern](../../assets/strategy-pattern.jpg)

## 💡 Use Case

Let's say you want to authenticate users with oAuth, based on Google, Facebook and LinkedIn

## ❌ Bad Practice

```ts
class OAuthBad {
  constructor() {}

  authenticate(provider: string) {
    switch (provider) {
      case 'Google':
        console.log('Perform an http call to Google');
        console.log('Do your stuff here');
      
      case 'Facebook':
        console.log('Perform an http call to Facebook');
        console.log('Do your stuff here');
        break;
      
      case 'LinkedIn':
        console.log('Perform an http call to LinkedIn');
        console.log('Do your stuff here');
        break;
    
      default:
        break;
    }
  }
}

const auth = new OAuthBad()
auth.authenticate('Google')
```

## ✅ Good Practice

```ts
class OAuth {
  constructor(
    private googleAuth: GoogleAuth,
    private facebookAuth: FacebookAuth,
    private linkedInAuth: LinkedInAuth,
  ) {}

  authenticate(provider: Provider) {
    this[`${provider}Auth`].authenticate()
  }
}

const google = new GoogleAuth();
const facebook = new FacebookAuth();
const linkedIn = new LinkedInAuth();

const oauth = new OAuth(google, facebook, linkedIn);
oauth.authenticate('facebook');
```
