import * as React from "react";
import { renderHook, act } from '@testing-library/react';
import { FilterProvider, useFilters } from '../components/FilterContext';
import { useFilteredColumnOptions } from '../hooks/useFilteredColumnOptions';

const mockRawData = [
  { modulo_3: 0, modulo_5: 1 },
  { modulo_3: 2, modulo_5: 4 },
  { modulo_3: 0, modulo_5: 2 },
];

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(FilterProvider, null, children);

describe('useFilteredColumnOptions', () => {
  it('returns filtered options based on context filters', () => {
    const { result: ctxResult } = renderHook(() => useFilters(), { wrapper });

    act(() => {
      ctxResult.current.initializeFilters(['modulo_3', 'modulo_5']);
      ctxResult.current.setFilters({
        modulo_3: [],
        modulo_5: ['1', '4'],
      });
    });

    const { result, rerender } = renderHook(() => useFilteredColumnOptions(mockRawData), { wrapper });

    rerender();

    expect(result.current.modulo_3).toEqual(new Set([0, 2]));
   
  });
});
