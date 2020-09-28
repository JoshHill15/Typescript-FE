import React from "react"
import { Formik, Form } from "formik"
import { Box, Button } from "@chakra-ui/core"
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useRegisterMutation } from "../generated/graphql"
import { toErrorMap } from "../utils/toErrorMap"
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"

const Register: React.FC<{}> = () => {
  const [, register] = useRegisterMutation()
  const router = useRouter()


  return (
    <Wrapper variant="small">
      <Formik initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (vals, { setErrors }) => {
          const response = await register({ options: vals })
          if (response.data?.register.error) {
            setErrors(toErrorMap(response.data.register.error))
          } else if (response.data?.register.user) {
            //worked
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="username" placeholder="username" label="Username" />
            </Box>
            <Box mt={4}>
              <InputField name="email" placeholder="Email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField name="password" placeholder="password" label="Password" type="password" />
            </Box>
            <Button isLoading={isSubmitting} mt={4} variantColor="teal" type="submit">Register</Button>
          </Form>
        )}
      </Formik >
    </Wrapper>
  )
}





export default withUrqlClient(createUrqlClient)(Register)