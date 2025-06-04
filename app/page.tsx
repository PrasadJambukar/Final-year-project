import {
  ArrowRight,
  Blocks,
  ShieldCheck,
  Users,
  Lock,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-6 py-16 md:py-24 relative hexagon-grid">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 text-primary">
            <Blocks className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Powered by Blockchain</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 blockchain-gradient-text">
            Secure Decentralized Voting
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Participate in transparent and secure elections with our
            blockchain-based voting platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="blockchain-button" size="lg">
              <Blocks className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="#how-it-works">
                Learn how it works
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="blockchain-card rounded-xl p-6 glow-effect">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Secure & Transparent
              </h3>
              <p className="text-muted-foreground">
                Every vote is recorded on the blockchain, ensuring transparency
                and immutability.
              </p>
            </div>

            <div className="blockchain-card rounded-xl p-6 glow-effect">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Decentralized</h3>
              <p className="text-muted-foreground">
                No central authority controls the voting process, eliminating
                single points of failure.
              </p>
            </div>

            <div className="blockchain-card rounded-xl p-6 glow-effect">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
              <p className="text-muted-foreground">
                View election results as they happen with cryptographically
                verified tallies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 bg-secondary/30 node-connection"
        id="how-it-works"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our decentralized voting platform leverages blockchain technology
              to ensure secure and transparent elections.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 blockchain-pulse">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Connect Wallet</h3>
              <p className="text-sm text-muted-foreground">
                Link your blockchain wallet to establish your identity
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 blockchain-pulse">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Register to Vote</h3>
              <p className="text-sm text-muted-foreground">
                Verify your eligibility through our secure registration process
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 blockchain-pulse">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Cast Your Vote</h3>
              <p className="text-sm text-muted-foreground">
                Vote securely with your digital signature
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 blockchain-pulse">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Verify Results</h3>
              <p className="text-sm text-muted-foreground">
                Track your vote and view the transparent election results
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 distributed-nodes">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Started</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our decentralized voting platform and participate in the future
            of democratic processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link
            href="/register"
            className="blockchain-card-hover blockchain-card group relative rounded-xl p-6 hover:border-primary transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Register to Vote</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Create your voter account and verify your identity to participate
              in elections.
            </p>
            {/* <div className="hash-display mb-4">
              <span className="text-primary">function</span> registerVoter(
              <span className="text-primary">address</span> _wallet){" "}
              <span className="text-primary">public</span>
            </div> */}
            <ArrowRight className="absolute bottom-6 right-6 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </Link>

          <Link
            href="/candidates/register"
            className="blockchain-card-hover blockchain-card group relative rounded-xl p-6 hover:border-primary transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Run as Candidate</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Register as a candidate and share your vision with the voters.
            </p>
            {/* <div className="hash-display mb-4">
              <span className="text-primary">function</span> registerCandidate(
              <span className="text-primary">string</span> _name){" "}
              <span className="text-primary">public</span>
            </div> */}
            <ArrowRight className="absolute bottom-6 right-6 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </Link>

          <Link
            href="/candidates"
            className="blockchain-card-hover blockchain-card group relative rounded-xl p-6 hover:border-primary transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Blocks className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">View Candidates</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Explore registered candidates and their proposals.
            </p>
            {/* <div className="hash-display mb-4">
              <span className="text-primary">function</span> getCandidates(){" "}
              <span className="text-primary">public view returns</span>{" "}
              (Candidate[])
            </div> */}
            <ArrowRight className="absolute bottom-6 right-6 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </Link>
        </div>
      </section>

      {/* <section className="py-16 bg-primary/5 gradient-mesh">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to participate?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect your wallet and join the decentralized voting revolution today.
          </p>
          <Button className="blockchain-button" size="lg">
            <Blocks className="mr-2 h-5 w-5" />
            Launch App
          </Button>
        </div>
      </section> */}
    </div>
  );
}
