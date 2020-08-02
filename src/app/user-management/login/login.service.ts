import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { FIREBASE_COLLECTION } from 'src/app/app-core/firebase-collections';
import { userConverter, UserEntity } from '../user.type';

@Injectable()
export class LoginService {

  constructor(private firestore: AngularFirestore,
    private builder: FormBuilder) { }

  resetFormErrors() {
    let formErrors = {
      'email': '',
      'password': ''
    }
    return formErrors;
  }

  validationMessages = {
    'email': {
      'required': 'Email is mandatory'
    },
    'password': {
      'required': 'Password is mandatory'
    }
  }

  buildForm(): FormGroup {
    return this.builder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  getUserWithCredentials(formValues: loginFrom): Promise<firebase.firestore.QuerySnapshot<UserEntity>> {
    return this.firestore.collection(FIREBASE_COLLECTION.USERS).ref.withConverter(userConverter)
      .where('email', '==', formValues.email).where('password', '==', formValues.password).get();
  }

}

class loginFrom {
  email: string;
  password: string;
}
