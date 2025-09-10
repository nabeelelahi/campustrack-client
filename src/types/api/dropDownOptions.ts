export interface DropDownOptionsType {
    currency: Currency[]
    bank: Bank[]
    agent: Agent[]
}

export interface Currency {
    created_at: string
    _id: string
    name: string
    prefix: string
    slug: string
    status: boolean
    updated_at: any
    deleted_at: any
    __v: number
}

export interface Bank {
    created_at: string
    _id: string
    name: string
    iban: string
    account_no: string
    slug: string
    status: boolean
    updated_at: any
    deleted_at: any
    __v: number
}

export interface Agent {
    created_at: string
    _id: string
    agent_id: string
    name: string
    email: string
    mobile_no: string
    region: string
    commission: string
    slug: string
    status: boolean
    updated_at: any
    deleted_at: any
    __v: number
}
