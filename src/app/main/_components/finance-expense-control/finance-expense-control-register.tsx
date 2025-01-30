import {
  Dialog,
  DialogTitle,
  DialogHeader,
  IDialogProps,
  DialogContent,
  DialogTrigger,
} from "@/_core/components/fragments/dialog";

import { z } from "zod";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Show from "@/_shared/components/app-show";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_core/components/fragments/button";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import AppFormSwitch from "@/_shared/components/form/form-switch";
import { EFinanceExpenseControlType } from "@/_shared/enums/finance-expense-control.enum";
import { IFinanceExpenseControl } from "@/_shared/interface/finance/finance-expense-control.interface";
import { FINANCE_EXPANSE_CONTROL_TYPE_CONFIG } from "@/_shared/constants/finance-expense-control-type.constant";

const formSchema = z.object({
  id: z.string(),
  isRecurrent: z.boolean(),
  referenceDate: z.string(),
  title: z.string().min(1, "Required field"),
  amount: z.string().min(1, "Required field"),
});

export interface IFinanceExpenseControlRegisterFormData
  extends z.infer<typeof formSchema> {}

interface IProps extends IDialogProps {
  data?: IFinanceExpenseControl;
  mode: EFinanceExpenseControlType;
  onRemove: (data: IFinanceExpenseControl) => void;
  onSubmit: (
    mode: EFinanceExpenseControlType,
    data: IFinanceExpenseControlRegisterFormData
  ) => void;
}

export default function FinanceExpenseControlRegister(props: IProps) {
  const { children, isOpen, data, mode, onOpenChange, onRemove, onSubmit } =
    props;

  const form = useForm<IFinanceExpenseControlRegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      amount: "",
      isRecurrent: false,
      referenceDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const handleSubmit = (model: IFinanceExpenseControlRegisterFormData) => {
    onSubmit(mode, model);
  };

  useEffect(() => {
    if (isOpen) form.reset();
    if (isOpen && data?.id) {
      form.setValue("id", data.id || "");
      form.setValue("title", data.title);
      form.setValue("isRecurrent", data.isRecurrent);
      form.setValue("amount", String(data.amount));
      form.setValue(
        "referenceDate",
        format(new Date(data.referenceDate), "yyyy-MM-dd")
      );
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            {FINANCE_EXPANSE_CONTROL_TYPE_CONFIG[mode].title}
          </DialogTitle>
        </DialogHeader>

        <FormContainer {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 w-full"
          >
            <AppFormInput
              name="title"
              control={form.control}
              placeholder="Titulo do registro"
            />

            <AppFormInput
              name="amount"
              type="number"
              placeholder="Valor"
              control={form.control}
            />

            <AppFormInput
              type="date"
              name="referenceDate"
              control={form.control}
              placeholder="Data de referencia"
            />

            <AppFormSwitch
              name="isRecurrent"
              label="É recorrente ?"
              control={form.control}
            />

            <Button type="submit" className="w-full">
              Salvar
            </Button>

            <Show>
              <Show.When condition={!!data?.id}>
                <Button
                  type="button"
                  className="w-full"
                  variant="destructive"
                  onClick={() => onRemove(data as IFinanceExpenseControl)}
                >
                  Remover
                </Button>
              </Show.When>
            </Show>
          </form>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}
