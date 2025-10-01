

"use client";

import { Modal, Group, TextInput, Select, Textarea, Button, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IconChevronDown, IconCalendarEvent } from '@tabler/icons-react';

// Zod schema for validation
const jobSchema = z.object({
  jobTitle: z.string().min(3, 'Job Title is required'),
  companyName: z.string().min(2, 'Company Name is required'),
  location: z.string().nonempty('Location is required'),
  // REMOVED experience from schema
  jobType: z.enum(['full-time', 'part-time', 'contract', 'internship'], {
    errorMap: () => ({ message: 'Job Type is required' }),
  }),
  salaryMin: z.number().min(0, 'Minimum salary must be positive'),
  salaryMax: z.number().min(0, 'Maximum salary must be positive'),
  applicationDeadline: z.coerce.date().refine(val => val > new Date(), {
    message: 'Deadline cannot be in the past'
  }),
  jobDescription: z.string().min(10, 'Job Description is required'),
});

export default function CreateJobModal({ opened, onClose, onJobCreated }) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: '',
      companyName: '',
      location: '',
      // REMOVED experience from default values
      jobType: null,
      salaryMin: 0,
      salaryMax: 12,
      applicationDeadline: null,
      jobDescription: '',
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      salaryMin: data.salaryMin * 100000,
      salaryMax: data.salaryMax * 100000,
    };
    
    console.log("SENDING THIS PAYLOAD TO BACKEND:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Backend Error Response:", errorBody);
        throw new Error('Failed to create job posting');
      }

      console.log('Job created successfully!');
      reset(); 
      onJobCreated();
      
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Check the console for details.');
    }
  };

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const preferredLocations = ['Chennai', 'Bengaluru', 'Mumbai', 'Delhi', 'Remote', 'Onsite'];

  return (
    <Modal opened={opened} onClose={onClose} title="Create Job Opening" centered size="lg" padding="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Group grow mb="md">
              <TextInput label="Job Title" placeholder="Full Stack Developer" {...register('jobTitle')} error={errors.jobTitle?.message} />
              <TextInput label="Company Name" placeholder="Amazon, Tesla, Swiggy" {...register('companyName')} error={errors.companyName?.message} />
            </Group>

            <Group grow mb="md">
              <Controller name="location" control={control} render={({ field }) => (<Select {...field} label="Location" placeholder="Choose Preferred Location" data={preferredLocations} error={errors.location?.message} rightSection={<IconChevronDown size={14} />} />)} />
              <Controller name="jobType" control={control} render={({ field }) => (<Select {...field} label="Job Type" placeholder="Select job type" data={jobTypes} error={errors.jobType?.message} rightSection={<IconChevronDown size={14} />} />)} />
            </Group>

            <Group grow mb="md">
              <Controller name="salaryMin" control={control} render={({ field }) => (<NumberInput {...field} label="Salary Range (in LPA)" placeholder="eg., 8" error={errors.salaryMin?.message} />)} />
              <Controller name="salaryMax" control={control} render={({ field }) => (<NumberInput {...field} label=" " placeholder="eg., 12" error={errors.salaryMax?.message} />)} />
            </Group>

            <Controller name="applicationDeadline" control={control} render={({ field }) => (<DateInput {...field} value={field.value ? new Date(field.value) : null} label="Application Deadline" placeholder="Pick a date" mb="md" minDate={new Date()} error={errors.applicationDeadline?.message} leftSection={<IconCalendarEvent size={16} />} />)} />
            
            {/* REMOVED experience input field from the form */}

            <Textarea label="Job Description" placeholder="Let candidates know more about the role." autosize minRows={3} mb="xl" {...register('jobDescription')} error={errors.jobDescription?.message} />
            
            <Group justify="space-between" mt="xl">
              <Button variant="default" radius="md" style={{ minWidth: '120px' }}> Save Draft <IconChevronDown size={14} style={{ marginLeft: '5px' }} /> </Button>
              <Button type="submit" radius="md" color="blue" style={{ minWidth: '120px' }}> Publish <IconChevronDown size={14} style={{ marginLeft: '5px' }} /> </Button>
            </Group>
      </form>
    </Modal>
  );
}