"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useWallet, Candidate, Voter } from "@/context/WalletContext";
import { cn } from "@/lib/utils";

interface SelectedCandidate {
  id: number;
  address: string;
}

// Mock data - replace with actual data fetching
const candidates = [
  {
    id: 1,
    name: "Jane Smith",
    party: "Progressive Party",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 2,
    name: "John Davis",
    party: "Reform Alliance",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

export default function Vote() {
  const {
    votingActive,
    getAllCandidates,
    vote,
    getVoterInfo,
    address,
    resultDeclared,
  } = useWallet();
  const [selectedCandidate, setSelectedCandidate] =
    useState<SelectedCandidate | null>(null);

  const [candidates, setCandidates] = useState<Candidate[]>(); // State to store candidates
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [voterInfo, setVoterInfo] = useState<Voter | null>(null);

  useEffect(() => {
    document.title = "Block Vote - Vote";

    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidates(); // Fetch candidates
        setCandidates(data); // Update state with fetched candidates
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    const fetchVoterInfo = async () => {
      try {
        if (!address) return;
        const data = await getVoterInfo(address); // Fetch voter info
        setVoterInfo(data); // Update state with fetched voter info
      } catch (error) {
        console.error("Error fetching voter info:", error);
      }
    };

    fetchVoterInfo();
    fetchCandidates();
  }, [getAllCandidates, address, getVoterInfo]);

  const handleVote = () => {
    if (selectedCandidate === null) return;
    console.log("Voted for candidate:", selectedCandidate);
  };

  if (!votingActive) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Voting Not Started</h1>
          <p className="text-muted-foreground">
            Please wait for the commissioner to start the voting process.
          </p>
        </div>
      </ProtectedRoute>
    );
  }

  if (resultDeclared) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Voting Has Ended</h1>
          <p className="text-muted-foreground">
            The voting period has concluded. Please check the results page.
          </p>
        </div>
      </ProtectedRoute>
    );
  }

  if (!candidates) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">No Candidates Found</h1>
          <p className="text-muted-foreground">
            There are currently no candidates available for this election.
          </p>
        </div>
      </ProtectedRoute>
    );
  }

  return voterInfo ? (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-16 network-pattern">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Cast Your Vote
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary blockchain-card",
                  selectedCandidate?.id === candidate.id &&
                    "border-primary ring-2 ring-primary ring-offset-2"
                )}
                onClick={() =>
                  setSelectedCandidate({
                    id: candidate.id,
                    address: candidate.candidateAddress,
                  })
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={candidate.photo!}
                        alt={candidate.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {candidate.name}
                      </h3>
                      <p className="text-muted-foreground">{candidate.party}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedCandidate !== null && (
            <Button
              onClick={handleVote}
              className="w-full py-6 text-lg blockchain-button"
            >
              Confirm Vote
            </Button>
          )}
        </div>
      </div>
    </ProtectedRoute>
  ) : (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">
        You are not a registered voter
      </h1>
    </div>
  );
}
