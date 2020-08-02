import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
// import { FirebaseService } from './firebase.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { REST_MESSAGES, OPERATION_TYPE, STATUS_TYPE } from './response-messages';
import { FirebaseError } from 'firebase';

@Component({
    selector: 'firebase',
    templateUrl: './firebase.component.html',
    styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent implements OnInit, OnDestroy {
    @Output('onCrud') onCrud = new EventEmitter<ResponseObject>();
    private ngUnsubscribe = new Subject();
    constructor() {
        // this.firebaseService.documentExistCheckAnnounced$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        //   this.checkDocumentExists(res.collectionName, res.record, res.operation);
        // })
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    returnResponse(collectionName: string, operation: string, status: string) {
        let obj: ResponseObject = new ResponseObject();
        switch (status) {
            case STATUS_TYPE.SUCCESS:
                let successObj = new SuccessObject();
                successObj.message = REST_MESSAGES(collectionName, operation, status);
                obj.success = successObj;
                break;
            case STATUS_TYPE.ERROR:
                let errorObj = new ErrorObject();
                errorObj.message = REST_MESSAGES(collectionName, operation, status);
                obj.error = errorObj;
                break;
            case STATUS_TYPE.INFO:
                let infoObj = new InfoObject();
                infoObj.message = REST_MESSAGES(collectionName, operation, status);
                obj.info = infoObj;
                break;
            default: console.log('problem with status type');
        }
        return obj;
    }

    manageCreateOperation(collectionName: string, operation: string, record: any) {
        // this.firebaseService.createRecord(collectionName, record).then(record => {
        //   this.onCrud.emit(this.returnResponse(collectionName, operation, STATUS_TYPE.SUCCESS));
        // }).catch(error => {
        //   this.onCrud.emit(this.returnResponse(collectionName, operation, STATUS_TYPE.ERROR));
        // })
    }

    manageUpdateOperation(collectionName: string, operation: string, record: any) {

    }

    manageDeleteOperation(collectionName: string, operation: string, record: any) {

    }


    validateLogin(collectionName: string, record: any) {
        // this.firestore.collection(collectionName).ref.where('email', '==', record.email).where('password', '==', record.password);
    }

    continueOperation(collectionName: string, record: any, isExists: boolean, operation: string) {
        if (isExists) {
            if (operation == OPERATION_TYPE.LOGIN) {
                this.validateLogin(collectionName, record);
            } else {
                this.onCrud.emit(this.returnResponse(collectionName, operation, STATUS_TYPE.INFO));
            }
        } else {
            if (operation == OPERATION_TYPE.READ) {
                this.onCrud.emit(this.returnResponse(collectionName, operation, STATUS_TYPE.ERROR));
            } else {
                switch (operation) {
                    case OPERATION_TYPE.UPDATE: this.manageUpdateOperation(collectionName, operation, record); break;
                    case OPERATION_TYPE.DELETE: this.manageDeleteOperation(collectionName, operation, record); break;
                    case OPERATION_TYPE.CREATE:
                    case OPERATION_TYPE.REGISTER: this.manageCreateOperation(collectionName, operation, record); break;
                }
            }
        }
    }

    checkDocumentExists(collectionName: string, record: any, operation: string) {
        // this.firestore.collection(collectionName).doc(record.docId).get().subscribe(doc => {
        //   // this.continueOperation(collectionName, record, doc.exists, operation);
        //   if (doc.exists) {
        //     if (operation == OPERATION_TYPE.LOGIN) {
        //       // this.validateLogin(record);
        //     } else {
        //       this.onCrud.emit(this.returnResponse(collectionName, operation, STATUS_TYPE.INFO));
        //     }
        //   } else {
        //     if (operation == OPERATION_TYPE.READ) {
        //       this.onCrud.emit(this.returnResponse(collectionName, operation, STATUS_TYPE.ERROR));
        //     } else {
        //       switch (operation) {
        //         case OPERATION_TYPE.UPDATE: this.manageUpdateOperation(collectionName, operation, record); break;
        //         case OPERATION_TYPE.DELETE: this.manageDeleteOperation(collectionName, operation, record); break;
        //         case OPERATION_TYPE.CREATE:
        //         case OPERATION_TYPE.REGISTER: this.manageCreateOperation(collectionName, operation, record); break;
        //       }
        //     }
        //   }
        // }, (err: FirebaseError) => {
        //   this.onCrud.emit(this.returnResponse(collectionName, operation, STATUS_TYPE.ERROR));
        // })
    }
}


export class SuccessObject {
    message: string;
    constructor() { }
}

export class InfoObject {
    message: string;
    constructor() { }
}

export class ErrorObject {
    message: string;
    constructor() { }
}

export class ResponseObject {
    status?: number;
    success?: SuccessObject;
    info?: InfoObject;
    error?: ErrorObject;
    constructor() { }
}
