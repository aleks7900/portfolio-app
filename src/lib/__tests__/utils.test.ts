import { describe, expect, it } from 'vitest';
import { cn } from '../utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('base-class', 'second-class')).toBe('base-class second-class');
  });

  it('resolves conflicting Tailwind CSS classes with precedence to the latter', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('bg-white', 'bg-transparent')).toBe('bg-transparent');
  });

  it('handles conditional class names with falsy values', () => {
    const isHidden = false;
    const isVisible = true;
    expect(
      cn('always', isHidden && 'hidden', isVisible && 'block', null, undefined)
    ).toBe('always block');
  });

  it('handles arrays and nested objects of classes', () => {
    expect(cn(['foo', 'bar'], { baz: true, qux: false })).toBe('foo bar baz');
  });

  it('returns empty string when given no arguments or only falsy values', () => {
    expect(cn()).toBe('');
    expect(cn(null, undefined, false)).toBe('');
  });
});
