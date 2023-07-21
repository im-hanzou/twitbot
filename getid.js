const fs = require('fs');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

const screenName = 'NamaPengguna'; // Ganti dengan nama pengguna akun Twitter yang ingin Anda lihat tweet-nya
const params = {
  screen_name: screenName,
  count: 200 // Jumlah tweet per halaman (maksimal 200)
};

let allTweets = [];

// Fungsi untuk mengambil seluruh tweet menggunakan teknik pengambilan halaman (paging)
function getAllTweets(cursor) {
  params.max_id = cursor;

  // Panggil endpoint GET statuses/user_timeline
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      if (tweets.length > 1) {
        allTweets = allTweets.concat(tweets.slice(1));
        getAllTweets(tweets[tweets.length - 1].id_str);
      } else {
        // Semua tweet telah diambil, simpan dalam file "all_tweets.txt"
        const tweetIds = allTweets.map(tweet => tweet.id_str);
        fs.writeFile('all_tweets.txt', tweetIds.join('\n'), 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err);
          } else {
            console.log('Tweet ID dari akun @' + screenName + ' telah disimpan dalam file "all_tweets.txt".');
          }
        });
      }
    } else {
      console.error('Error:', error);
    }
  });
}
getAllTweets();
