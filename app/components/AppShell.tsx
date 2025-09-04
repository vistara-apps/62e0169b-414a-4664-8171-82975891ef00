'use client';

import { ReactNode } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { address } = useAccount();

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-screen-sm mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
              <span className="font-semibold text-white">ChronoFilter</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {address ? (
                <Identity address={address} className="text-white" />
              ) : (
                <ConnectWallet className="btn-primary" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>
    </div>
  );
}
