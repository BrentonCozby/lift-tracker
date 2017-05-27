import { resolve } from 'path'

export const rootUrl = (process.env.NODE_ENV === 'production')
    ? '/'
    : '/'

export const title = 'React Frontend Boilerplate'
export const description = 'Boilerplate for a frontend react project'
export const site_url = 'example.com'

export const Dir = {
    src: resolve(__dirname, 'src'),
    views: resolve(__dirname, 'src', 'views'),
    pages: resolve(__dirname, 'src', 'views', 'pages'),
    dist: resolve(__dirname, 'dist'),
    assets: resolve(__dirname, 'assets'),
    images: resolve(__dirname, 'assets', 'images')
}
