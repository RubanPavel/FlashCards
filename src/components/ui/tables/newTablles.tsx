import { ComponentProps, FC } from 'react'

import { clsx } from 'clsx'

import s from './tables.module.scss'

export type Props = ComponentProps<'table'>

export const Root: FC<Props> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export type TableHeadProps = ComponentProps<'thead'>

const Head: FC<TableHeadProps> = props => {
  return <thead {...props} />
}

export type TableBodyProps = ComponentProps<'tbody'>

const Body: FC<TableBodyProps> = props => {
  return <tbody {...props} />
}

export type TableRowProps = ComponentProps<'tr'>

export const Row: FC<TableRowProps> = ({ className, ...rest }) => {
  const classNames = {
    tableRow: clsx(className, s.tableRow),
  }

  return <tr className={classNames.tableRow} {...rest} />
}

export type TableHeadCellProps = ComponentProps<'th'>

export const HeadCell: FC<TableHeadCellProps> = ({ className, ...rest }) => {
  const classNames = {
    headCell: clsx(className, s.headCell),
  }

  return <th className={classNames.headCell} {...rest} />
}

export type TableCellProps = ComponentProps<'td'>

export const BodyCell: FC<TableCellProps> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}

export const Table = {
  Body,
  BodyCell,
  Head,
  HeadCell,
  Root,
  Row,
}

// Todo может как в инкубаторе таблицу сделать объектом?

//import { ComponentProps, FC } from 'react'

// import { clsx } from 'clsx'
//
// import s from './tables.module.scss'
//
// export type RootProps = ComponentProps<'table'>
//
// export const Root: FC<RootProps> = ({ className, ...rest }) => {
//   const classNames = {
//     table: clsx(className, s.table),
//   }
//
//   return <table className={classNames.table} {...rest} />
// }
//
// export type HeadProps = ComponentProps<'thead'>
//
// export const Head: FC<HeadProps> = props => {
//   return <thead {...props} />
// }
//
// export type BodyProps = ComponentProps<'tbody'>
//
// export const Body: FC<BodyProps> = props => {
//   return <tbody {...props} />
// }
//
// export type RowProps = ComponentProps<'tr'>
//
// export const Row: FC<RowProps> = props => {
//   return <tr {...props} />
// }
//
// export type HeadCellProps = ComponentProps<'th'>
//
// export const HeadCell: FC<HeadCellProps> = ({ className, ...rest }) => {
//   const classNames = {
//     headCell: clsx(className, s.headCell),
//   }
//
//   return <th className={classNames.headCell} {...rest} />
// }
//
// export type CellProps = ComponentProps<'td'>
//
// export const Cell: FC<CellProps> = ({ className, ...rest }) => {
//   const classNames = {
//     cell: clsx(className, s.tableCell),
//   }
//
//   return <td className={classNames.cell} {...rest} />
// }
//
// export const Table = {
//   Body,
//   Cell,
//   Head,
//   HeadCell,
//   Root,
//   Row,
// }
