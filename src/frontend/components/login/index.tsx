import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { useSelector } from 'react-redux'
import { Box, H5, H2, Label, Illustration, Input, FormGroup, Button, Text, Icon, Link, MessageBox } from '../design-system'
import { useTranslation } from '../../hooks'
import { ReduxState } from '../../store/store'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

type Props = {
  message?: string;
  action: string;
}

const color = '#4268F6';

const MyButtonLeft = styled.button`
  background: transparent;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 2px solid ${color};
  border-bottom: 2px solid ${color};
  border-left: 2px solid ${color};
  border-right: 0px solid ${color};
  font-size: 16px;
  color: ${color};
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 0.5em 1em;
  width: 240px;
  cursor:pointer;
  :focus {outline:0;}
`

const MyButtonRight = styled.button`
  background: transparent;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 2px solid ${color};
  border-bottom: 2px solid ${color};
  border-left: 0px solid ${color};
  border-right: 2px solid ${color};
  color: white;
  background-color: ${color};
  font-size: 16px;
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 0.5em 1em;
  width: 240px;
  cursor:pointer;
  :focus {outline:0;}
`

const SoftwareBrothers: React.FC = () => (
  <Box position="absolute" left={0} bottom={5} right={0}>
    <Text fontWeight="lighter" variant="sm" textAlign="center">
      Made with
      <Icon icon="FavoriteFilled" color="love" mx="sm" />
      by
      <Link
        href="http://softwarebrothers.co"
        target="_blank"
        rel="noopener noreferrer"
        mx="sm"
        color="white"
      >
        SoftwareBrothers
      </Link>
    </Text>
  </Box>
)

const Login: React.FC<Props> = (props) => {
  const { action, message } = props
  const { translateLabel, translateButton, translateProperty, translateMessage } = useTranslation()
  const branding = useSelector((state: ReduxState) => state.branding)
  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper flex variant="white">
        <Box flex width={[1, 2 / 3, 'auto']}>
          <MyButtonLeft id="home">{"Home"}</MyButtonLeft>
          <MyButtonRight id="signin">{"Sign In"}</MyButtonRight>
        </Box>
        <Box bg="white" height="440px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
          <div hidden={true} id="home_screen">
            <img src="/user/frontend/assets/CoW.png"/>
          </div>
          <div hidden={false} id="login_screen">
            <Box
              as="form"
              action={action}
              method="POST"
              p="x3"
              flexGrow={1}
              width={['100%', '100%', '480px']}
            >
              <H5 mb="xl">
                {/*branding.logo && (
                  <Box
                    as="img"
                    src={branding.logo}
                    alt={branding.companyName}
                    height="35px"
                    mr="lg"
                    mt="-3px"
                  />
                )*/}
                {branding.companyName ?? 'AdminBro'}
              </H5>
              {message && (
                <MessageBox
                  my="lg"
                  message={message.split(' ').length > 1 ? message : translateMessage(message)}
                  variant="danger"
                />
              )}
              <FormGroup>
                <Label required>{translateProperty('email')}</Label>
                <Input name="email" placeholder={translateProperty('email')} />
              </FormGroup>
              <FormGroup>
                <Label required>{translateProperty('password')}</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder={translateProperty('password')}
                  autoComplete="new-password"
                />
              </FormGroup>
              <Text mt="xl" textAlign="center">
                <Button variant="primary">
                  {translateButton('login')}
                </Button>
              </Text>
            </Box>
          </div>
        </Box>
      </Wrapper>
    </React.Fragment>
  )
}

export default Login
