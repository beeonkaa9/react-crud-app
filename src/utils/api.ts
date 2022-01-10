import ky from 'ky'

const api = ky.create({ prefixUrl: 'https://nestjs-bank-app.herokuapp.com' })

export default api
