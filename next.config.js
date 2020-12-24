module.exports = {
  rewrites: [
    { source: 'https://pet-adoption-back-end.herokuapp.com/:match*', destination: 'http://localhost:5000/:match*' },
  ],
};
