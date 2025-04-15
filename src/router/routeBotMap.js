import Robot from "@/assets/images/icons/solid/robot.svg";
import Link from "@/assets/images/icons/solid/link.svg";

export const routeBotMap = (botIdSelected) => [
  {
    label: "Chung",
    menu: true,
    routes: [
      {
        label: "Dashboard",
        icon: Robot,
        path: `/bot-chats/${botIdSelected}`,
        routeActive: [`/bot-chats/${botIdSelected}`],
      },
    ],
  },
  {
    label: "Nguồn dữ liệu",
    menu: true,
    routes: [
      {
        label: "Links",
        icon: Link,
        path: `/bot-chats/${botIdSelected}/links`,
        routeActive: [`/bot-chats/${botIdSelected}/links`],
      },
    ],
  },
  {
    label: "Cài đặt",
    menu: true,
    routes: [
      {
        label: "Tích hợp",
        icon: Robot,
        path: `/bot-chats/${botIdSelected}/integration`,
        routeActive: [`/bot-chats/${botIdSelected}/integration`],
      },
    ],
  },
];
