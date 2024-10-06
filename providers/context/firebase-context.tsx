'use client'
import { createContext, useState, useMemo } from 'react'

interface FirebaseContextData {
    data: any[]
    getFirebaseData: () => void
}
export const FirebaseContext = createContext<FirebaseContextData>({
    data: [],
    getFirebaseData: () => {},
})

function FirebaseProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [data, setData] = useState<any[]>([])

    const getFirebaseData = () => {
        setData([])
    }

    const memoizedContextValue = useMemo(() => ({ data, getFirebaseData }), [data])

    return <FirebaseContext.Provider value={memoizedContextValue}>{children}</FirebaseContext.Provider>
}
export default FirebaseProvider
