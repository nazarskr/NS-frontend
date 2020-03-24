import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/auth.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headerParams = new BehaviorSubject<{
    login: string,
    registered: boolean
  }>({
    login: '',
    registered: false
  });
  path = '/users';
  ref: AngularFirestoreCollection<User> = null;

  constructor(private firestore: AngularFirestore) {
    this.ref = firestore.collection(this.path);
  }
  getUsers(): AngularFirestoreCollection<User> {
    return this.ref;
  }
  getUser() {
    return this.headerParams;
  }
  setUser(login) {
    this.headerParams.next({
      login,
      registered: true
    });
  }
  createUser(user) {
    this.ref.add({...user});
  }
}
