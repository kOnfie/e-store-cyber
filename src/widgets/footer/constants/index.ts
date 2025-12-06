export const FOOTER_DATA = {
  description:
    'We are a residential interior design firm located in Portland. Our boutique-studio offers more than',
  services: {
    title: 'Services',
    links: [
      { name: 'Bonus program', href: '/bonus' },
      { name: 'Gift cards', href: '/gift-cards' },
      { name: 'Credit and payment', href: '/credit' },
      { name: 'Service contracts', href: '/contracts' },
      { name: 'Non-cash account', href: '/account' },
      { name: 'Payment', href: '/payment' },
    ],
  },
  assistance: {
    title: 'Assistance to the buyer',
    links: [
      { name: 'Find an order', href: '/find-order' },
      { name: 'Terms of delivery', href: '/delivery' },
      { name: 'Exchange and return of goods', href: '/returns' },
      { name: 'Guarantee', href: '/guarantee' },
      { name: 'Frequently asked questions', href: '/faq' },
      { name: 'Terms of use of the site', href: '/terms' },
    ],
  },
  socialMedia: [
    { name: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
    { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
    { name: 'TikTok', icon: 'tiktok', href: 'https://tiktok.com' },
    { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com' },
  ],
} as const;
