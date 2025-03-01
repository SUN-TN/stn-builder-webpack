const glob = require('glob-all')

describe('Checking generated css files', () => {
    it('should generate css files', (done) => {
        const files = glob.sync([
            './dist/index_*.js',
            './dist/search_*.js',
            './dist/search_*.css'
        ])

        if (files.length > 0) {
            done()
        } else {
            throw new Error('No css files generated')
        }
    })
})