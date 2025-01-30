import { FirebaseCollectionBase } from "../base/firebase-collection.base";
import { FIREBASE_COLLECTION } from "../constans/firebase-collection.contant";
import { FinanceExpenseControlModel } from "../models/finance-expense-control.model";

export class FinanceExpenseControlService extends FirebaseCollectionBase {
  _model = new FinanceExpenseControlModel();

  constructor() {
    super(FIREBASE_COLLECTION.financeExpenseControl);
  }
}
