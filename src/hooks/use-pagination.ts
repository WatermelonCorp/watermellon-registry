'use client'

import { useMemo } from 'react'

type UsePaginationOptions = {
  currentPage: number
  paginationItemsToDisplay?: number
  totalPages: number
}

type UsePaginationResult = {
  pages: number[]
  showLeftEllipsis: boolean
  showRightEllipsis: boolean
}

export const usePagination = ({
  currentPage,
  paginationItemsToDisplay = 5,
  totalPages
}: UsePaginationOptions): UsePaginationResult => {
  return useMemo(() => {
    if (totalPages <= paginationItemsToDisplay) {
      return {
        pages: Array.from({ length: totalPages }, (_, index) => index + 1),
        showLeftEllipsis: false,
        showRightEllipsis: false
      }
    }

    const siblingCount = Math.max(1, Math.floor((paginationItemsToDisplay - 1) / 2))
    const pages = [currentPage]

    for (let step = 1; step <= siblingCount; step += 1) {
      if (currentPage - step > 1) {
        pages.unshift(currentPage - step)
      }

      if (currentPage + step < totalPages) {
        pages.push(currentPage + step)
      }
    }

    if (!pages.includes(1)) {
      pages.unshift(1)
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages)
    }

    const uniquePages = Array.from(new Set(pages)).sort((a, b) => a - b)

    return {
      pages: uniquePages,
      showLeftEllipsis: uniquePages[1] > 2,
      showRightEllipsis: uniquePages[uniquePages.length - 2] < totalPages - 1
    }
  }, [currentPage, paginationItemsToDisplay, totalPages])
}
