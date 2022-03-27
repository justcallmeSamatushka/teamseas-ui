import React, {FunctionComponent, useState} from 'react';
import {Box, Heading, VStack} from "@chakra-ui/react";
import LeaderBoardItem from "./LeaderBoardItem";
import {Donation} from "../types";
import {useQuery} from "urql";

interface OwnProps {}

type Props = OwnProps;


const DonationsQuery = `
  query Query($orderBy: OrderByParams) {
    donations(orderBy: $orderBy) {
      count
      id
      displayName
      createdAt
      message
      team
    }
  }
`;

type DonationsQueryRes = {
  donations: Donation[]
}

const LeaderBoard: FunctionComponent<Props> = (props) => {
  const [field, setOrderByField] = useState('createdAt');

  const [{ data, fetching, error }] = useQuery<DonationsQueryRes>({
    query: DonationsQuery,
    variables: {
      orderBy: {
        field,
        direction: 'desc'
      }
    }
  })

  return (
    <Box w="100%">
      <VStack spacing={4}>
        { data?.donations.map(donation =>
          <LeaderBoardItem
            key={donation.id}
            donation={donation}
          />
        )}
      </VStack>
    </Box>
  );
};

export default LeaderBoard;
