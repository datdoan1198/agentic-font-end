import Link from "@/assets/images/icons/solid/link.svg";
import Message from "@/assets/images/icons/solid/messages.svg";
import Puzzle from "@/assets/images/icons/solid/globe.svg";
import Chart from "@/assets/images/icons/solid/chart-simple.svg";
import Customize from "@/assets/images/icons/solid/customize.svg"
import File from "@/assets/images/icons/solid/file.svg"
import Code from "@/assets/images/icons/solid/code.svg"

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
                path: `/bots/${botIdSelected}/links`,
                routeActive: [`/bots/${botIdSelected}/links`],
            },
            {
                label: "Tài liệu",
                icon: File,
                path: `/bots/${botIdSelected}/files`,
                routeActive: [`/bots/${botIdSelected}/files`],
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
            {
                label: "Tùy chỉnh",
                icon: Customize,
                path: `/bots/${botIdSelected}/customize`,
                routeActive: [`/bots/${botIdSelected}/customize`],
            },
            {
                label: "Nhúng",
                icon: Code,
                path: `/bots/${botIdSelected}/embed`,
                routeActive: [`/bots/${botIdSelected}/embed`],
            },
        ],
    },
];
