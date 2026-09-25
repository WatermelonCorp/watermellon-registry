"use client";

import * as React from "react";
import { ArrowRight, ChevronsUpDown, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssetBadge } from "./asset-badge";

type Asset = {
  asset: string;
  balance: string;
  value: string;
  color: string;
};

type AssetTableCardProps = {
  title: string;
  assets: Asset[];
  action: string;
  valueLabel: string;
  external?: boolean;
};

export function AssetTableCard({
  title,
  assets,
  action,
  valueLabel,
  external,
}: AssetTableCardProps) {
  const [sortField, setSortField] = React.useState<"balance" | "value" | null>(
    null,
  );
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");

  const handleSort = (field: "balance" | "value") => {
    if (sortField === field) {
      if (sortDir === "desc") {
        setSortDir("asc");
      } else {
        setSortField(null);
        setSortDir("desc");
      }
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const sortedAssets = React.useMemo(() => {
    if (!sortField) return assets;

    return [...assets].sort((a, b) => {
      const parseValue = (val: string) => {
        return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
      };

      const valA = parseValue(a[sortField]);
      const valB = parseValue(b[sortField]);

      if (sortDir === "asc") {
        return valA - valB;
      } else {
        return valB - valA;
      }
    });
  }, [assets, sortField, sortDir]);

  return (
    <Card className="rounded-2xl bg-card dark:bg-muted shadow-primary ring-0 py-4 p-2 gap-2">
      <CardHeader className="flex items-center justify-between px-2  ">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Button variant="ghost" size="icon-sm" aria-label={`${title} menu`}>
          <MoreVertical className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 p-2 rounded-lg bg-muted/40 dark:bg-black">
        <div className="border rounded-md overflow-hidden ">
          <Table>
            <TableHeader className="bg-muted rounded-md">
              <TableRow className="hover:bg-muted rounded-md   ">
                <TableHead className="h-9 text-sm font-medium">Asset</TableHead>
                <TableHead
                  className="h-9 text-sm font-medium cursor-pointer select-none transition-colors hover:text-foreground"
                  onClick={() => handleSort("balance")}
                >
                  <span className="inline-flex items-center gap-1">
                    Balance
                    <ChevronsUpDown
                      className={`size-4 ${sortField === "balance" ? "text-foreground" : "text-muted-foreground"}`}
                    />
                  </span>
                </TableHead>
                <TableHead
                  className="h-9 text-sm font-medium cursor-pointer select-none transition-colors hover:text-foreground"
                  onClick={() => handleSort("value")}
                >
                  <span className="inline-flex items-center gap-1">
                    {valueLabel}
                    <ChevronsUpDown
                      className={`size-4 ${sortField === "value" ? "text-foreground" : "text-muted-foreground"}`}
                    />
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAssets.map((asset) => (
                <TableRow
                  key={asset.asset}
                  className="border-border/70 border-y bg-white dark:bg-black hover:dark:bg-muted"
                >
                  <TableCell className="h-12 bg-transparent">
                    <span className="inline-flex items-center gap-3 font-medium ">
                      <AssetBadge
                        symbol={asset.asset}
                        color={asset.color}
                        size="sm"
                      />
                      {asset.asset}
                    </span>
                  </TableCell>
                  <TableCell className="h-12 font-medium">
                    {asset.balance}
                  </TableCell>
                  <TableCell className="h-12 font-medium">
                    {asset.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          variant="outline"
          className="mt-4 h-9 w-full bg-muted dark:bg-muted font-normal"
        >
          {action}
          {external ? (
            <ArrowRight className="size-4" />
          ) : (
            <Plus className="size-4" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
