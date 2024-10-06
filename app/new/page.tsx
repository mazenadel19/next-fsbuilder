'use client'
import { FirebaseContext } from '@/providers/context/firebase-context'
import { writeData } from '@/utils/actions'
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
import { useEffect, useContext } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

export type stateType = {
    data: {
        name: string
        type: '' | 'file' | 'folder'
        parent: string
    }
    message: null | 'failed' | 'success'
}

const initialState: stateType = {
    data: {
        name: '',
        type: '',
        parent: '',
    },
    message: null,
}

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button variant="contained" type="submit" color="primary" disabled={pending}>
            {pending ? 'please wait... ' : 'Submit'}
        </Button>
    )
}

export default function NewPage() {
    const [state, formAction] = useFormState<stateType>(writeData, initialState)
    const { data } = useContext(FirebaseContext)
    console.log(data)

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
            redirect('/')
        }
    }, [state.data.name, state.data.type, state.message])

    return (
        <Container
            maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Create A New File or Folder
            </Typography>

            <Box component="form" noValidate autoComplete="off" action={formAction} sx={{ width: '100%', mt: 2 }}>
                {/* Name Input */}
                <TextField
                    name="name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    aria-label="Name of file or folder"
                    placeholder="Name of file or folder"
                    defaultValue={state.data.name}
                />

                {/* Type Select */}
                <FormControl fullWidth margin="normal" required>
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
                <FormControl fullWidth margin="normal" required>
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
                        <MenuItem value="root">Root</MenuItem>
                        <MenuItem value="folder1">Folder 1</MenuItem>
                        <MenuItem value="folder2">Folder 2</MenuItem>
                        <MenuItem value="folder3">Folder 3</MenuItem>
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
