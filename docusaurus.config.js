const isEnglish = (process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'en') === 'en';

const config = {
  title: isEnglish ? 'SolarMiner Documentation' : 'SolarMiner Dokumentation',
  tagline: isEnglish
    ? 'Set up and understand the Node, PC Agent, and partner portal.'
    : 'Node, PC-Agent und Partnerportal einrichten und verstehen.',
  url: 'https://docs.solarminer.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  organizationName: 'derverdox',
  projectName: 'solar-miner-docs',

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Docs at the root of each locale
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: isEnglish ? 'SolarMiner Documentation' : 'SolarMiner Dokumentation',
      items: [
        {
          href: 'https://solarminer.app',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://portal.solarminer.app',
          label: isEnglish ? 'Partner portal' : 'Partnerportal',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
  },
};

export default config;
