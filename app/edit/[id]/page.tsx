'use client'
import { Data, StateType } from '@/app/new/page'
import { FirebaseContext } from '@/providers/context/firebase-context'
import { editData } from '@/utils/actions'
import {
    Box,
    Button,
    Container,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

const initialState: StateType = {
    data: {
        name: '',
        type: '',
        parent: '',
    },
    message: null,
}

type EditType = {
    data: Data<'file' | 'folder'>
    message: null
}

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button variant="contained" type="submit" color="primary" disabled={pending}>
            {pending ? 'please wait... ' : 'Submit'}
        </Button>
    )
}

function Edit({ id }: Readonly<{ id: string }>) {
    const { data, folders, setFirebaseData } = useContext(FirebaseContext)
    const originalItem = data?.[id]
    const initState = { ...initialState, data: originalItem }
    const [state, formAction] = useFormState<StateType | EditType>(editData, initState)
    const children = folders.filter((f) => f.parent === id)

    useEffect(() => {
        if (state.message === 'failed') {
            let errorMsg = ''
            if (!state.data.name) {
                errorMsg = 'Please Add The Name'
            } else if (!state.data.type) {
                errorMsg = 'Please Select The Type'
            } else {
                errorMsg = 'Please Select The Parent'
            }
            toast.error(errorMsg, {
                ariaProps: {
                    role: 'alert',
                    'aria-live': 'assertive',
                },
            })
        }
        if (state.message === 'success') {
            toast.success(state.message, {
                ariaProps: {
                    role: 'status',
                    'aria-live': 'off',
                },
            })
            setFirebaseData(state.extra)
            redirect('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.message])

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Edit {originalItem.name.toUpperCase()} {originalItem.type.toUpperCase()}
            </Typography>

            <Box component="form" noValidate autoComplete="off" action={formAction} sx={{ width: '100%', mt: 2 }}>
                {/* id Input */}
                <TextField name="id" defaultValue={id} sx={{ display: 'none' }} />

                {/* Name Input */}
                <TextField
                    name="name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    aria-label="Name of file or folder"
                    placeholder="Name of file or folder"
                    defaultValue={state.data.name}
                />

                {/* Type Select */}
                <FormControl fullWidth margin="normal" sx={{ display: 'none' }}>
                    <Select
                        name="type"
                        defaultValue={state.data.type}
                        inputProps={{ 'aria-label': 'Select The Type' }}
                        aria-label="Select The Type"
                        displayEmpty
                        input={<OutlinedInput />}
                    >
                        <MenuItem disabled value="">
                            <em>Select The Type</em>
                        </MenuItem>
                        <MenuItem value="file">File</MenuItem>
                        <MenuItem value="folder">Folder</MenuItem>
                    </Select>
                </FormControl>

                {/* Parent Select */}
                <FormControl fullWidth margin="normal">
                    <Select
                        name="parent"
                        defaultValue={state.data.parent}
                        inputProps={{ 'aria-label': 'Select Parent folder' }}
                        displayEmpty
                        input={<OutlinedInput />}
                    >
                        <MenuItem disabled value="">
                            <em>Select Parent folder</em>
                        </MenuItem>
                        <MenuItem value="root" disabled={initState.data.parent === 'root'}>
                            Root
                        </MenuItem>
                        {folders.map((folder) => (
                            <MenuItem
                                value={folder.id}
                                key={folder.id}
                                disabled={folder.id === id || children.some((child) => child.id === folder.id)}
                            >
                                {folder.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button variant="outlined" component={Link} href="/">
                        Back
                    </Button>
                    <SubmitButton />
                </Box>
            </Box>
        </Container>
    )
}

export default function EditPage({ params }: Readonly<{ params: { id: string } }>) {
    const { data, isLoading } = useContext(FirebaseContext)
    const originalItem = data?.[params.id]

    if (isLoading) {
        return (
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">Fetching data ....</Typography>
            </Box>
        )
    }

    if (!originalItem?.name) {
        return (
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">No items found.</Typography>
            </Box>
        )
    }

    return <Edit id={params.id} />
}
