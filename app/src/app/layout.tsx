import './default.css'

export const metadata = {
  title: 'Documents',
  description: 'Write by Marco',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="ja">
      <body className="dark">
        {children}
      </body>
      </html>
  )
}
