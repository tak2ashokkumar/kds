import { Injectable } from '@angular/core';
import { StorageService } from '../app-storage/storage.service';
import { StorageType } from '../app-storage/storage.type';
import { FirebaseService } from '../app-core/firebase.service';
import { FIREBASE_COLLECTION } from '../app-core/firebase-collections';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private storage: StorageService,
    private firebaseService: FirebaseService) { }

  loadUserData() {
    return this.firebaseService.getRecordById(FIREBASE_COLLECTION.USERS, this.userEmail);
  }

  get logo() {
    return (<User>this.storage.getByKey('user', StorageType.SESSIONSTORAGE)).avatar;
  }

  get userEmail() {
    return (<User>this.storage.getByKey('user', StorageType.SESSIONSTORAGE)).email;
  }

  get isUserAdmin() {
    return (<User>this.storage.getByKey('user', StorageType.SESSIONSTORAGE)).isAdmin;
  }

  get userName() {
    return (<User>this.storage.getByKey('user', StorageType.SESSIONSTORAGE)).name;
  }
}

export class User {
  docId: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  avatar?: string;
  isAdmin?: boolean;
}
