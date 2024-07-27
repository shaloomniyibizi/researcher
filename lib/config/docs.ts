import { MainNavItem, SidebarNavItem } from '@/lib/types/nav';

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  loginNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Projects',
      href: '/docs/projects/accordion',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
    {
      title: 'Login',
      href: '/login',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
      ],
    },
  ],
  loginNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/login',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/login/installation',
          items: [],
        },
        {
          title: 'Theming',
          href: '/docs/login/theming',
          items: [],
        },
      ],
    },
    {
      title: 'Login',
      items: [
        {
          title: 'Area Chart',
          href: '/docs/login/area',
          items: [],
        },
        {
          title: 'Bar Chart',
          href: '/docs/login/bar',
          items: [],
        },
        {
          title: 'Line Chart',
          href: '/docs/login/line',
          items: [],
        },
        {
          title: 'Pie Chart',
          href: '/docs/login/pie',
          items: [],
        },
        {
          title: 'Radar Chart',
          href: '/docs/login/radar',
          items: [],
        },
        {
          title: 'Radial Chart',
          href: '/docs/login/radial',
          items: [],
        },
      ],
    },
    {
      title: 'Projects',
      items: [
        {
          title: 'Tooltip',
          href: '/docs/login/tooltip',
          items: [],
        },
        {
          title: 'Legend',
          href: '/docs/login/legend',
          items: [],
        },
      ],
    },
  ],
};
