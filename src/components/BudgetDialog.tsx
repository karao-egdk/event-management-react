import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";
import { Budget } from "../lib/interface";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

function BudgetDialog() {
    const expenses: Budget[] = [
        {
            description: "Ticket Sales",
            amount: 5000,
        },
    ];
    const incomes: Budget[] = [
        {
            description: "Venue Rental",
            amount: 2000,
        },
        {
            description: "Catering",
            amount: 1000,
        },
    ];

    return (
        <Dialog>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Tech Conference 2023 - Budget</DialogTitle>
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
                                            <Button variant={"destructive"}>
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
                                            <Button variant={"destructive"}>
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
                    <p className="w-full bg-green-200 p-2">$2000</p>
                </div>

                <div>
                    <h1 className="font-semibol">Add New Item</h1>
                    <div className="flex gap-1">
                        <input
                            type="text"
                            placeholder="Description"
                            className="flex h-10 w-1/2 rounded-md border border-black/25 bg-background px-3 py-2 text-sm focus:border-0"
                        />
                        <input
                            type="number"
                            placeholder="0"
                            className="flex h-10 w-1/2 rounded-md border border-black/25 bg-background px-3 py-2 text-sm focus:border-0"
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button type="submit" size="sm" className="w-fit">
                        Add Income
                    </Button>
                    <Button type="submit" size="sm" className="w-fit">
                        Add Expense
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BudgetDialog;
