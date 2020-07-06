/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider, StyleSheetManager } from 'styled-components'
import { Store } from 'redux'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

import { Provider } from 'react-redux'
import LoginComponent from './components/login'
import AdminBro from '../admin-bro'

import createStore, {
  initializeBranding,
  initializeLocale,
  ReduxState,
} from './store/store'
import combineStyles from './styles/combine-styles'
import ViewHelpers from '../backend/utils/view-helpers'

type LoginTemplateAttributes = {
  /**
   * action which should be called when user clicks submit button
   */
  action: string;
  /**
   * Error message to present in the form
   */
  errorMessage?: string;
}

const html = (admin: AdminBro, { action, errorMessage }: LoginTemplateAttributes): string => {
  const h = new ViewHelpers({ options: admin.options })

  const store: Store<ReduxState> = createStore()
  store.dispatch(initializeLocale(admin.locale))
  store.dispatch(initializeBranding(admin.options.branding))

  const theme = combineStyles((admin.options.branding && admin.options.branding.theme) || {})
  const { locale } = store.getState()
  i18n
    .init({
      resources: {
        [locale.language]: {
          translation: locale.translations,
        },
      },
      lng: locale.language,
      interpolation: { escapeValue: false },
    })

  const sheet = new ServerStyleSheet()

  const loginComponent = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <LoginComponent action={action} message={errorMessage} />
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </StyleSheetManager>,
  )

  sheet.collectStyles(<LoginComponent action={action} message={errorMessage} />)
  const style = sheet.getStyleTags()
  sheet.seal()

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Cauldron of War</title>
      ${style}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">

      <script src="${h.assetPath('global.bundle.js')}"></script>
    </head>
    <body>
      <div id="app">${loginComponent}</div>
    </body>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
    <script>
    $(document).ready(function() {
      $('#home').click(function(){
        $('#home_screen').removeAttr('hidden');
        $('#login_screen').attr("hidden",true);
        $('#home').css('background-color', '#4268F6');
        $('#home').css('color', '#fff');
        $('#signin').css('background-color', '#fff');
        $('#signin').css('color', '#4268F6');
      });
      $('#signin').click(function(){
        $('#login_screen').removeAttr('hidden');
        $('#home_screen').attr("hidden",true);
        $('#home').css('background-color', '#fff');
        $('#signin').css('background-color', '#4268F6');
        $('#home').css('background-color', '#fff');
        $('#home').css('color', '#4268F6');
        $('#signin').css('background-color', '#4268F6');
        $('#signin').css('color', '#fff');
      });
    });
    </script>
    </html>
  `
}

export default html
