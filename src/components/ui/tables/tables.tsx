import { ComponentProps, FC } from 'react'

import { clsx } from 'clsx'

import s from './tables.module.scss'

export type TableProps = ComponentProps<'table'>

export const Table: FC<TableProps> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export type TableHeadProps = ComponentProps<'thead'>

export const TableHead: FC<TableHeadProps> = props => {
  return <thead {...props} />
}

export type TableBodyProps = ComponentProps<'tbody'>

export const TableBody: FC<TableBodyProps> = props => {
  return <tbody {...props} />
}

export type TableRowProps = ComponentProps<'tr'>

export const TableRow: FC<TableRowProps> = ({ className, ...rest }) => {
  const classNames = {
    tableRow: clsx(className, s.tableRow),
  }

  return <tr className={classNames.tableRow} {...rest} />
}

export type TableHeadCellProps = ComponentProps<'th'>

export const TableHeadCell: FC<TableHeadCellProps> = ({ className, ...rest }) => {
  const classNames = {
    headCell: clsx(className, s.headCell),
  }

  return <th className={classNames.headCell} {...rest} />
}

export type TableCellProps = ComponentProps<'td'>

export const TableCell: FC<TableCellProps> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}
