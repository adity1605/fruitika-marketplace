import { render, screen } from '@testing-library/react'

// Simple test component to demonstrate testing
function SimpleComponent() {
  return (
    <div>
      <h1>Welcome to Fruitika</h1>
      <p>Fresh fruits for everyone</p>
      <button>Get Started</button>
    </div>
  )
}

describe('Simple Component Test', () => {
  it('renders welcome message', () => {
    render(<SimpleComponent />)
    
    expect(screen.getByText(/welcome to fruitika/i)).toBeInTheDocument()
    expect(screen.getByText(/fresh fruits for everyone/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
  })
})
