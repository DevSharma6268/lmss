import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
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
import { useLoginMutation,useRegisterMutation } from "@/features/api/authApi";
import { toast } from "sonner";

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


  const [registerUser,{data:registerData,isLoading:registerLoading,isSuccess:registerIsSuccess, error:registerError}]=useRegisterMutation();
  const [loginUser,{data:loginData,isLoading:loginLoading,isSuccess:loginIsSuccess, error:loginError}]=useLoginMutation();
  

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
  const handleRegistration =async (type)=>{
    const inputData = type === "signup" ? signupInput : loginInput;

    const action = type === "signup" ? registerUser : loginUser;
    const result = await action(inputData);
    
    
  }


  useEffect(()=>{
     if(registerIsSuccess && registerData){
      toast.success(registerData.message || "User registered successfully")
     }

      if(loginIsSuccess && loginData){
        toast.success(loginData.message || "User logged in successfully")
      }

      if(registerError){
        toast.error(registerError.data.message || "Something went wrong")
      }

      if(loginError){
        toast.error(loginError.data.message || "Something went wrong")
      }
  },[
    registerData,
    loginData,
    registerLoading,
    loginLoading,
    registerError,
    loginError
  ])



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
                    required={true}
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
                <Button disabled={registerLoading} onClick={()=>handleRegistration("signup")} >
                  {
                    registerLoading ?
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                    </>
                    :
                    "Signup"
                  }
                </Button>
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
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={loginLoading} onClick={()=>handleRegistration("login")}>
                  {
                    loginLoading ?
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                    </>
                    :
                    "Login"
                  }
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
