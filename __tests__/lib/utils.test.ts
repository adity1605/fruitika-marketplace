import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('bg-red-500', 'text-white')
    expect(result).toBe('bg-red-500 text-white')
  })

  it('handles conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
    expect(result).toBe('base-class conditional-class')
  })

  it('handles Tailwind class conflicts by merging', () => {
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500')
  })

  it('handles undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'other-class')
    expect(result).toBe('base-class other-class')
  })

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles objects with boolean values', () => {
    const result = cn({
      'always-applied': true,
      'conditionally-applied': true,
      'never-applied': false,
    })
    expect(result).toBe('always-applied conditionally-applied')
  })

  it('returns empty string for no arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })
})
