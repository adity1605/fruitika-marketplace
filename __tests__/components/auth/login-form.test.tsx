import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/components/auth/login-form'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

// Mock next/image
jest.mock('next/image', () => {
  return ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  )
})

describe('LoginForm Component', () => {
  it('renders login form elements', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('allows user to type in email and password fields', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('toggles password visibility when eye icon is clicked', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    // Find the toggle button by its position (the button without text in the password field)
    const toggleButton = screen.getAllByRole('button').find(button => 
      (button as HTMLButtonElement).type === 'button' && !button.textContent
    )
    
    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    if (toggleButton) {
      // Click to show password
      await user.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'text')
      
      // Click to hide password again
      await user.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'password')
    }
  })

  it('submits form with correct data', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    const user = userEvent.setup()
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
        email: 'test@example.com',
        password: 'password123',
      })
    })
    
    consoleSpy.mockRestore()
  })

  it('has proper form validation attributes', () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
