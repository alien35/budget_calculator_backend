interface IUserBudget {
  min: number,
  max: number
}

export interface IItem {
  id: string,
  type: string,
  name: string,
  lowPrice: number,
  highPrice: number
}

export interface IUser {
  // we are tracking them by ID
  selectedItems: string[]
  budget: IUserBudget,
}
