import React from 'react'
import Classnames from 'classnames'

const Pagination = ({ responseDetails, onPageClick }) => {
  const { total, limit, skip } = responseDetails
  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(skip / limit)
  const pages = []

  for (let i = 0; i < totalPages; i++) {
    const isCurrentPage = i == currentPage
    const skipTo = i * limit
    pages.push(
      <li
        key={i}
        className={Classnames(
          'border-orange-500',
          'border-2',
          'cursor-pointer',
          'flex',
          'items-center',
          'justify-center',
          'w-10',
          'h-10',
          'text-xl',
          'font-black',
          'rounded-full',
          'mr-2',
          'hover:bg-orange-600',
          'hover:text-white',
          'shadow-md',
          {
            'pointer-events-none': isCurrentPage,
          },
          {
            'bg-orange-600': isCurrentPage,
          },
          {
            'text-white': isCurrentPage,
          }
        )}
        onClick={e => onPageClick(skipTo)}
      >
        {i + 1}
      </li>
    )
  }

  return <ul className="flex flex-row align-middle justify-center">{pages}</ul>
}
export default Pagination
