import React, { useEffect } from 'react'
import { addScript, setFavicon } from '../utils/dom'
import Header from './Header'
import Footer from './Footer'
import HowItWorks from './HowItWorks'
import FAQ from './FAQ'
import { I18nextProvider } from 'react-i18next'
import i18n from './translations/i18n'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 28,
            fontWeight: 600,
        },
        h2: {
            fontSize: 24,
            fontWeight: 400,
        },
    },
})

const Root = () => {
    useEffect(() => {
        setFavicon('/favicon-root.ico')
        if (process.env.REACT_APP_SMALL_CHAT) {
            addScript(process.env.REACT_APP_SMALL_CHAT)
        }
    }, [])

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
                <Header />
                <HowItWorks />
                <FAQ />
                <Footer />
            </ThemeProvider>
        </I18nextProvider>
    )
}

export default Root
