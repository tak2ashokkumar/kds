import { Injectable } from '@angular/core';

import { AngularFirestore, } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
import { FIREBASE_COLLECTION } from './firebase-collections';
import { OPERATION_TYPE } from './response-messages';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private documentExistCheckSource = new Subject<{ collectionName: string, record: any, operation: string }>();
  documentExistCheckAnnounced$ = this.documentExistCheckSource.asObservable();

  constructor(private firestore: AngularFirestore) {
  }

  documentExistCheckEvent(collectionName: string, record: any, operation: string) {
    this.documentExistCheckSource.next({ collectionName: collectionName, record: record, operation: operation })
  }

  create(collectionName: string, record: any) {
    if (collectionName == FIREBASE_COLLECTION.USERS) {
      this.documentExistCheckEvent(collectionName, record, OPERATION_TYPE.REGISTER);
    } else {
      this.documentExistCheckEvent(collectionName, record, OPERATION_TYPE.CREATE);
    }
  }

  login(record: any) {
    return this.firestore.collection(FIREBASE_COLLECTION.USERS).ref.where('email', '==', record.email)
      .where('password', '==', record.password).get();
  }

  update(collectionName: string, record: any) {
    this.documentExistCheckEvent(collectionName, record, OPERATION_TYPE.UPDATE);
  }

  delete(collectionName: string, record: any) {
    this.documentExistCheckEvent(collectionName, record, OPERATION_TYPE.DELETE);
  }

  createRecord(collectionName: string, record: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(record.docId).set(JSON.parse(JSON.stringify(record)));
  }

  getRecords(collectionName: string) {
    return this.firestore.collection(collectionName).snapshotChanges();
  }

  getRecordById(collectionName: string, recordId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(recordId).get();
  }

  updateRecord(collectionName: string, recordId: string, record: any) {
    this.firestore.doc(`${collectionName}/${recordId}`).update(JSON.parse(JSON.stringify(record)));
  }

  deleteRecord(collectionName: string, recordId: string) {
    this.firestore.doc(`${collectionName}/${recordId}`).delete();
  }

}
