import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import ChatWidget from '@/components/chat/chat-widget';
import { ChatProvider } from '@/components/chat/chat-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InsurBuddy - Your AI Insurance Companion',
  description: 'Get personalized insurance advice, compare plans, file claims, and manage your policies with AI assistance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <ChatWidget />
              <Toaster />
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}