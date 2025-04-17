
import React from "react";
import { PERMISSION } from "../utils/constants";

export const routeMap = [
  {
    label: '',
    menu : true,
    routes: [
      {
        label: 'Tổng quan',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 19.5" width="19.5" height="19.5">
            <g fill="currentColor">
              <path className="fa-primary"
                d="M8.531 3.047c0 -1.009 -0.819 -1.828 -1.828 -1.828H3.047c-1.009 0 -1.828 0.819 -1.828 1.828v3.656c0 1.009 0.819 1.828 1.828 1.828h3.656c1.009 0 1.828 -0.819 1.828 -1.828V3.047zm9.75 9.75c0 -1.009 -0.819 -1.828 -1.828 -1.828h-3.656c-1.009 0 -1.828 0.819 -1.828 1.828v3.656c0 1.009 0.819 1.828 1.828 1.828h3.656c1.009 0 1.828 -0.819 1.828 -1.828v-3.656z" />
            </g>
            <path className="fa-secondary"
              fill="currentColor"
              d="M18.281 2.742c0 -0.842 -0.682 -1.523 -1.523 -1.523H12.492c-0.842 0 -1.523 0.682 -1.523 1.523v4.266c0 0.842 0.682 1.523 1.523 1.523h4.266c0.842 0 1.523 -0.682 1.523 -1.523V2.742zM8.531 12.492c0 -0.842 -0.682 -1.523 -1.523 -1.523H2.742c-0.842 0 -1.523 0.682 -1.523 1.523v4.266c0 0.842 0.682 1.523 1.523 1.523h4.266c0.842 0 1.523 -0.682 1.523 -1.523V12.492z" />
          </svg>
        ),
        path: '/admin',
        routeActive: ['/admin'],
      },
    ]
  },
  {
    label: 'Hệ thống',
    menu: true,
    permissions: [PERMISSION.LIST_ROLE],
    routes: [
      {
        label: 'Quản lý vai trò',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="15">
            <path
              className="fa-primary"
              fill="currentColor"
              d="M208 80c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H256c-26.5 0-48-21.5-48-48V80zM48 320h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48zm208 0h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H256c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48zm208 0h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H464c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48z"
            />
            <path
              className="fa-secondary"
              fill="currentColor"
              d="M264 280v40h48V280H464c4.4 0 8 3.6 8 8v32h48V288c0-30.9-25.1-56-56-56H312V192H264v40H112c-30.9 0-56 25.1-56 56v32h48V288c0-4.4 3.6-8 8-8H264z"
            />
          </svg>
        ),
        path: '/admin/role-management',
        routeActive: ['/admin/role-management'],
      },
    ]
  },
]
