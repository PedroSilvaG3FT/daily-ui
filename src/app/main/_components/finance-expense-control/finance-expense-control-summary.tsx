import { MoveDown, MoveUp } from "lucide-react";
import CountUp from "@/_core/components/fragments/animated/CountUp";
import { IFinanceExpenseControlSummary } from "@/_shared/interface/finance/finance-expense-control.interface";

interface IProps {
  data: IFinanceExpenseControlSummary;
}

export default function FinanceExpenseControlSummary(props: IProps) {
  const { data } = props;
  const animationDuration = 0.05;

  return (
    <article>
      <CountUp
        isCurrency
        to={data.total}
        from={data.total * 0.98}
        duration={animationDuration}
        className="font-semibold text-4xl"
      />

      <div className="mt-4 text-sm flex gap-4 items-center">
        <span className="flex items-center text-red-400">
          <MoveDown className="h-3" />
          <CountUp
            isCurrency
            to={data.totalOutflows}
            duration={animationDuration}
            from={data.totalOutflows * 0.98}
          />
        </span>

        <span className="flex items-center text-green-400">
          <MoveUp className="h-3" />
          <CountUp
            isCurrency
            to={data.totalInflows}
            duration={animationDuration}
            from={data.totalInflows * 0.98}
          />
        </span>
      </div>
    </article>
  );
}
