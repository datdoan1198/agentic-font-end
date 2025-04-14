import Robot from "@/assets/images/icons/solid/robot.svg";

export const routeBotMap = (botIdSelected) => [
    {
        label: 'Chung',
        menu : true,
        routes: [
            {
                label: 'Dashboard',
                icon: Robot,
                path: `/bot-chats/${botIdSelected}`,
                routeActive: [`/bot-chats/${botIdSelected}`],
            },
        ]
    },
    {
        label: 'Cài đặt',
        menu : true,
        routes: [
            {
                label: 'Tích hợp',
                icon: Robot,
                path: `/bot-chats/${botIdSelected}/integration`,
                routeActive: [`/bot-chats/${botIdSelected}/integration`],
            },
        ]
    },
]
