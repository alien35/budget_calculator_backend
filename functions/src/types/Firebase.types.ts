export type FirebaseItem<T> = {
  id: string,
  data: () => T
  exists: boolean
}

export type FirebaseSnapshot<T> = T[]