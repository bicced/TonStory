import * as admin from 'firebase-admin';

const firestore = admin.firestore();

firestore.settings({ignoreUndefinedProperties: true});

export default firestore;
