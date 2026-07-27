"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { createCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.model";

const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional()
    .or(z.literal("")),
});

function CourseAddNew({ user }: { user: IUser }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
    mode: "onSubmit",
  });

  const isSlugEditedManually = useRef(false);

  const titleValue = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    if (isSlugEditedManually.current) return; // user đã tự nhập slug -> không auto ghi đè nữa
    const newSlug = titleValue
      ? slugify(titleValue, { lower: true, locale: "vi", trim: true })
      : "";
    form.setValue("slug", newSlug, { shouldValidate: false });
  }, [titleValue, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: "vi",
          }),
        author: user._id,
      };
      const res = await createCourse(data);
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }
      if (res?.success) {
        toast.success("Tạo khóa học thành công");
      }
      if (res?.data) {
        router.push(`/manage/courses/update?slug=${res.data.slug}`);
      }
    } catch (error) {
      toast.error("Tạo khóa học thất bại");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <FieldGroup className="grid grid-cols-2 gap-8 mt-10 mb-6">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-title">Tên khóa học *</FieldLabel>
              <Input
                {...field}
                id="form-rhf-title"
                aria-invalid={fieldState.invalid}
                placeholder="Tên khóa học"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-slug">
                Đường dẫn khóa học
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-slug"
                placeholder="khoa-hoc-lap-trinh"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  isSlugEditedManually.current = true;
                  field.onChange(e);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        isLoading={isSubmitting}
        type="submit"
        form="form-rhf-demo"
        className="w-30 dark:text-white"
        disabled={isSubmitting}
      >
        Tạo khóa học
      </Button>
    </form>
  );
}

export default CourseAddNew;
