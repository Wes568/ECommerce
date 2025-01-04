"use client";

import Image from "next/image";
import { useState } from "react";
import { AlignJustify, SearchIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import MenuShoppingCar from "../menu-shopping-car";
import { submenu } from "./_constants";
import Link from "next/link";
import logo from "../../../public/images/logo-temp.jpg";
import LoginForm from "./_components/login-form";
import MenuMobile from "./_components/menu-mobile";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="top-0 fixed w-full">
      <div className="bg-glass backdrop-blur-glass p-4 border-y border-gray-300/20 lg:px-0">
        <div className="container">
          <nav className="flex flex-col justify-between w-100 lg:items-center lg:flex-row">
            <div className="flex justify-between items-center lg:justify-normal lg:items-start">
              <Image src={logo} alt="Logo do Ecommerce" width={150}></Image>
              {!open ? (
                <AlignJustify
                  className="lg:hidden"
                  onClick={() => setOpen(!open)}
                />
              ) : (
                <X onClick={() => setOpen(!open)} />
              )}
            </div>
            <div className="hidden lg:flex lg:items-center lg:flex-row">
              <div className="flex gap-2">
                <Input
                  className="w-[400px]"
                  placeholder="Faça sua busca"
                ></Input>
                <Button>
                  <SearchIcon color="white" />
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex lg:items-center lg:gap-5">
              <LoginForm />
              <MenuShoppingCar />
            </div>
          </nav>
        </div>
      </div>
      <div className="hidden lg:flex lg:bg-primary">
        <div className="flex container p-2 justify-between items-center">
          {submenu.map((item) => (
            <Link className="text-sm" key={item.name} href={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        } flex h-screen md:h-0 bg-glass backdrop-blur-glass z-10 flex-col items-center transition-all duration-300 ease-in-out`}
      >
        <MenuMobile />
      </div>
    </section>
  );
};

export default Header;
