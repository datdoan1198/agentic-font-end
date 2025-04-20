import Link from "@/assets/images/icons/solid/link.svg";
import Message from "@/assets/images/icons/solid/messages.svg";
import Puzzle from "@/assets/images/icons/solid/globe.svg";
import Chart from "@/assets/images/icons/solid/chart-simple.svg";

export const routeBotMap = (botIdSelected) => [
  {
    label: "Chung",
    menu: true,
    routes: [
      {
        label: "Dashboard",
        icon: Chart,
        path: `/bot-chats/${botIdSelected}`,
        routeActive: [`/bot-chats/${botIdSelected}`],
      },
      {
        label: 'Hội thoại',
        icon: Message,
        path: `/bot-chats/${botIdSelected}/conversation`,
        routeActive: [`/bot-chats/${botIdSelected}/conversation`],
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
        icon: Puzzle,
        path: `/bot-chats/${botIdSelected}/integration`,
        routeActive: [`/bot-chats/${botIdSelected}/integration`],
      },
    ],
  },
];
