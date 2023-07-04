import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue developer',
    organization: 'Vue Can Do It',
    locations: ['London'],
    minimumQualifications: ['code'],
    ...jobProps,
  })
  const renderJobListing = (sampleJobProps) => {
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
    renderJobListing(createJobProps({ title: 'React developer' }))

    expect(screen.getByText('React developer')).toBeInTheDocument()
  })

  it('renders job organization', () => {
    renderJobListing(createJobProps({ organization: 'Vue Can Do It' }))

    expect(screen.getByText('Vue Can Do It')).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJobProps({ locations: ['Belgrade', 'New York'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Belgrade')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJobProps({ minimumQualifications: ['Master', 'High School'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Master')).toBeInTheDocument()
    expect(screen.getByText('High School')).toBeInTheDocument()
  })
})
