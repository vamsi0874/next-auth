"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <CardHeader className="mb-4 text-center">
        <Header label={headerLabel} />
      </CardHeader>
      
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      
      <CardFooter className="mt-6 flex justify-center">
        {showSocial ? <Social /> : null}
      </CardFooter>
      
      <CardFooter className="mt-4 flex justify-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

