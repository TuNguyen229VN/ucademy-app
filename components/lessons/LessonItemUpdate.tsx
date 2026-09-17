"use client";

import { ILesson } from "@/database/lesson.model";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { editorOptions } from "@/constants";
import type { Editor as TinyMCEEditor } from "tinymce";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z
    .number({
      error: "Vui lòng nhập số",
    })
    .int("Phải là số nguyên")
    .positive("Thời lượng phải lớn hơn 0")
    .optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id.toString(),
        updateData: values,
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  const { theme } = useTheme();
  return (
    <div>
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FieldGroup className="grid grid-cols-2 gap-8">
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-slug">Đường dẫn *</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-slug"
                  aria-invalid={fieldState.invalid}
                  placeholder="bai-1-tong-quan"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-duration">
                  Thời lượng *
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-duration"
                  aria-invalid={fieldState.invalid}
                  placeholder="120"
                  autoComplete="off"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="video_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-video_url">
                  URL Video *
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-video_url"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://example.com/video"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div></div>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-start-1 col-end-3"
              >
                <FieldLabel htmlFor="form-rhf-content">Nội dung *</FieldLabel>
                {/* <Input
                  {...field}
                  id="form-rhf-content"
                  aria-invalid={fieldState.invalid}
                  placeholder="Nội dung bài học"
                  autoComplete="off"
                /> */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                  onInit={(_evt, editor) => {
                    (editorRef.current = editor).setContent(
                      lesson.content || "",
                    );
                  }}
                  value={field.value}
                  {...editorOptions(field, theme)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end gap-5 items-center mt-8">
          <Button type="submit">Cập nhật</Button>
          <Link href="/" className="text-sm text-slate-600">
            Xem trước
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LessonItemUpdate;
