export interface EntryDraft {
  lastName: string
  firstName: string
  middleName?: string
  phones: Array<string>
}

export interface Entry extends EntryDraft {
  createdAt: Date,
  updatedAt: Date,
  id: string
}
