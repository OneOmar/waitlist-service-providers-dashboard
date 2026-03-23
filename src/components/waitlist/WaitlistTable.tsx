import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'

import { Checkbox, IconButton, StatusText, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import type { WaitlistRow } from '@/types/waitlist'

export type WaitlistTableProps = {
  rows: WaitlistRow[]
  onEdit?: (row: WaitlistRow) => void
}

function statusTone(status: WaitlistRow['status']) {
  if (status === 'Onboarded') return 'success'
  if (status === 'Rejected') return 'danger'
  return 'muted'
}

export function WaitlistTable({ rows, onEdit }: WaitlistTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    const valid = new Set(rows.map((r) => r.id))
    setSelectedIds((prev) => {
      const next = new Set<string>()
      for (const id of prev) {
        if (valid.has(id)) next.add(id)
      }
      return next
    })
  }, [rows])

  const allSelected =
    rows.length > 0 && rows.every((row) => selectedIds.has(row.id))

  const toggleAll = () => {
    setSelectedIds(
      allSelected ? new Set() : new Set(rows.map((r) => r.id)),
    )
  }

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHead className="w-12">
            <Checkbox
              label="Select all rows"
              labelClassName="sr-only"
              className="items-center gap-0"
              checked={allSelected}
              onChange={toggleAll}
            />
          </TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Postcode</TableHead>
          <TableHead>Vendor Type</TableHead>
          <TableHead>Service Offering</TableHead>
          <TableHead>Signup Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-16 text-center">Actions</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} striped>
            <TableCell className="align-middle">
              <Checkbox
                label={`Select ${row.email}`}
                labelClassName="sr-only"
                className="items-center gap-0"
                checked={selectedIds.has(row.id)}
                onChange={() => toggleRow(row.id)}
              />
            </TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.postcode}</TableCell>
            <TableCell>{row.vendorType}</TableCell>
            <TableCell>{row.serviceOffering}</TableCell>
            <TableCell>{row.signupDate}</TableCell>
            <TableCell>
              {row.status === 'none' ? (
                <span className="text-table-cell text-text-muted">—</span>
              ) : (
                <StatusText tone={statusTone(row.status)}>{row.status}</StatusText>
              )}
            </TableCell>
            <TableCell className="text-center">
              <IconButton
                type="button"
                label={`Edit ${row.email}`}
                onClick={() => onEdit?.(row)}
              >
                <Pencil strokeWidth={1.75} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
