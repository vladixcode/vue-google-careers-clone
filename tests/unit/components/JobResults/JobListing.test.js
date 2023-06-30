import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

describe('JobListing', () => {
  const renderJobListing = () => {
    render(JobListing, {
      global: {
        stubs: {
          routerLink: RouterLinkStub,
        },
      },
      props: {
        job: {
          title: 'Vue developer',
          organization: 'Vue Can Do It',
        },
      },
    })
  }
  it('renders job title', () => {
    renderJobListing()

    expect(screen.getByText('Vue developer')).toBeInTheDocument()
  })

  it('renders job organization', () => {
    renderJobListing()

    expect(screen.getByText('Vue Can Do It')).toBeInTheDocument()
  })
})
