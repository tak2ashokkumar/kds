import { environment } from 'src/environments/environment';

export const GET_REFERRALS_DATA = (referralType: string) => {
    switch (referralType) {
        case `banking`: return `${environment.staticData}banking_referrals.json`;
        case `bill_payments`: return `${environment.staticData}bill_payment_referrals.json`;
        case `shopping_vendors`: return `${environment.staticData}shopping_referrals.json`;
        case `loan_providers`: return `${environment.staticData}loan_vendors_referrals.json`;
        case `utilities`: return `${environment.staticData}utility_app_referrals.json`;
        default: console.error('Invalid referralType received : ', referralType);;
    }
};