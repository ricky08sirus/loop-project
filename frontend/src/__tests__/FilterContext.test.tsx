import { renderHook, act } from '@testing-library/react';
import { FilterProvider, useFilters } from '../components/FilterContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FilterProvider>{children}</FilterProvider>
);

describe('FilterContext', () => {
  it('initializes filters', () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    act(() => {
      result.current.initializeFilters(['modulo_3', 'modulo_5']);
    });

    expect(result.current.filters).toEqual({
      modulo_3: [],
      modulo_5: [],
    });
  });

  it('updates filters correctly', () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    act(() => {
      result.current.initializeFilters(['modulo_5']);
      result.current.setFilters((prev) => ({
        ...prev,
        modulo_5: ['1', '4'],
      }));
    });

    expect(result.current.filters).toEqual({
      modulo_5: ['1', '4'],
    });
  });
});
