/*
// src/app/components/Filters.jsx
"use client";

import { Group, TextInput, Select, RangeSlider, Box, Text } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { useState } from 'react';


export default function Filters({ filters, onFilterChange }) {
  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ];
  
 
  const [jobCount, setJobCount] = useState(0); 

  
  const handleUpdate = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <Box>
      <Group justify="space-between" mb="sm">
        <Text fw={500}>Showing {jobCount} Jobs</Text>
        <Group>
          <Text fw={500}>Salary Per Month</Text>
          <Text c="dimmed">$50k - $80k</Text>
        </Group>
      </Group>
      
      <Group grow align="flex-end" 
        style={{ 
          backgroundColor: '#fff', 
          padding: '16px', 
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder="Search By Job Title, Role"
          label="Job Title"
          leftSection={<IconSearch size={16} />}
          value={filters.jobTitle}
          onChange={(event) => handleUpdate('jobTitle', event.target.value)}
        />
        <Select
          style={{ flex: 1 }}
          label="Preferred Location"
          placeholder="Preferred Location"
          data={['Chennai', 'Bengaluru', 'Mumbai', 'Delhi', 'Remote', 'Onsite']}
          leftSection={<IconMapPin size={16} />}
          value={filters.location}
          onChange={(value) => handleUpdate('location', value)}
        />
        <Select
          style={{ flex: 1 }}
          label="Job Type"
          placeholder="Job Type"
          data={jobTypes}
          leftSection={<IconBriefcase size={16} />}
          value={filters.jobType}
          onChange={(value) => handleUpdate('jobType', value)}
        />
        <Box style={{ flex: 1 }}>
          <Text size="sm" mb={4}>Salary Range</Text>
          <RangeSlider
            min={0}
            max={2000000}
            minRange={100000}
            defaultValue={[50000, 80000]}
            label={(value) => `₹${value.toLocaleString()}`}
            onChange={(values) => handleUpdate('minSalary', values[0], 'maxSalary', values[1])}
          />
        </Box>
      </Group>
    </Box>
  );
}*/


// src/app/components/Filters.jsx
"use client";
import { Paper, Flex, TextInput, Select, RangeSlider, Text, Box } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase, IconChevronDown } from '@tabler/icons-react';

const locationOptions = ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Remote", "Onsite"];
const jobTypeOptions = ["Full time", "Part time", "Contract", "Internship"];

export default function Filters({ filters, onFilterChange }) {
  
  const handleSliderChange = ([min, max]) => {
    onFilterChange({ ...filters, minSalary: min * 1000, maxSalary: max * 1000 });
  };

  return (
    <Paper
      shadow="sm"
      style={{
        width: '100%',
        backgroundColor: 'white',
        marginTop: '10px',
        marginBottom: '30px',
      }}
    >
      <Flex
        h={70}
        align="center"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}
      >
        <TextInput
          leftSection={<IconSearch size={20} stroke={1.5} color="#888" />}
          placeholder="Search By Job Title, Role"
          variant="unstyled"
          style={{ flexGrow: 1.5 }}
          value={filters.jobTitle}
          onChange={(event) => onFilterChange({ ...filters, jobTitle: event.currentTarget.value })}
        />
        <Box h="40%" w="1px" bg="#EAEAEA" mx="sm" />

        <Select
          leftSection={<IconMapPin size={20} stroke={1.5} color="#888" />}
          rightSection={<IconChevronDown size={20} stroke={1.5} color="#888" />}
          placeholder="Preferred Location"
          data={locationOptions}
          variant="unstyled"
          style={{ flexGrow: 1 }}
          value={filters.location}
          onChange={(value) => onFilterChange({ ...filters, location: value })}
        />
        <Box h="40%" w="1px" bg="#EAEAEA" mx="sm" />

        <Select
          leftSection={<IconBriefcase size={20} stroke={1.5} color="#888" />}
          rightSection={<IconChevronDown size={20} stroke={1.5} color="#888" />}
          placeholder="Job type"
          data={jobTypeOptions}
          variant="unstyled"
          style={{ flexGrow: 1 }}
          value={filters.jobType}
          onChange={(value) => onFilterChange({ ...filters, jobType: value })}
        />
        <Box h="40%" w="1px" bg="#EAEAEA" mx="sm" />

        <Box style={{ flexGrow: 1.5, padding: '10px 20px' }}>
          <Group justify="space-between">
            <Text size="sm" c="gray.7">Salary Per Month</Text>
            <Text size="sm" c="gray.7">
              ₹{Math.round(filters.minSalary / 1000)}k - ₹{Math.round(filters.maxSalary / 1000)}k
            </Text>
          </Group>
          <RangeSlider
            min={0}
            max={200}
            step={5}
            value={[Math.round(filters.minSalary / 1000), Math.round(filters.maxSalary / 1000)]}
            onChange={handleSliderChange}
            thumbSize={18}
            styles={{
              thumb: { borderWidth: '4px', borderColor: '#8A2BE2', backgroundColor: 'white' },
              bar: { backgroundColor: '#8A2BE2' }
            }}
          />
        </Box>
      </Flex>
    </Paper>
  );
}