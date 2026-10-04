import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://amhstrafficlab.github.io'),
  title: 'AMHSTrafficLab — Industrial Benchmark for Intelligent Material Flow',
  description:
    'A shared benchmark platform for developing and evaluating routing and regional flow-control methods in realistic AMHS traffic.',
  openGraph: {
    title: 'AMHSTrafficLab — Industrial Benchmark for Intelligent Material Flow',
    description:
      'Develop and evaluate routing and regional flow-control methods across realistic, multi-scale AMHS traffic environments.',
    type: 'website',
    images: [{ url: '/og.png', width: 1734, height: 907, alt: 'AMHSTrafficLab rail-network benchmark' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMHSTrafficLab — Industrial Benchmark for Intelligent Material Flow',
    description:
      'Develop and evaluate routing and regional flow-control methods across realistic, multi-scale AMHS traffic environments.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
