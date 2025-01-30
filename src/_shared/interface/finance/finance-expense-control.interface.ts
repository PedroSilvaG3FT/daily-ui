import { DocumentReference, Timestamp } from "firebase/firestore";
import { EFinanceExpenseControlType } from "@/_shared/enums/finance-expense-control.enum";

export interface IFinanceExpenseControlDB {
  id?: string;
  title: string;
  amount: number;
  isRecurrent: boolean;
  user: DocumentReference;
  creationDate: Timestamp;
  referenceDate: Timestamp;
  type: EFinanceExpenseControlType;
}

export interface IFinanceExpenseControl
  extends Omit<
    IFinanceExpenseControlDB,
    "creationDate" | "user" | "referenceDate"
  > {
  user: string;
  creationDate: Date;
  referenceDate: Date;
}

export interface IFinanceExpenseControlFilter {
  startDate: Date;
  endDate: Date;
}

export interface IFinanceExpenseControlSummary {
  total: number;
  totalInflows: number;
  totalOutflows: number;
}
