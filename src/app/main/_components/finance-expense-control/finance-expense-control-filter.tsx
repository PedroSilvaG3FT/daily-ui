import { z } from "zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { format, parse, isAfter } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_core/components/fragments/button";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import { IFinanceExpenseControlFilter } from "@/_shared/interface/finance/finance-expense-control.interface";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_core/components/fragments/popover";

const formSchema = z
  .object({
    start: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Data de início inválida",
    }),
    end: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Data final inválida",
    }),
  })
  .refine(
    (data) => {
      const start = new Date(data.start);
      const end = new Date(data.end);
      return isAfter(end, start);
    },
    {
      message: "A data final deve ser posterior à data de início",
      path: ["end"],
    }
  );

interface IFormData extends z.infer<typeof formSchema> {}

interface IProps {
  children: ReactNode;
  initialData: IFinanceExpenseControlFilter;
  onSubmit: (data: IFinanceExpenseControlFilter) => void;
}

export default function FinanceExpenseControlFilter(props: IProps) {
  const { children, initialData, onSubmit } = props;

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: initialData.startDate
        ? format(new Date(initialData.startDate), "yyyy-MM-dd")
        : "",
      end: initialData.endDate
        ? format(new Date(initialData.endDate), "yyyy-MM-dd")
        : "",
    },
  });

  function handleSubmit(values: IFormData) {
    onSubmit({
      startDate: parse(values.start, "yyyy-MM-dd", new Date()),
      endDate: parse(values.end, "yyyy-MM-dd", new Date()),
    });

    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 lg:relative left-12" isBlurBackdrop>
        <section className="grid gap-4">
          <nav className="space-y-2">
            <h4 className="font-medium leading-none">Filtro</h4>
            <p className="text-sm text-muted-foreground">
              Consulte os seus registros por período
            </p>
          </nav>

          <FormContainer {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 w-full"
            >
              <AppFormInput
                type="date"
                name="start"
                control={form.control}
                placeholder="Data início"
              />

              <AppFormInput
                name="end"
                type="date"
                control={form.control}
                placeholder="Data Final"
              />

              <Button type="submit" className="w-full">
                Filtrar
              </Button>
            </form>
          </FormContainer>
        </section>
      </PopoverContent>
    </Popover>
  );
}
