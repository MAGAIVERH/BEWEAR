import Header from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignInUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main
        id="main-content"
        className="flex flex-1 items-start justify-center px-5 py-12"
      >
        <div className="w-full max-w-md">
          <Tabs defaultValue="sign-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign in</TabsTrigger>
              <TabsTrigger value="sign-up">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up">
              <SignInUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Authentication;
