"use client";

import * as React from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  type CourseWithSpecializationDto,
  type CreateCourseDto,
  useCourseControllerCreateMutation,
  useCourseControllerFindAllQuery,
  useCourseControllerRemoveMutation,
  useCourseControllerUpdateMutation,
  useSpecializationControllerFindAllQuery,
} from "@/shared/api/generated-api";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Textarea } from "@/shared/ui/textarea";

const EMPTY_FORM: CreateCourseDto = {
  title: "",
  description: "",
  specializationId: null,
};

const WITHOUT_SPECIALIZATION = "without-specialization";
const SUCCESS_CREATE_MESSAGE = "Курс створено";
const SUCCESS_UPDATE_MESSAGE = "Курс оновлено";
const SUCCESS_DELETE_MESSAGE = "Курс видалено";
const ERROR_MESSAGE = "Не вдалося виконати дію";

type DialogState =
  | { mode: "create"; item: null }
  | { mode: "edit"; item: CourseWithSpecializationDto };

const getFormFromItem = (item: CourseWithSpecializationDto | null): CreateCourseDto =>
  item
    ? {
        title: item.title,
        description: item.description,
        specializationId:
          typeof item.specializationId === "string" ? item.specializationId : null,
      }
    : EMPTY_FORM;

export function CoursesPage() {
  const { data = [], isLoading, refetch } = useCourseControllerFindAllQuery();
  const { data: specializations = [] } = useSpecializationControllerFindAllQuery();
  const [createCourse, createState] = useCourseControllerCreateMutation();
  const [updateCourse, updateState] = useCourseControllerUpdateMutation();
  const [removeCourse, removeState] = useCourseControllerRemoveMutation();
  const [dialogState, setDialogState] = React.useState<DialogState | null>(null);
  const [form, setForm] = React.useState<CreateCourseDto>(EMPTY_FORM);

  const isSubmitting = createState.isLoading || updateState.isLoading;
  const isDialogOpen = Boolean(dialogState);

  const openCreateDialog = () => {
    setDialogState({ mode: "create", item: null });
    setForm(EMPTY_FORM);
  };

  const openEditDialog = (item: CourseWithSpecializationDto) => {
    setDialogState({ mode: "edit", item });
    setForm(getFormFromItem(item));
  };

  const closeDialog = () => {
    setDialogState(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dialogState) {
      return;
    }

    try {
      if (dialogState.mode === "create") {
        await createCourse({ createCourseDto: form }).unwrap();
        toast.success(SUCCESS_CREATE_MESSAGE);
      } else {
        await updateCourse({
          id: dialogState.item.id,
          updateCourseDto: form,
        }).unwrap();
        toast.success(SUCCESS_UPDATE_MESSAGE);
      }

      closeDialog();
      await refetch();
    } catch {
      toast.error(ERROR_MESSAGE);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeCourse({ id }).unwrap();
      toast.success(SUCCESS_DELETE_MESSAGE);
      await refetch();
    } catch {
      toast.error(ERROR_MESSAGE);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Курси</h1>
          <p className="text-muted-foreground text-sm">
            Курси, що входять до навчальних спеціалізацій.
          </p>
        </div>
        <Button type="button" onClick={openCreateDialog}>
          <Plus />
          Додати
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead>Опис</TableHead>
              <TableHead>Спеціалізація</TableHead>
              <TableHead className="w-28 text-right">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>Завантаження...</TableCell>
              </TableRow>
            ) : null}
            {!isLoading && data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>Дані відсутні</TableCell>
              </TableRow>
            ) : null}
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="whitespace-normal">{item.description}</TableCell>
                <TableCell>{item.specialization?.title ?? "Без спеціалізації"}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit />
                      <span className="sr-only">Редагувати</span>
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      disabled={removeState.isLoading}
                      onClick={() => void handleDelete(item.id)}
                    >
                      <Trash2 />
                      <span className="sr-only">Видалити</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <form className="grid gap-4" onSubmit={(event) => void handleSubmit(event)}>
            <DialogHeader>
              <DialogTitle>
                {dialogState?.mode === "edit" ? "Редагувати курс" : "Новий курс"}
              </DialogTitle>
              <DialogDescription>
                Вкажіть навчальний курс та його належність до спеціалізації.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Label htmlFor="course-title">Назва</Label>
              <Input
                id="course-title"
                value={form.title}
                onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course-description">Опис</Label>
              <Textarea
                id="course-description"
                value={form.description}
                onChange={(event) =>
                  setForm((value) => ({ ...value, description: event.target.value }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Спеціалізація</Label>
              <Select
                value={form.specializationId ?? WITHOUT_SPECIALIZATION}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    specializationId: value === WITHOUT_SPECIALIZATION ? null : value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={WITHOUT_SPECIALIZATION}>Без спеціалізації</SelectItem>
                  {specializations.map((specialization) => (
                    <SelectItem key={specialization.id} value={specialization.id}>
                      {specialization.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Скасувати
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Зберегти
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
