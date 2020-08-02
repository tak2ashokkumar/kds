
export class UserEntity {
    docId: string;
    name: string;
    email: string;
    mobile: string;
    password?: string;
    constructor() { }
}

export const userConverter = {
    toFirestore(user: UserEntity): firebase.firestore.DocumentData {
        return {
            docId: user.email,
            name: user.name,
            email: user.email,
            password: user.password
        };
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): UserEntity {
        const userData = snapshot.data(options)!;
        let user: UserEntity = new UserEntity();
        user.docId = userData.email;
        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        return user;
    }
}