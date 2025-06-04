import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(80002),
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
});
