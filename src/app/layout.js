/*

// src/app/layout.jsx
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'Job Admin Dashboard',
  description: 'Manage job postings.',
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

}*/





// src/app/layout.jsx
import '@mantine/core/styles.css';
// Make sure to import 'Box' here
import { ColorSchemeScript, MantineProvider, Box } from '@mantine/core'; 
import '@mantine/dates/styles.css';
export const metadata = {
  title: 'Job Admin Dashboard',
  description: 'Manage job postings.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        
      </head>
      <body>
        <MantineProvider>
          {/* We set the background color here to cover the whole body */}
          <Box style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            {children}
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
