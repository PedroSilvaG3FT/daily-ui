"use client";
import FinanceExpenseControl from "../_components/finance-expense-control";

export default function FinancePage() {
  return (
    <section className="app-container">
      <section className="grid gap-8 grid-cols-[35%_1fr] tablet:grid-cols-2 mobile:grid-cols-1">
        <FinanceExpenseControl />
      </section>
    </section>
  );
}
