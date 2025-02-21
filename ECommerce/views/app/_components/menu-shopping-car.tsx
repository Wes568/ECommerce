"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuth } from "../_contexts/auth-context";

const MenuShoppingCar = () => {
  const { products } = useAuth();
  return (
    <div className="flex items-center">
      <Sheet>
        <SheetTrigger>
          <ShoppingCartIcon className="relative" size={25} />
          <Badge className="absolute text-xs top-[95px] lg:top-1/4 text-white">
            {products.length}
          </Badge>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuShoppingCar;
