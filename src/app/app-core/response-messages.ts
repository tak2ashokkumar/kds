import { FIREBASE_COLLECTION } from './firebase-collections';

export const MESSAGE_BY_STATUS_TYPE = (operation: string, statusType: string) => {
    switch (statusType) {
        case STATUS_TYPE.SUCCESS: return operation == OPERATION_TYPE.LOGIN ? `logged in` : `${operation}d`;
        case STATUS_TYPE.ERROR: return operation == OPERATION_TYPE.LOGIN ? `logged in` : `${operation} Failed.`;
        default: console.log('something went wrong with operation message constants');
    }
}

export const USER_CRUD = (operation: string, statusType: string) => {
    switch (operation) {
        case OPERATION_TYPE.CREATE:
            if (statusType == STATUS_TYPE.INFO) {
                return `You already have an account with us. Please login to continue`
            }
            return `User ${MESSAGE_BY_STATUS_TYPE(operation, statusType)}`;
        case OPERATION_TYPE.UPDATE: return ``;
        case OPERATION_TYPE.DELETE: return ``;
        case OPERATION_TYPE.READ: return ``;
        case OPERATION_TYPE.READ_BY_ID: return ``;
        case OPERATION_TYPE.LOGIN:
            if (statusType == STATUS_TYPE.ERROR) {
                return `Invalid Credentials.`
            }
            return ``;
        default:
    }
}

export const REST_MESSAGES = (collectionName: string, operation: string, statusType: string) => {
    switch (collectionName) {
        case FIREBASE_COLLECTION.USERS: return this.USER_CRUD(operation, statusType);
        default: console.log(`something went wrong with message constants`);
    }
};

export enum OPERATION_TYPE {
    CREATE = 'create',
    READ = 'loaded',
    READ_BY_ID = 'fetch',
    UPDATE = 'update',
    DELETE = 'delete',
    REGISTER = 'register',
    LOGIN = 'login'
}

export enum STATUS_TYPE {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}