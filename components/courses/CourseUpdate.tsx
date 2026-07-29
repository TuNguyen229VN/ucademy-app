"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Fragment, useEffect, useState } from "react";
import { ECourseLevel, ECourseStatus } from "@/types/enums";
import { InputGroupTextarea } from "../ui/input-group";
import { updateCourse } from "@/lib/actions/course.actions";
import { ICourse } from "@/database/course.model";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { IconAdd, IconDelete } from "../icons";
const formSchema = z
  .object({
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
      requirements: z
        .array(z.string().trim().min(1, "Yêu cầu không được để trống"))
        .optional(),
      benefits: z
        .array(z.string().trim().min(1, "Lợi ích không được để trống"))
        .optional(),
      qa: z
        .array(
          z.object({
            question: z.string().trim().min(1, "Câu hỏi không được để trống"),
            answer: z.string().trim().min(1, "Câu trả lời không được để trống"),
          }),
        )
        .optional(),
    }),
  })
  .superRefine((values, ctx) => {
    if (
      values.price !== undefined &&
      values.sale_price !== undefined &&
      values.sale_price <= values.price
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Giá gốc phải lớn hơn giá khuyến mãi",
        path: ["sale_price"],
      });
    }
  });

const CourseUpdate = ({ data }: { data: ICourse }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: data.info.requirements,
    benefits: data.info.benefits,
    qa: data.info.qa,
  });

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
        requirements: data.info.requirements,
        benefits: data.info.benefits,
        qa: data.info.qa,
      },
      views: data.views,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    form.setValue("info.requirements", courseInfo.requirements, {
      shouldValidate: false,
    });
    form.setValue("info.benefits", courseInfo.benefits, {
      shouldValidate: false,
    });
    form.setValue("info.qa", courseInfo.qa, {
      shouldValidate: false,
    });
  }, [courseInfo]);
  const { errors } = form.formState;

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
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
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
          render={({ fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor="form-rhf-info.requirements"
                className="flex items-center justify-between gap-5"
              >
                Yêu cầu
                <button
                  type="button"
                  className="text-primary"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.requirements.push("");
                    });
                  }}
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>

              <>
                {courseInfo.requirements.map((r, index) => (
                  <Field
                    key={index}
                    data-invalid={!!errors.info?.requirements?.[index]}
                  >
                    <div className="relative">
                      <Input
                        placeholder={`Yêu cầu số ${index + 1}`}
                        aria-invalid={!!errors.info?.requirements?.[index]}
                        value={r}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.requirements[index] = e.target.value;
                          });
                        }}
                        onBlur={() =>
                          form.trigger(`info.requirements.${index}`)
                        }
                      />
                      <button
                        type="button"
                        className="text-red-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          setCourseInfo((draft) => {
                            draft.requirements.splice(index, 1);
                          });
                        }}
                      >
                        <IconDelete className="size-5" />
                      </button>
                    </div>
                    {errors.info?.requirements?.[index] && (
                      <FieldError
                        errors={[errors.info?.requirements?.[index]]}
                      />
                    )}
                  </Field>
                ))}
              </>
            </Field>
          )}
        />
        <Controller
          name="info.benefits"
          control={form.control}
          render={({ fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor="form-rhf-info.benefits"
                className="flex items-center justify-between gap-5"
              >
                Lợi ích
                <button
                  type="button"
                  className="text-primary"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.benefits.push("");
                    });
                  }}
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              <>
                {courseInfo.benefits.map((r, index) => (
                  <Field
                    key={index}
                    data-invalid={!!errors.info?.benefits?.[index]}
                  >
                    <div className="relative">
                      <Input
                        placeholder={`Lợi ích số ${index + 1}`}
                        aria-invalid={!!errors.info?.benefits?.[index]}
                        value={r}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.benefits[index] = e.target.value;
                          });
                        }}
                        onBlur={() => form.trigger(`info.benefits.${index}`)}
                      />
                      <button
                        type="button"
                        className="text-red-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          setCourseInfo((draft) => {
                            draft.benefits.splice(index, 1);
                          });
                        }}
                      >
                        <IconDelete className="size-5" />
                      </button>
                    </div>
                    {errors.info?.benefits?.[index] && (
                      <FieldError errors={[errors.info?.benefits?.[index]]} />
                    )}
                  </Field>
                ))}
              </>
            </Field>
          )}
        />
        <Controller
          name="info.qa"
          control={form.control}
          render={({ fieldState }) => (
            <Field className="col-start-1 col-end-3">
              <FieldLabel htmlFor="form-rhf-info.qa">
                Question/Answer
                <button
                  type="button"
                  className="text-primary"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.qa.push({
                        question: "",
                        answer: "",
                      });
                    });
                  }}
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              <>
                {courseInfo.qa.map((item, index) => (
                  <div className="grid grid-cols-2 gap-5 relative" key={index}>
                    <Field data-invalid={!!errors.info?.qa?.[index]?.question}>
                      <Input
                        placeholder={`Câu hỏi số ${index + 1}`}
                        aria-invalid={!!errors.info?.qa?.[index]?.question}
                        value={item.question}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.qa[index].question = e.target.value;
                          });
                        }}
                        onBlur={() => form.trigger(`info.qa.${index}.question`)}
                      />
                      {errors.info?.qa?.[index]?.question && (
                        <FieldError
                          errors={[errors.info?.qa?.[index]?.question]}
                        />
                      )}
                    </Field>
                    <Field data-invalid={!!errors.info?.qa?.[index]?.answer}>
                      <Input
                        placeholder={`Câu trả lời số ${index + 1}`}
                        aria-invalid={!!errors.info?.qa?.[index]?.answer}
                        value={item.answer}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.qa[index].answer = e.target.value;
                          });
                        }}
                        onBlur={() => form.trigger(`info.qa.${index}.answer`)}
                      />
                      {errors.info?.qa?.[index]?.answer && (
                        <FieldError
                          errors={[errors.info?.qa?.[index]?.answer]}
                        />
                      )}
                    </Field>
                    <button
                      type="button"
                      className="text-red-400 absolute right-2 top-2 cursor-pointer"
                      onClick={() => {
                        setCourseInfo((draft) => {
                          draft.qa.splice(index, 1);
                        });
                      }}
                    >
                      <IconDelete className="size-5" />
                    </button>
                  </div>
                ))}
              </>
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
