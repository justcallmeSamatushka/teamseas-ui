import React, { FC } from 'react';
import {Donation} from "../types";
import {Avatar, Badge, Flex, Text} from "@chakra-ui/react";
import {formatDate} from "../utils/formatDate";

interface OwnProps {
  donation: Donation
}

type Props = OwnProps;

const LeaderBoardItem: FC<Props> = ({ donation }: Props) => {

  return (
    <Flex
      boxShadow='md'
      p='5'
      bg='white'
      borderRadius='lg'
      w='100%'
      maxWidth='xl'
    >
      <Avatar size='lg' />

      <Flex
        justifyContent='space-between'
        h='100%'
        flex='1'
        ml='4'
      >
        <Flex flexDirection='column' textAlign='left'>
          <Text fontWeight='bold' color='blue.500' fontSize='sm'>{ donation.team }</Text>
          <Text fontWeight='bold'>{ donation.displayName }</Text>
          <Text fontSize='sm'>{ donation.message }</Text>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='space-around'
          textAlign='right'
        >
          <div>
            <Badge
              colorScheme='blue'
              borderRadius='full'
              textTransform='lowercase'
              py='1'
              px='3'
              as='div'
            >
              { donation.count.toLocaleString() } pounds
            </Badge>
          </div>
          <Text fontSize='xs'> { formatDate(donation.createdAt) } </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeaderBoardItem;
