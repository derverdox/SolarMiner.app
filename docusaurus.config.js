const config = {
  title: 'Solar Miner App',
  tagline: 'Stop wasting solar energy. Start mining smarter.',
  url: 'https://docs.solarminer.app',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'derverdox',
  projectName: 'solar-miner-docs',

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Lädt die Docs direkt auf der Hauptseite
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false, // Wir brauchen keinen Blog
        theme: {
          //customCss: [], // Keine extra CSS-Datei nötig für den Start
        },
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
      title: 'Solar Miner Docs',
      items: [
        {
          href: 'https://solarminer.app',
          label: 'Back to Website',
          position: 'right',
        },
      ],
    },
  },
};

export default config;
