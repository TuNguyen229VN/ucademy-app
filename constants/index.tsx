import {
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconStudy,
  IconUser,
} from "@/components/icons";
import { ECourseLevel, ECourseStatus } from "@/types/enums";
import { ReactNode } from "react";

export const menuItems: {
  url: string;
  title: string;
  icon: ReactNode;
}[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconPlay className="size-5" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconStudy className="size-5" />,
  },
  {
    url: "/manage/courses",
    title: "Quản lý khóa học",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/members",
    title: "Quản lý thành viên",
    icon: <IconUser className="size-5" />,
  },
  {
    url: "/manage/orders",
    title: "Quản lý đơn hàng",
    icon: <IconOrder className="size-5" />,
  },
  {
    url: "/manage/comments",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-5" />,
  },
];

export const courseStatus: {
  label: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    label: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-500/10",
  },
  {
    label: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500/10",
  },
  {
    label: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500/10",
  },
];

export const courseLevel: {
  label: string;
  value: ECourseLevel;
}[] = [
  {
    label: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    label: "Trung bình",
    value: ECourseLevel.INTERMEDIATE,
  },
  {
    label: "Khó",
    value: ECourseLevel.ADVANCED,
  },
];

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Khó",
};

export const commonClassNames = {
  status:
    "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs inline-block text-center w-25",
  action:
    "size-8 rounded-md border border-gray-200 flex items-center justify-center p-2  text-gray-500 hover:bg-gray-100 dark:bg-transparent borderDarkMode dark:hover:border-gray-200/20",
  paginationButton:
    "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary border-gray-200 dark:border-gray-200/10 dark:hover:border-primary text-gray-500",
};
