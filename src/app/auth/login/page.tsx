"use client";

import { z } from "zod";
import Link from "next/link";
import { AxiosError } from "axios";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import AuthNav from "../_components/auth-nav";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { useAuth } from "@/_core/contexts/auth.context";
import { Button } from "@/_core/components/fragments/button";
import { ResponseUtil } from "@/_shared/utils/response.util";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import { Separator } from "@/_core/components/fragments/separator";

const formSchema = z.object({
  email: z.string().min(1, "Required field"),
  password: z.string().min(1, "Required field"),
});

interface IFormData extends z.infer<typeof formSchema> {}

export default function LoginPage() {
  const router = useRouter();
  const _authContext = useAuth();

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: IFormData) {
    _authContext
      .signIn(values.email, values.password)
      .then(() => {
        router.push("/main/home");
        ToastUtil.success("Sign in successful");
      })
      .catch((error: AxiosError) => ResponseUtil.handleError(error));
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <AuthNav
        Icon={LogIn}
        title="Sign in with email"
        description="Make a new doc to bring your words, data, and teams together."
      />

      <Separator className="my-4 bg-foreground/10" />

      <FormContainer {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <AppFormInput
            name="email"
            type="email"
            control={form.control}
            placeholder="Insert your e-mail"
          />

          <AppFormInput
            name="password"
            type="password"
            control={form.control}
            placeholder="**********"
          />

          <Button type="submit" className="w-full">
            Get started
          </Button>
        </form>
      </FormContainer>

      <Link href="/auth/register"></Link>
    </section>
  );
}
