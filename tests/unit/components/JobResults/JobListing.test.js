import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue developer',
    organization: 'Vue Can Do It',
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
})
