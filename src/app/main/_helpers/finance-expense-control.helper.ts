import { EFinanceExpenseControlType } from "@/_shared/enums/finance-expense-control.enum";
import {
  IFinanceExpenseControl,
  IFinanceExpenseControlSummary,
} from "@/_shared/interface/finance/finance-expense-control.interface";

export class FinanceExpenseControlHelper {
  static buildSummary(
    data: IFinanceExpenseControl[]
  ): IFinanceExpenseControlSummary {
    const totalInflows = data
      .filter((_) => _.type === EFinanceExpenseControlType.INFLOW)
      .reduce((acc, item) => item.amount + acc, 0);

    const totalOutflows = data
      .filter((_) => _.type === EFinanceExpenseControlType.OUTFLOW)
      .reduce((acc, item) => item.amount + acc, 0);

    return {
      total: totalInflows - totalOutflows,
      totalInflows,
      totalOutflows,
    };
  }
}
