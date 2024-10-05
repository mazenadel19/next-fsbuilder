import { roboto } from '@/app/fonts'
import theme from '@/themes/theme'
import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable}`}>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
