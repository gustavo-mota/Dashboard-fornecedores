'use client'
import {
createContext,
useCallback,
useContext,
useState,
useMemo
} from 'react'
import {
AppAccessibilityContextType,
ProviderChildren
} from '@oauth-webapp/generalProviders'

const AppAccessibilityData: AppAccessibilityContextType = {
isInContrast: false,
lengthText: 0,
toggleContrast: () => null,
addLengthText: () => null,
removeLengthText: () => null,
resetLengthText: () => null
}

const APP_KEY_STORAGE = '@ACESSO_APP'

const AppAccessibilityContext =
createContext<AppAccessibilityContextType>(AppAccessibilityData)

function AppAccessibilityProvider({ children }: ProviderChildren) {
const [lengthText, setLengthText] = useState<number>(() => {
    if (typeof window !== 'undefined') {
    const storedLengthTextValue = window.localStorage.getItem(
        `${APP_KEY_STORAGE}_LENGTHTEXT`
    )
    if (storedLengthTextValue) {
        return JSON.parse(storedLengthTextValue)
    }
    }
    return 0
})

const [isInContrast, setIsInContrast] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
    const storedContrastValue = window.localStorage.getItem(
        `${APP_KEY_STORAGE}_CONTRAST`
    )

    if (storedContrastValue) {
        return JSON.parse(storedContrastValue)
    }
    }
    return false
})

const toggleContrast = useCallback(() => {
    setIsInContrast((prevValue) => {
    window.localStorage.setItem(
        `${APP_KEY_STORAGE}_CONTRAST`,
        JSON.stringify(!prevValue)
    )
    return !prevValue
    })
}, [])

const saveLeangthTextInStorage = useCallback((value: number) => {
    window.localStorage.setItem(
    `${APP_KEY_STORAGE}_LENGTHTEXT`,
    JSON.stringify(value)
    )
}, [])

const addLengthText = useCallback(() => {
    setLengthText((prevLength) => {
    if (prevLength < 5) {
        saveLeangthTextInStorage(prevLength)
        return prevLength + 1
    }
    return prevLength
    })
}, [saveLeangthTextInStorage])

const removeLengthText = useCallback(() => {
    setLengthText((prevLength) => {
    if (prevLength > -3) {
        saveLeangthTextInStorage(prevLength - 1)
        return prevLength - 1
    }
    return prevLength
    })
}, [saveLeangthTextInStorage])

const resetLengthText = useCallback(() => {
    saveLeangthTextInStorage(0)
    setLengthText(0)
}, [saveLeangthTextInStorage])

const providerValue = useMemo(
    () => ({
    removeLengthText,
    resetLengthText,
    toggleContrast,
    addLengthText,
    isInContrast,
    lengthText
    }),
    [
    removeLengthText,
    resetLengthText,
    toggleContrast,
    addLengthText,
    isInContrast,
    lengthText
    ]
)

return (
    <AppAccessibilityContext.Provider value={providerValue}>
    {children}
    </AppAccessibilityContext.Provider>
)
}

const useAppAccessibility = () => {
const context = useContext(AppAccessibilityContext)

if (!context) {
    throw new Error(
    `useAppAccessibility must be used within an AppAccessibilityProvider`
    )
}

return context
}

export { AppAccessibilityProvider, useAppAccessibility }