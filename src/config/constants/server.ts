export default {
    // local
    baseUrl: "http://localhost:3000/api",
    // production
    imageUrl: function (url: string): string {
        return this.baseUrl + url
    },
    apiUrl: function (url: string = ''): string {
        return this.baseUrl + url
    },
    crypto: {
        AES_SECRET: 'kXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z',
        AES_IV: 'I8zyA4lVhMCaJ5Kg'
    }
}