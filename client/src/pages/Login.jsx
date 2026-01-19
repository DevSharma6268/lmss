import { AppWindowIcon, CodeIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  //define staes for signup and login inputs
  const [signupInput, setSignupInput] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });

  //function to handle signup input change
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };


  //function to handle registration form submission
  const handleRegistration =(type)=>{
    const inputData = type === "signup" ? signupInput : loginInput;

    console.log(inputData)
    
  }



  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="signup">
          <TabsList>
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you are done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e)=>changeInputHandler(e,"signup")}
                    placeholder="eg. Dev"
                    required="true"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e)=>changeInputHandler(e,"signup")}
                    placeholder="@gmail.com"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">password</Label>
                  <Input
                    onChange={(e)=>changeInputHandler(e,"signup")}
                    name="password"
                    value={signupInput.password}
                    type="password"
                    placeholder="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>handleRegistration("signup")} >Signup</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>login</CardTitle>
                <CardDescription>
                  Login your password here. After signup,you'll be logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="current">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e)=>changeInputHandler(e,"login")}
                    placeholder="@gmail.com"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e)=>changeInputHandler(e,"login")}
                    placeholder="password"
                    required="true"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>handleRegistration("login")}>login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
