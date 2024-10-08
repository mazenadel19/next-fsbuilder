'use client'
import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { fetchData, FSDataType } from '@/utils/actions'
import { DataWithId } from '@/app/new/page'
import { convertToTree, Node } from '@/utils/helper'

interface FirebaseContextData {
    data: FSDataType
    folders: {
        id: string
        name: string
        parent: string
        type: string
    }[]
    isLoading: boolean
    tree: Node[]
    setFirebaseData: (node: DataWithId) => void
    deleteFirebaseData: (id: string) => void
}
export const FirebaseContext = createContext<FirebaseContextData>({
    data: {},
    folders: [],
    isLoading: false,
    tree: [],
    setFirebaseData: () => {},
    deleteFirebaseData: () => {},
})

function FirebaseProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [data, setData] = useState<FSDataType>({})
    const [isLoading, setIsLoading] = useState(false)
    const tree = convertToTree(data)
    const folders = useMemo(
        () =>
            Object.entries(data)
                .filter(([, value]) => value.type === 'folder')
                .map(([key, value]) => ({ ...value, id: key })),
        [data]
    )

    const setFirebaseData = (node: DataWithId) => {
        const { id, name, parent, type } = node
        setData((prev) => ({ ...prev, [id]: { name, parent, type } }))
    }

    const deleteFirebaseData = useCallback(
        (id: string) => {
            delete data[id]
            setData({ ...data })
        },
        [data]
    )

    const memoizedContextValue = useMemo(
        () => ({ data, tree, folders, isLoading, setFirebaseData, deleteFirebaseData }),
        [data, tree, folders, isLoading, deleteFirebaseData]
    )

    useEffect(() => {
        setIsLoading(true)
        fetchData()
            .then((data) => {
                if (data) {
                    setData(data)
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                })
            })
            .finally(() => setIsLoading(false))
    }, [])

    return <FirebaseContext.Provider value={memoizedContextValue}>{children}</FirebaseContext.Provider>
}
export default FirebaseProvider
