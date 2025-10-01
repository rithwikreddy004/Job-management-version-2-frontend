/*
import { Card, Group, Text, Image, Badge, Box, Button } from '@mantine/core';
import { IconMapPin, IconBriefcase } from '@tabler/icons-react';

export default function JobCard({ job }) {
  const logo = `/logos/${job.company.toLowerCase()}.png`;

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Group justify="space-between" mb="md">
     
        <Box
          style={{
            boxSizing: 'border-box',
            width: '83.46px',
            height: '82px',
            background: 'linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)',
            border: '1px solid #FFFFFF',
            boxShadow: '0px 0px 10.25px rgba(148, 148, 148, 0.25)',
            borderRadius: '13.1786px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          
          <Image src={logo} alt={`${job.company} logo`} width={50} height={50} fit="contain" />
        </Box>

        <Badge color="blue" variant="light" style={{ borderRadius: '4px' }}>
          {job.posted}
        </Badge>
      </Group>

      <Text fw={500} size="lg" mt="md">{job.title}</Text>
      <Text c="dimmed" size="sm">{job.company}</Text>

      <Group mt="xs" mb="xs" spacing="sm">
        <Group spacing={4}>
          <IconBriefcase size={16} />
          <Text size="sm">{job.experience}</Text>
        </Group>
        <Group spacing={4}>
          <IconMapPin size={16} />
          <Text size="sm">{job.location}</Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed" mb="md" style={{
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
      }}>
        A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized recommendations.
      </Text>

      <Button fullWidth mt="md" radius="md" style={{ backgroundColor: '#007bff', color: '#fff' }}>
        Apply Now
      </Button>
    </Card>
  );
}

*/








// src/app/components/JobCard.jsx
"use client";
import { Card, Text, Badge, Button, Group, Stack, Box, List, ThemeIcon, Avatar } from '@mantine/core';
import { IconBriefcase, IconMapPin, IconCoinRupee, IconCircleCheck } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';

export default function JobCard({ job }) {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder h={360}>
      <Stack justify="space-between" h="100%">
        <Box>
          <Badge
            color="blue"
            variant="light"
            style={{ position: 'absolute', top: 15, right: 15 }}
          >
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </Badge>

          <Group justify="flex-start" mb="md">
             <Box
                w={60} h={60}
                bg="gray.1"
                style={{ borderRadius: '8px' }}
                display="flex"
                p="xs"
             >
                <Avatar src={`/logos/${job.company}.png`} alt={`${job.company} logo`} radius="xl" size="md" />
             </Box>
          </Group>
          
          <Text fw={600} size="lg" mb="sm">{job.jobTitle}</Text>

          <Group mb="md">
            <Group gap="xs">
              <IconCircleCheck size={16} color="gray" />
              <Text size="sm" c="dimmed">{job.experience}</Text>
            </Group>
            <Group gap="xs">
              <IconMapPin size={16} color="gray" />
              <Text size="sm" c="dimmed">{job.location}</Text>
            </Group>
            <Group gap="xs">
              <IconCoinRupee size={16} color="gray" />
              <Text size="sm" c="dimmed">{job.salary} LPA</Text>
            </Group>
          </Group>
          
          <List
            spacing="xs"
            size="sm"
            center
            c="dimmed"
            icon={
              <ThemeIcon color="teal" size={20} radius="xl">
                <IconCircleCheck style={{ width: '12px', height: '12px' }} />
              </ThemeIcon>
            }
          >
            {job.description.split('. ').map((point, index) => (
                point && <List.Item key={index}>{point}</List.Item>
            ))}
          </List>
        </Box>

        <Button color="blue" fullWidth mt="md" radius="md">
          Apply Now
        </Button>
      </Stack>
    </Card>
  );
}