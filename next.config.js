const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
module.exports = {
  env: {
    DATABASE_URL:  "mongodb://testuser:develop1234@mongodb1.webrahost.eu:27017/testuser?authSource=testdatabase?retryWrites=true&w=majority"
  },
  distDir: 'build'
}
module.exports = withBundleAnalyzer({});
 