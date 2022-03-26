import * as React from "react"
import '@fontsource/montserrat/400.css'
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  extendTheme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import {Counter} from "./Donation/Counter";
import {useQuery, useSubscription} from "urql";
import LeaderBoard from "./LeaderBoard/LeaderBoard";

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat'
  }
})

const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`;

const TotalUpdatedQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`;

const handleSubscription = (previous: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total
};

export const App = () => {
  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery
  });

  const [res] = useSubscription({
    query: TotalUpdatedQuery
  }, handleSubscription);

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... { error.message }</p>

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg="gray.50">
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="32" pointerEvents="none" />
            <Heading as="h1" size="xl">JOIN THE MOVEMENT!</Heading>
            <Text>
              The team is growing everyday and scoring wins for the planet.
              <br /> Remove trash with us and track our progress!
            </Text>
            <Heading as="h2" size="4xl">
              <Counter from={0} to={res.data || data.totalDonations} />
            </Heading>

            [Donation Wizard]

            <LeaderBoard />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
