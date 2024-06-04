declare module '@oauth-webapp/generalProviders' {
    type ProviderChildren = {
    children: React.ReactNode
    }

    interface LoadingProps {
    loading: boolean
    dispatch: (v: boolean) => void
    }

    type AppAccessibilityContextType = {
    isInContrast: boolean
    lengthText: number
    toggleContrast: () => void
    addLengthText: () => void
    removeLengthText: () => void
    resetLengthText: () => void
    }

    interface DigitalCertTokenProps {
    token: string
    toSignData: string
    }
}

declare module '@oauth-webapp/styles' {
    interface GlobalStyleProps {
    fontSize: number
    isInContrastMode: boolean
    lengthText: number
    }

    type JustifyContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'

    type AlignItems =
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'

    type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse'
}