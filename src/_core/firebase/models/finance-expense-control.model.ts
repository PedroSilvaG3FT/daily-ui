import { Timestamp } from "firebase/firestore";
import { FirebaseAuthenticationService } from "../base/firebase-authentication.service";
import {
  IFinanceExpenseControl,
  IFinanceExpenseControlDB,
} from "@/_shared/interface/finance/finance-expense-control.interface";

export class FinanceExpenseControlModel {
  _auth = new FirebaseAuthenticationService();

  public buildItem(model: IFinanceExpenseControlDB): IFinanceExpenseControl {
    return {
      ...model,
      id: String(model.id),
      user: model.user?.id,
      creationDate: model.creationDate?.toDate(),
      referenceDate: model.referenceDate?.toDate(),
    };
  }

  public buildList(model: IFinanceExpenseControlDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(
    model: IFinanceExpenseControl
  ): IFinanceExpenseControlDB {
    return {
      type: model.type,
      id: model.id || "",
      title: model.title || "",
      amount: model.amount || 0,
      user: this._auth.getUserReference(),
      isRecurrent: model.isRecurrent || false,
      referenceDate: model.referenceDate
        ? Timestamp.fromDate(new Date(model.referenceDate))
        : Timestamp.now(),
      creationDate: model.creationDate
        ? Timestamp.fromDate(new Date(model.creationDate))
        : Timestamp.now(),
    };
  }
}
