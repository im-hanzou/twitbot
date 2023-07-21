//MantodKaz
//twitBot from ID tweet
const fs = require('fs');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

// get ID tweet
fs.readFile('tweet_ids.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const tweetIds = data.trim().split('\n');

  // Iterasi melalui array tweetIds dan lakukan like dan retweet untuk setiap tweet ID
  tweetIds.forEach(tweetId => {
    likeAndRetweet(tweetId);
  });
});

function likeAndRetweet(tweetId) {
  // call endpoint POST favorites/create for like
  client.post('favorites/create', { id: tweetId }, function (error, likedTweet, response) {
    if (error) {
      console.error('Error liking tweet:', error);
      return;
    }

    // call endpoint POST statuses/retweet/:id for retweet
    client.post(`statuses/retweet/${tweetId}`, function (error, retweetedTweet, response) {
      if (!error) {
        console.log('Tweet ID:', retweetedTweet.id_str);
        console.log('Liked and Retweeted by:', retweetedTweet.user.screen_name);
        console.log('Retweet Text:', retweetedTweet.text);
      } else {
        console.error('Error retweeting tweet:', error);
      }
    });
  });
}
