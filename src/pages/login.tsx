import React from "react"
import { Formik, Form } from "formik"
import { Box, Button } from "@chakra-ui/core"
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useLoginMutation } from "../generated/graphql"
import { toErrorMap } from "../utils/toErrorMap"
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"


const Login: React.FC<{}> = () => {
  const [, login] = useLoginMutation()
  const router = useRouter()


  return (
    <Wrapper variant="small">
      <Formik initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (vals, { setErrors }) => {
          const response = await login(vals)
          if (response.data?.login.error) {
            setErrors(toErrorMap(response.data.login.error))
          } else if (response.data?.login.user) {
            //worked
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="usernameOrEmail" placeholder="Username or Email" label="Username or Email" />
            <Box mt={4}>
              <InputField name="password" placeholder="password" label="password" type="password" />
            </Box>
            <Button isLoading={isSubmitting} mt={4} variantColor="teal" type="submit">Login</Button>
          </Form>
        )}
      </Formik >
    </Wrapper>
  )
}





export default withUrqlClient(createUrqlClient)(Login) 