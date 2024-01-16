import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

import type { Job } from '@/api/types'
import { createJob } from 'tests/utils/createJob'

describe('JobListing', () => {
  const renderJobListing = (sampleJobProps: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          routerLink: RouterLinkStub,
        },
      },
      props: {
        job: {
          ...sampleJobProps,
        },
      },
    })
  }
  it('renders job title', () => {
    renderJobListing(createJob({ title: 'React developer' }))

    expect(screen.getByText('React developer')).toBeInTheDocument()
  })

  it('renders job organization', () => {
    renderJobListing(createJob({ organization: 'Vue Can Do It' }))

    expect(screen.getByText('Vue Can Do It')).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJob({ locations: ['Belgrade', 'New York'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Belgrade')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJob({ minimumQualifications: ['Master', 'High School'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Master')).toBeInTheDocument()
    expect(screen.getByText('High School')).toBeInTheDocument()
  })
})
