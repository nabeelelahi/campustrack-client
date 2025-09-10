export type UserType = {
    current_location: CurrentLocation
    _id: string
    role: string
    name: string
    email: string
    username: string
    image_url: string
    mobile_no: string
    online_status: boolean
    payment_active: boolean
    email_verified: boolean
    mobile_no_verified: boolean
    latitude: number
    longitude: number
    slug: string
    created_at: string
}

export type CurrentLocation = {
    type: string
    coordinates: [number, number]
}