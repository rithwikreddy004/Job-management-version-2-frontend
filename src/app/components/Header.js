/*

// src/app/components/Header.jsx
import { Group, Button, Box, Text, Container } from '@mantine/core';
import Logo from './Logo';

export default function Header({ onOpenCreateJob }) {
  const handleCreateJob = () => {
    onOpenCreateJob(); 
  };

  return (
    <Container size="xl" style={{ marginTop: '20px' }}>
      <Box
        style={{
          backgroundColor: '#fff',
          borderRadius: '100px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          padding: '10px 24px',
          display: 'flex',
          justifyContent: 'space-between', // Distributes space between the two main groups
          alignItems: 'center',
        }}
      >
       
        <Group spacing="lg"> 
          <Logo />
          <Group spacing="lg"> 
            <Text component="a" href="#" size="sm" style={{ fontWeight: 'bold' }}>Home</Text>
            <Text component="a" href="#" size="sm" color="gray">Find Jobs</Text>
            <Text component="a" href="#" size="sm" color="gray">Find Talents</Text>
            <Text component="a" href="#" size="sm" color="gray">About us</Text>
            <Text component="a" href="#" size="sm" color="gray">Testimonials</Text>
          </Group>
        </Group>
        
       
        <Button 
          onClick={handleCreateJob} 
          style={{ 
            backgroundColor: '#8a2be2', 
            color: '#fff', 
            borderRadius: '100px',
            // Added padding to match Figma button size more closely without changing existing button style properties
            padding: '10px 20px', 
            height: 'auto' // Allow button height to adjust based on padding
          }}
        >
          Create Jobs
        </Button>
      </Box>
    </Container>
  );
}


}*/
// src/app/components/Header.jsx
"use client";
import { Group, Button, Box, Text } from '@mantine/core';
//import { Logo } from './Logo'; // Assuming you've put the SVG into its own component
import Logo from './Logo';
export default function Header({ onOpenCreateJob }) {
  return (
    <Box py="md">
      <Group justify="center">
        <Group
          bg="white"
          p="xs"
          px="md"
          style={{
            borderRadius: '9999px',
            border: '1px solid #EAEAEA',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <Logo />
          <Group gap="xl" visibleFrom="sm">
            <Text size="sm" style={{ cursor: 'pointer' }}>Home</Text>
            <Text size="sm" style={{ cursor: 'pointer' }}>Find Jobs</Text>
            <Text size="sm" style={{ cursor: 'pointer' }}>Find Talents</Text>
            <Text size="sm" style={{ cursor: 'pointer' }}>About us</Text>
            <Text size="sm" style={{ cursor: 'pointer' }}>Testimonials</Text>
          </Group>
          <Button
            onClick={onOpenCreateJob}
            radius="xl"
            variant="gradient"
            gradient={{ from: '#8A2BE2', to: '#C71585', deg: 90 }}
          >
            Create Jobs
          </Button>
        </Group>
      </Group>
    </Box>
  );
}