import React from "react";
import { Button } from "../components/ui/button";
import { nanoid } from "nanoid";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import useEvent from "../context/EventContext";
import { Budget } from "../lib/interface";
import { cn } from "../lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Input } from "./ui/input";

function BudgetDialog({ eventId }: { eventId: string }) {
    const [input, setInput] = React.useState<{
        amount: number;
        description: string;
    }>({
        amount: 0,
        description: "",
    });
    const { events, deleteBudget, addBudget } = useEvent();

    const expenses: Budget[] =
        events.find((event) => event.eventId === eventId)?.budget.expenses ||
        [];
    const incomes: Budget[] =
        events.find((event) => event.eventId === eventId)?.budget.income || [];

    const heading: string =
        events.find((event) => event.eventId === eventId)?.title || "";

    const calcBudget =
        incomes.reduce((prev, curr) => {
            return prev + curr.amount;
        }, 0) -
        expenses.reduce((prev, curr) => {
            return prev + curr.amount;
        }, 0);

    const delBudget = (id: string, type: "income" | "expense") => {
        deleteBudget(id, events, eventId, type);
    };

    const addBud = (type: "income" | "expense") => {
        if (
            (input.amount === 0 || isNaN(input.amount)) &&
            input.description === ""
        )
            return;

        const budget: Budget = {
            amount: input.amount,
            budgetId: nanoid(),
            description: input.description,
        };
        addBudget(events, eventId, type, budget);
        setInput({
            amount: 0,
            description: "",
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button  variant={'outline'}>
                    View Budget
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{heading}</DialogTitle>
                </DialogHeader>
                <div>
                    <h1 className="font-semibold">Income</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {incomes.map((income, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {income.description}
                                        </TableCell>
                                        <TableCell>${income.amount}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() =>
                                                    delBudget(
                                                        income.budgetId,
                                                        "income"
                                                    )
                                                }
                                                variant={"destructive"}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <h1 className="font-semibold">Expenses</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenses.map((expense, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {expense.description}
                                        </TableCell>
                                        <TableCell>${expense.amount}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() =>
                                                    delBudget(
                                                        expense.budgetId,
                                                        "expense"
                                                    )
                                                }
                                                variant={"destructive"}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <h1 className="font-semibold">Profit</h1>
                    <p
                        className={cn(
                            "w-full p-2",
                            calcBudget >= 0 ? "bg-green-200" : "bg-red-200"
                        )}
                    >
                        {calcBudget}$
                    </p>
                </div>

                <div>
                    <h1 className="font-semibol">Add New Item</h1>
                    <div className="flex gap-1">
                        <Input
                            type="text"
                            placeholder="Description"
                            value={input.description}
                            onChange={(e) =>
                                setInput({
                                    ...input,
                                    description: e.target.value,
                                })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="0"
                            value={input.amount}
                            onChange={(e) =>
                                setInput({
                                    ...input,
                                    amount: parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={() => addBud("income")}
                        type="submit"
                        size="sm"
                        className="w-fit"
                    >
                        Add Income
                    </Button>
                    <Button
                        onClick={() => addBud("expense")}
                        type="submit"
                        size="sm"
                        className="w-fit"
                    >
                        Add Expense
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BudgetDialog;
