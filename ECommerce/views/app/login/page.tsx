"use client";

import Image from "next/image";
import React from "react";
import banner from "../../public/images/banner-login.jpg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";

const Login = () => {
  return (
    <section className="mt-10 px-6">
      <div className="grid grid-cols-2 h-screen">
        <div className="h-[90vh]">
          <Image
            src={banner}
            alt="Banner Login"
            className="h-full w-full object-fit rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Login;
