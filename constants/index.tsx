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
}[] = [
  {
    label: "Đã duyệt",
    value: ECourseStatus.APPROVED,
  },
  {
    label: "Chờ duyệt",
    value: ECourseStatus.PENDING,
  },
  {
    label: "Từ chối",
    value: ECourseStatus.REJECTED,
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
