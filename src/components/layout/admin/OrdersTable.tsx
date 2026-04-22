"use client";
import updateOrderStatus, {
  type OrderStatus,
} from "@/actions/admin/updateOrderStatus";
import getOrdersByRange, {
  type OrderRow,
} from "@/actions/admin/getOrdersByRange";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState, useTransition } from "react";

export const ORDER_STATUS_OPTIONS = [
  "pending",
  "processing",
  "out_for_delivery",
  "completed",
  "failed_delivery",
  "cancelled",
] as const;

export default function CreateOrdersTable({
  from,
  to,
  currentPage,
  itemLimit,
}: {
  from: number;
  to: number;
  currentPage: number;
  itemLimit: number;
}) {
  const pathname = usePathname();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<number, OrderStatus>
  >({});
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(totalOrders / itemLimit));

  const createPageHref = (page: number) => `${pathname}?page=${page}`;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, currentPage]);
    if (currentPage > 1) pages.add(currentPage - 1);
    if (currentPage < totalPages) pages.add(currentPage + 1);

    return Array.from(pages).sort((a, b) => a - b);
  };

  async function fetchOrders() {
    try {
      const data = await getOrdersByRange(from, to);
      setOrders(data?.orders ?? []);
      setTotalOrders(data?.totalOrders ?? 0);
    } catch (error) {
      toast.error("Failed to fetch orders. Please try again.");
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [from, to]);

  const getOrderStatus = (status: string): OrderStatus => {
    if (ORDER_STATUS_OPTIONS.includes(status as OrderStatus)) {
      return status as OrderStatus;
    }
    return "pending";
  };

  const handleEditClick = (order: OrderRow) => {
    const currentStatus = getOrderStatus(order.status);
    setEditingOrderId(order.id);
    setSelectedStatuses((prev) => ({
      ...prev,
      [order.id]: prev[order.id] ?? currentStatus,
    }));
  };

  const handleSave = (orderId: number) => {
    const nextStatus = selectedStatuses[orderId];
    if (!nextStatus) return;

    startTransition(() => {
      void (async () => {
        await updateOrderStatus({ orderId, newStatus: nextStatus });
        setEditingOrderId(null);
        await fetchOrders();
      })();
    });
  };

  return (
    <div className="mt-6">
      <Table className="w-full table-auto border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="border-b px-6 py-3 text-left text-sm font-bold text-accent uppercase tracking-wider">
              Order ID
            </TableHead>
            <TableHead className="border-b px-6 py-3 text-left text-sm font-bold text-accent uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="border-b px-6 py-3 text-left text-sm font-bold text-accent uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="border-b px-6 py-3 text-left text-sm font-bold text-accent uppercase tracking-wider">
              Edit
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="border-b px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-text">
                  Order #{order.id}
                </div>
              </TableCell>
              <TableCell className="border-b px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-text/80">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="border-b px-6 py-4 whitespace-nowrap">
                {editingOrderId === order.id ? (
                  <div className="flex items-center gap-2">
                    <Select
                      value={
                        selectedStatuses[order.id] ??
                        getOrderStatus(order.status)
                      }
                      onValueChange={(value) =>
                        setSelectedStatuses((prev) => ({
                          ...prev,
                          [order.id]: value as OrderStatus,
                        }))
                      }
                    >
                      <SelectTrigger className="min-w-55">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {ORDER_STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <span
                    className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                )}
              </TableCell>
              <TableCell className="border-b px-6 py-4 whitespace-nowrap text-sm text-text/80">
                {editingOrderId === order.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSave(order.id)}
                      disabled={isPending}
                      className="text-white bg-accent px-4 py-2 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isPending ? "Updating..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingOrderId(null)}
                      disabled={isPending}
                      className="text-text bg-accent/20 px-4 py-2 hover:bg-transparent transition-all hover:text-accent/80 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditClick(order)}
                    className="text-text bg-accent/20 px-4 py-2 hover:bg-transparent transition-all hover:text-accent/80"
                  >
                    Edit
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageHref(Math.max(1, currentPage - 1))}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, index, pages) => {
            const previousPage = pages[index - 1];
            const showEllipsis = previousPage && page - previousPage > 1;

            return (
              <Fragment key={page}>
                {showEllipsis ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : null}

                <PaginationItem>
                  <PaginationLink
                    href={createPageHref(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </Fragment>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={createPageHref(Math.min(totalPages, currentPage + 1))}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
