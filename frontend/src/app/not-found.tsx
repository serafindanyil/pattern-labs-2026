"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/ui/card";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <p className="text-muted-foreground text-sm font-medium">404</p>
          <CardTitle>Сторінку не знайдено</CardTitle>
          <CardDescription>
            Сторінка, яку ви шукаєте, не існує або була переміщена.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Button asChild className="sm:flex-1">
            <Link href="/">На головну</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="sm:flex-1 flex items-center justify-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-4" />
            Назад
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
