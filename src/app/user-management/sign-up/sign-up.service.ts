import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { FirebaseService } from 'src/app/app-core/firebase.service';
import { AngularFirestore, CollectionReference, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { UserEntity, userConverter } from '../user.type'
import { FIREBASE_COLLECTION } from 'src/app/app-core/firebase-collections';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpService {

  constructor(private firestore: AngularFirestore,
    private builder: FormBuilder) { }

  resetFormErrors() {
    let formErrors = {
      'name': '',
      'email': '',
      'password': '',
      'confirmPassword': ''
    }
    return formErrors;
  }

  validationMessages = {
    'name': {
      'required': 'Name is mandatory'
    },
    'email': {
      'required': 'Email is mandatory'
    },
    'password': {
      'required': 'Password is mandatory'
    },
    'confirmPassword': {
      'required': 'Confirm Password is mandatory'
    }
  }

  buildForm(): FormGroup {
    return this.builder.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]]
    })
  }

  addUser(form: RegistrationFrom): Promise<void> {
    let user: UserEntity = new UserEntity();
    user.docId = form.email;
    user.name = form.name;
    user.email = form.email;
    user.password = form.password;
    return this.firestore.collection(FIREBASE_COLLECTION.USERS).ref.withConverter(userConverter).doc(user.docId).set(user);
  }

  checkUserExists(form: RegistrationFrom): Promise<firebase.firestore.DocumentSnapshot<UserEntity>> {
    return this.firestore.collection(FIREBASE_COLLECTION.USERS).ref.withConverter(userConverter).doc(form.email).get();
  }
}


class RegistrationFrom {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  constructor() { }
}
