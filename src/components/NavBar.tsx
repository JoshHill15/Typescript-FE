import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link"
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const Navbar: React.FC<{}> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  })
  let body = null

  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    //user not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    )
  } else {
    //user logged in
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button isLoading={logoutFetching} onClick={() => logout()} variant="link">Logout</Button>
      </Flex>
    )
  }


  return (
    <Flex bg="tan" p={4} ml={"auto"}>
      <Box ml="auto">
        {body}
      </Box>
    </Flex>
  )
}