import { useEffect, useState } from "react";
import { endOfMonth, isWithinInterval, startOfMonth } from "date-fns";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { Card } from "@/_core/components/fragments/card";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { ArrowDownCircle, ArrowUpCircle, Filter } from "lucide-react";
import FinanceExpenseControlList from "./finance-expense-control-list";
import FinanceExpenseControlFilter from "./finance-expense-control-filter";
import FinanceExpenseControlSummary from "./finance-expense-control-summary";
import { EFinanceExpenseControlType } from "@/_shared/enums/finance-expense-control.enum";
import { FinanceExpenseControlHelper } from "../../_helpers/finance-expense-control.helper";
import { FinanceExpenseControlService } from "@/_core/firebase/services/finance-expense-control.service";
import {
  IFinanceExpenseControl,
  IFinanceExpenseControlDB,
  IFinanceExpenseControlFilter,
  IFinanceExpenseControlSummary,
} from "@/_shared/interface/finance/finance-expense-control.interface";

import FinanceExpenseControlRegister, {
  IFinanceExpenseControlRegisterFormData,
} from "./finance-expense-control-register";
import { orderBy, QueryConstraint, where } from "firebase/firestore";

const _financeExpenseControlService = new FinanceExpenseControlService();

export default function FinanceExpenseControl() {
  const _loadingStore = loadingStore((state) => state);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [filter, setFilter] = useState<IFinanceExpenseControlFilter>({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  });

  const [summary, setSummary] = useState<IFinanceExpenseControlSummary>({
    total: 0,
    totalInflows: 0,
    totalOutflows: 0,
  });

  const [registerData, setRegisterData] = useState(
    {} as IFinanceExpenseControl
  );
  const [registerMode, setRegisterMode] = useState(
    EFinanceExpenseControlType.INFLOW
  );

  const [items, setItems] = useState([] as IFinanceExpenseControl[]);

  const getItems = () => {
    _loadingStore.setShow(true);
    const constraints: QueryConstraint[] = [
      where("referenceDate", ">=", filter.startDate),
      where("referenceDate", "<=", filter.endDate),
      orderBy("creationDate", "desc"),
    ];

    _financeExpenseControlService
      .getAll<IFinanceExpenseControlDB[]>(constraints)
      .then((response) => {
        setItems(_financeExpenseControlService._model.buildList(response));
        _loadingStore.setShow(false);
      })
      .catch((error) => {
        ToastUtil.error();
        _loadingStore.setShow(false);
      });
  };

  const handleOpenRegister = (
    mode: EFinanceExpenseControlType,
    data?: IFinanceExpenseControl
  ) => {
    setRegisterMode(mode);
    setIsRegisterOpen(true);
    setRegisterData(data || ({} as IFinanceExpenseControl));
  };

  const handleRegister = (
    mode: EFinanceExpenseControlType,
    data: IFinanceExpenseControlRegisterFormData
  ) => {
    const modelDTO = _financeExpenseControlService._model.buildRegisterDTO({
      type: mode,
      id: data.id,
      title: data.title,
      user: registerData.user,
      amount: Number(data.amount),
      isRecurrent: data.isRecurrent,
      creationDate: registerData.creationDate || new Date(),
      referenceDate: registerData.referenceDate || new Date(data.referenceDate),
    });

    if (data.id) handleUpdate(data.id, modelDTO);
    else handleCreate(modelDTO);
  };

  const handleRemove = (model: IFinanceExpenseControl) => {
    _loadingStore.setShow(true);

    _financeExpenseControlService
      .delete(String(model.id))
      .then(() => {
        setItems((_) => _.filter((item) => item.id !== model.id));
        setIsRegisterOpen(false);
        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error();
        _loadingStore.setShow(false);
      });
  };

  const handleCreate = (model: IFinanceExpenseControlDB) => {
    _loadingStore.setShow(true);

    _financeExpenseControlService
      .create<IFinanceExpenseControlDB>(model)
      .then((response) => {
        const item = _financeExpenseControlService._model.buildItem({
          ...model,
          id: response.id,
        });

        const isAddToList = isWithinInterval(item.referenceDate, {
          start: filter.startDate,
          end: filter.endDate,
        });

        if (isAddToList) setItems((prevItems) => [item, ...prevItems]);

        setIsRegisterOpen(false);
        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error();
        _loadingStore.setShow(false);
      });
  };

  const handleUpdate = (id: string, model: IFinanceExpenseControlDB) => {
    _loadingStore.setShow(true);

    _financeExpenseControlService
      .update<IFinanceExpenseControlDB>(id, model)
      .then(() => {
        const data = _financeExpenseControlService._model.buildItem(model);
        setItems((_) => _.map((item) => (item.id === id ? data : item)));

        setIsRegisterOpen(false);
        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error();
        _loadingStore.setShow(false);
      });
  };

  useEffect(() => {
    getItems();
  }, [filter]);

  useEffect(() => {
    setSummary(FinanceExpenseControlHelper.buildSummary(items));
  }, [items]);

  return (
    <>
      <Card className="p-4">
        <h5 className="mb-4 text-foreground/50">Controle de gastos</h5>

        <FinanceExpenseControlFilter
          initialData={filter}
          onSubmit={(data) => setFilter(data)}
        >
          <Button
            size="sm"
            variant="link"
            className="relative -left-2 mb-4 text-foreground"
          >
            <Filter className="mr-2" />
          </Button>
        </FinanceExpenseControlFilter>

        <FinanceExpenseControlSummary data={summary} />

        <section className="mt-4 grid gap-4 grid-cols-2">
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              handleOpenRegister(EFinanceExpenseControlType.OUTFLOW)
            }
          >
            Nova saída
            <ArrowDownCircle className="ml-3 w-5 h-5" />
          </Button>

          <Button
            size="sm"
            variant="green"
            onClick={() =>
              handleOpenRegister(EFinanceExpenseControlType.INFLOW)
            }
          >
            Nova entrada
            <ArrowUpCircle className="ml-3 w-5 h-5" />
          </Button>
        </section>

        <Separator className="my-4" />

        <section className="max-h-[340px] overflow-auto">
          <FinanceExpenseControlList
            data={items}
            onSelect={(data) => handleOpenRegister(data.type, data)}
          />
        </section>
      </Card>

      <FinanceExpenseControlRegister
        mode={registerMode}
        data={registerData}
        isOpen={isRegisterOpen}
        onRemove={handleRemove}
        onSubmit={handleRegister}
        onOpenChange={(data) => setIsRegisterOpen(data)}
      />
    </>
  );
}
