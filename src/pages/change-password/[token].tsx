import { Box, Button } from "@chakra-ui/core"
import { Formik, Form } from "formik"
import { NextPage } from "next"
import React from "react"
import { InputField } from "../../components/InputField"
import Wrapper from "../../components/Wrapper"
import { toErrorMap } from "../../utils/toErrorMap"
import login from "../login"

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik initialValues={{ newPassword: "" }}
        onSubmit={async (vals, { setErrors }) => {
          // const response = await login(vals)
          // if (response.data?.login.error) {
          //   setErrors(toErrorMap(response.data.login.error))
          // } else if (response.data?.login.user) {
          //   //worked
          //   router.push("/")
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="NewPassword" placeholder="new password" label="New Password" type="password" />
            <Button mt={4} isLoading={isSubmitting} variantColor="teal" type="submit" >Change password</Button>
          </Form>
        )}
      </Formik >
    </Wrapper>
  )
}




ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default ChangePassword