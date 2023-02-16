import {Injectable} from '@angular/core';
import {GithubAuthProvider, GoogleAuthProvider, User,} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Firestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {getAuth, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";
import {Notyf} from "notyf";

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(
    private angularfireauth: AngularFireAuth,
    private router: Router,
    public firestore: Firestore,
  ) {
  }

  darkMode: string | null = 'false';

  notyf: Notyf = new Notyf();

  user: User | undefined | null = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  async loginWithEmailPsw(data: {
    email: string;
    password: string;
  }): Promise<any> {
    this.angularfireauth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        console.log(this.user);
      })
      .catch((err) => {
        this.user = undefined;
        localStorage.removeItem('user');
        console.error(err, 'messi');
      });
  }

  async loginWithGmail(): Promise<any> {
    return this.angularfireauth
      .signInWithPopup(new GoogleAuthProvider())
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        this.notyf.success('Successfully signed in 🦄');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleDarkMode(theme: string | null): void {
    this.darkMode = theme;
    localStorage.setItem('theme', theme || 'dark');
  }

  signUp(data: { email: string; password: string; username: string }) {
    this.angularfireauth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.router.navigate(['/signin']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async signOut(): Promise<any> {
    this.angularfireauth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.user = undefined!;
        this.router.navigate(['/']);
        this.notyf.success('Successfully signed out 🚀');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async loginWithGithub(): Promise<any> {
    return this.angularfireauth
      .signInWithPopup(new GithubAuthProvider())
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        this.notyf.success('Successfully signed in 🦄');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async verifyEmail(): Promise<void> {
    const auth = getAuth();
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser, null)
        .then(() => {
          console.log("geldi")
        });
    }
  }

  async resetPassword(): Promise<void> {
    const auth = getAuth();
    if (auth.currentUser && auth.currentUser.email) {
      await sendPasswordResetEmail(auth, auth.currentUser?.email)
        .then(() => {
          console.log("sent reset psw mail")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  }

}


