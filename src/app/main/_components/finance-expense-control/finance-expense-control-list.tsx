import Each from "@/_shared/components/app-each";
import { cn } from "@/_core/components/lib/utils";
import { NumberUtil } from "@/_shared/utils/number.util";
import AppEmptyList from "@/_shared/components/app-empty-list";
import { Card, CardContent } from "@/_core/components/fragments/card";
import { EFinanceExpenseControlType } from "@/_shared/enums/finance-expense-control.enum";
import { IFinanceExpenseControl } from "@/_shared/interface/finance/finance-expense-control.interface";
import {
  HandCoins,
  RepeatIcon,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

interface IProps {
  data: IFinanceExpenseControl[];
  onSelect?: (data: IFinanceExpenseControl) => void;
}

export default function FinanceExpenseControlList(props: IProps) {
  const { data, onSelect } = props;

  return (
    <section className="space-y-4">
      <Each
        data={data}
        empty={
          <AppEmptyList
            icon={HandCoins}
            message="- Sem registros -"
            className="text-foreground/70 py-8"
          />
        }
        render={(item) => {
          const isInflow = item.type === EFinanceExpenseControlType.INFLOW;
          const Icon = isInflow ? ArrowUpCircle : ArrowDownCircle;
          const textClassName = isInflow ? "text-green-400" : "text-red-400";

          return (
            <Card
              onClick={() => onSelect?.(item)}
              className="cursor-pointer transition-all duration-300 hover:scale-[0.98]"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className={cn("w-5 h-5 mr-4", textClassName)} />

                    <article>
                      <h6 className="font-semibold text-sm">{item.title}</h6>
                      <small className="text-gray-500 flex items-center">
                        {item.isRecurrent && (
                          <RepeatIcon className="w-3 h-3 mr-2" />
                        )}
                        {item.isRecurrent && "Recorrente - "}
                        {item.referenceDate.toLocaleDateString()}
                      </small>
                    </article>
                  </div>

                  <div className={cn("text-sm", textClassName)}>
                    {NumberUtil.formatCurrency(item.amount)}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }}
      />
    </section>
  );
}
