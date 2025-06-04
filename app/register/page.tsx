"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Blocks, ShieldCheck, UserCheck } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

export default function Register() {
  const { isConnected, registerVoter, address, getVoterInfo } = useWallet();
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    dateOfBirth: 0,
    imgUrl: "",
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    document.title = "BlockVote - Register";
    if (address) {
      getVoterInfo(address).then((voterInfo) => {
        if (voterInfo && voterInfo.id > 0) {
          setRegistrationComplete(true);
        }
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Register voter on blockchain
      if (isConnected) {
        await registerVoter(
          formData.fullName,
          formData.dateOfBirth,
          formData.nationalId,
          formData.imgUrl
        );
      }

      setRegistrationComplete(true);
      toast.success("Registration Successful", {
        description:
          "Your voter registration has been recorded on the blockchain",
      });
    } catch (error) {
      toast.error("Registration Failed", {
        description: "There was an error processing your registration",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationComplete) {
    return (
      <div className="container mx-auto px-6 py-16 hexagon-grid">
        <Card className="max-w-2xl mx-auto blockchain-card">
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto blockchain-pulse">
                <UserCheck className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold blockchain-gradient-text">
                Registration Successful
              </h2>
              <p className="text-muted-foreground">
                Your voter registration has been recorded on the blockchain. You
                are now eligible to participate in the upcoming election.
              </p>

              <Link className="blockchain-button mt-4" href="/candidates">
                View Candidates
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-16 hexagon-grid">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">
              Secure Blockchain Verification
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 blockchain-gradient-text">
            Voter Registration
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Register to participate in secure decentralized voting powered by
            blockchain technology
          </p>
        </div>

        <Card className="max-w-2xl mx-auto blockchain-card">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your information will be securely stored and verified on the
              blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                    className="blockchain-input"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="blockchain-input"
                    placeholder="your.email@example.com"
                  />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="nationalId">National ID</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) =>
                      setFormData({ ...formData, nationalId: e.target.value })
                    }
                    required
                    className="blockchain-input"
                    placeholder="Enter your ID number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={
                      formData.dateOfBirth
                        ? new Date(formData.dateOfBirth * 1000)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const inputDate = e.target.value;
                      const inputTimestamp = new Date(inputDate).getTime();
                      const currentTimestamp = Date.now();

                      // Calculate age in years
                      const age =
                        (currentTimestamp - inputTimestamp) /
                        (1000 * 60 * 60 * 24 * 365.25);

                      // Validate age constraints
                      if (age < 18) {
                        alert("You must be at least 18 years old.");
                        return;
                      }

                      if (age > 99) {
                        alert("Age cannot be greater than 99 years.");
                        return;
                      }

                      // Convert to Unix timestamp and update formData
                      const unixTimestamp = Math.floor(inputTimestamp / 1000);
                      setFormData({ ...formData, dateOfBirth: unixTimestamp });
                    }}
                    required
                    className="blockchain-input"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="blockchain-card p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2">
                    Blockchain Verification Process
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your registration will be securely recorded on the
                    blockchain, ensuring:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs text-primary">1</span>
                      </div>
                      <span className="text-muted-foreground">
                        Tamper-proof record of your registration
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs text-primary">2</span>
                      </div>
                      <span className="text-muted-foreground">
                        Prevention of duplicate registrations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs text-primary">3</span>
                      </div>
                      <span className="text-muted-foreground">
                        Cryptographic protection of your personal data
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        agreeToTerms: checked as boolean,
                      })
                    }
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      By registering, you consent to the storage of your
                      information on the blockchain.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full blockchain-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Blocks className="mr-2 h-5 w-5" />
                    Register on Blockchain
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Need help? Contact our support team at sambhavc225@gmail.com or
            prasadjambukar1@gmail.com
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
