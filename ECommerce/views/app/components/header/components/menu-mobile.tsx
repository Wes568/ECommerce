"use client";

import React from "react";
import { submenu } from "../constants";
import Link from "next/link";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { SearchIcon } from "lucide-react";
import LoginForm from "./login-form";
import MenuShoppingCar from "../../menu-shopping-car";

const MenuMobile = () => {
  return (
    <section className="mt-10">
      <div className="flex items-center flex-row">
        <div className="flex gap-2">
          <Input className="w-auto" placeholder="Faça sua busca"></Input>
          <Button>
            <SearchIcon color="white" />
          </Button>
        </div>
      </div>
      <div className="flex items-center mt-2 mb-10 gap-5">
        <LoginForm />
        <MenuShoppingCar />
      </div>
      <div className="flex flex-col items-center">
        {submenu.map((item) => (
          <Link className="text-sm py-2" key={item.name} href={item.path}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MenuMobile;
