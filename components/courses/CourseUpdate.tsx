"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { ECourseLevel, ECourseStatus } from "@/types/enums";
import { InputGroupTextarea } from "../ui/input-group";
import { updateCourse } from "@/lib/actions/course.actions";
import { ICourse } from "@/database/course.model";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional()
    .or(z.literal("")),
  price: z
    .number({
      error: "Vui lòng nhập số",
    })
    .int("Phải là số nguyên")
    .positive("Giá phải lớn hơn 0")
    .optional(),
  sale_price: z
    .number({
      error: "Vui lòng nhập số",
    })
    .int("Phải là số nguyên")
    .positive("Giá phải lớn hơn 0")
    .optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  views: z
    .number({
      error: "Vui lòng nhập số",
    })
    .int("Phải là số nguyên")
    .optional(),
  status: z
    .enum([
      ECourseStatus.APPROVED,
      ECourseStatus.PENDING,
      ECourseStatus.REJECTED,
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
      ECourseLevel.ADVANCED,
    ])
    .optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
  }),
});

const CourseUpdate = ({ data }: { data: ICourse }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      price: data.price,
      sale_price: data.sale_price,
      intro_url: data.intro_url,
      desc: data.desc,
      image: data.image,
      status: data.status,
      level: data.level,
      info: {
        requirements: [],
        benefits: [],
        qa: [{ question: "", answer: "" }],
      },
      views: data.views,
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await updateCourse({
        slug: data.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          intro_url: values.intro_url,
          desc: values.desc,
          views: values.views,
        },
      });

      if (values.slug) {
        router.replace(`/manage/courses/update?slug=${values.slug}`);
      }
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
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
                // onChange={(e) => {
                //   isSlugEditedManually.current = true;
                //   field.onChange(e);
                // }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-price">Giá khuyến mãi</FieldLabel>
              <Input
                {...field}
                id="form-rhf-price"
                placeholder="599.000"
                type="number"
                aria-invalid={fieldState.invalid}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="sale_price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-sale_price">Giá gốc</FieldLabel>
              <Input
                {...field}
                id="form-rhf-sale_price"
                placeholder="999.000"
                type="number"
                aria-invalid={fieldState.invalid}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="desc"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-desc">Mô tả khóa học</FieldLabel>
              <InputGroupTextarea
                {...field}
                id="form-rhf-desc"
                placeholder="Nhập mô tả..."
                aria-invalid={fieldState.invalid}
                className="h-50"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-image">Ảnh đại diện</FieldLabel>
              <div
                id="form-rhf-image"
                className="h-50 bg-white rounded-md border border-gray-200"
              ></div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="intro_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-intro_url">Youtube URL</FieldLabel>
              <Input
                {...field}
                id="form-rhf-intro_url"
                placeholder="https://youtube.com/axfgdr"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="views"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-views">Lượt xem</FieldLabel>
              <Input
                {...field}
                id="form-rhf-views"
                placeholder="1000"
                aria-invalid={fieldState.invalid}
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-status">Trạng thái</FieldLabel>
              <Input
                {...field}
                id="form-rhf-status"
                placeholder=""
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="level"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-level">Trình độ</FieldLabel>
              <Input
                {...field}
                id="form-rhf-level"
                placeholder=""
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="info.requirements"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-info.requirements">
                Yêu cầu
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-info.requirements"
                placeholder=""
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="info.benefits"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-info.benefits">Lợi ích</FieldLabel>
              <Input
                {...field}
                id="form-rhf-info.benefits"
                placeholder=""
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="info.qa"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-info.qa">
                Question/Answer
              </FieldLabel>
              {/* <Input
                {...field}
                id="form-rhf-info.qa"
                placeholder="1000"
                aria-invalid={fieldState.invalid}
                type="number"
              /> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        isLoading={isSubmitting}
        type="submit"
        form="form-rhf-demo"
        className="w-37.5 dark:text-white"
        disabled={isSubmitting}
      >
        Cập nhật khóa học
      </Button>
    </form>
  );
};

export default CourseUpdate;
