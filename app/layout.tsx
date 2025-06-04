"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Vote, Blocks } from "lucide-react";
import { WalletProvider } from "@/context/WalletContext";
import { useWallet } from "@/context/WalletContext";
import {
  ConnectButton,
  ThirdwebProvider,
  useDisconnect,
  useActiveWallet,
} from "thirdweb/react";
import { client } from "./blockchain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

function Navigation() {
  const {
    isConnected,
    isCommissioner,
    registrationActive,
    startRegistration,
    stopRegistration,
    votingActive,
    startVoting,
    stopVoting,
    declareWinner,
    resultDeclared,
  } = useWallet();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();

  // const showToast = () => {
  //   toast("Blockchain Update", {
  //     description: "New block mined: 0x7f2c8d...",
  //     action: {
  //       label: "View",
  //       onClick: (id) => {
  //         toast.dismiss(id);
  //         toast("Transaction details", {
  //           description: "Block explorer opened in a new tab",
  //         });
  //       },
  //     },
  //   });
  // };

  return (
    <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Blocks className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">DVote</span>
          </Link>

          <div className="flex items-center gap-6">
            {isConnected ? (
              <>
                {isCommissioner && !resultDeclared ? (
                  <>
                    {registrationActive ? (
                      <Button onClick={stopRegistration}>
                        Stop Registration
                      </Button>
                    ) : (
                      <Button onClick={startRegistration}>
                        Start Registration
                      </Button>
                    )}
                    {!registrationActive && !votingActive && (
                      <Button onClick={startVoting}>Start Voting</Button>
                    )}
                    {votingActive && (
                      <Button onClick={stopVoting}>Stop Voting</Button>
                    )}
                    {!registrationActive && !votingActive && (
                      <Button onClick={declareWinner}>Declare Winner</Button>
                    )}
                  </>
                ) : (
                  <>
                    {!resultDeclared && (
                      <>
                        <Link
                          href="/register"
                          className="hover:text-primary transition-colors"
                        >
                          Register to Vote
                        </Link>
                        <Link
                          href="/candidates/register"
                          className="hover:text-primary transition-colors"
                        >
                          Run as Candidate
                        </Link>
                        <Link
                          href="/candidates"
                          className="hover:text-primary transition-colors"
                        >
                          View Candidates
                        </Link>
                        <Link
                          href="/vote"
                          className="hover:text-primary transition-colors"
                        >
                          Vote
                        </Link>
                      </>
                    )}
                    <Link
                      href="/profile"
                      className="hover:text-primary transition-colors"
                    >
                      Voter Profile
                    </Link>
                    <Link
                      href="/results"
                      className="hover:text-primary transition-colors"
                    >
                      Results
                    </Link>
                  </>
                )}
                <Button
                  onClick={() => {
                    disconnect(wallet!);
                  }}
                  variant="destructive"
                  className="hover:text-red transition-colors"
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <ConnectButton client={client} />
            )}
          </div>
          {/* <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={showToast}
              className="mr-4 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            {isConnected ? (
              <>
                <div className="hidden md:flex items-center gap-6">
                  <Link
                    href="/register"
                    className="hover:text-primary transition-colors"
                  >
                    Register to Vote
                  </Link>
                  <Link
                    href="/candidates/register"
                    className="hover:text-primary transition-colors"
                  >
                    Run as Candidate
                  </Link>
                  <Link
                    href="/candidates"
                    className="hover:text-primary transition-colors"
                  >
                    View Candidates
                  </Link>
                  <Link
                    href="/vote"
                    className="hover:text-primary transition-colors"
                  >
                    Vote
                  </Link>
                  <Link
                    href="/results"
                    className="hover:text-primary transition-colors"
                  >
                    Results
                  </Link>
                </div>
                <div className="address-badge">
                  <span className="truncate max-w-[100px]">{address}</span>
                </div>
              </>
            ) : (
              <Button onClick={connectWallet} className="blockchain-button">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div> */}
        </div>
      </nav>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider>
            <WalletProvider>
              <Navigation />
              <main className="flex-grow">{children}</main>
              <footer className="border-t mt-auto backdrop-blur-sm bg-background/80">
                <div className="container mx-auto px-6 py-8 text-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center text-center">
                    {/* DVote Branding Section */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Blocks className="h-5 w-5 text-primary" />
                        <span className="font-semibold">BlockVote</span>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        A decentralized voting platform powered by blockchain
                        technology. Secure, transparent, and tamper-proof
                        elections.
                      </p>
                    </div>

                    {/* Network Status Section */}
                    <div className="flex flex-col items-center">
                      <h3 className="font-medium mb-4">Network Status</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Network: Active
                        </p>
                        <p>Latest Block: #14,532,881</p>
                        <p>Gas Price: 25 Gwei</p>
                      </div>
                    </div>

                    {/* Smart Contract Section */}
                    <div className="flex flex-col items-center">
                      <h3 className="font-medium mb-4">Smart Contract</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        DVote Contract Address:
                      </p>
                      <div className="hash-display bg-purple-100 p-2 rounded-md">
                        {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Copyright Section */}
                  <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    © {new Date().getFullYear()} BlockVote. All rights reserved.
                  </div>
                </div>
              </footer>

              <Toaster />
            </WalletProvider>
          </ThirdwebProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
