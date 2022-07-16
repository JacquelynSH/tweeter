/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$( document ).ready(function() {
  $( "#text-form" ).submit(function( event ) {
    event.preventDefault();
    console.log($(this).serialize())

  });
  function loadTweets(){

     $.ajax('/tweets', {method: 'GET', dataType: 'JSON'})
     .then(function (tweetData) {
        console.log("success!:", tweetData);
        renderTweets(tweetData);
  });
}
  loadTweets();
});

const renderTweets = function(tweets) {
  console.log("TWEETS", tweets)
  for (const tweet of tweets) {
    const element = createTweetElement(tweet)
    $('#tweets-container').append(element);
  }
}

const createTweetElement = (tweet) => {
let $tweet =  `<article class="tweet-container">
  <header>
    <div class="user-icon">
      <img src=${tweet.user.avatars}>
      <span class="name-of-user">${tweet.user.name}</span>
    </div>
      <span class="user-name">${tweet.user.handle}</span>
  </header>
    <div class="user-tweet"><strong>${tweet.content.text}</strong></div>
  <footer>
    <p>${timeago.format(tweet.created_at)}</p>
    <div class="tiny-icons">
      <div class="flag-icon"><i class="fa-solid fa-flag"></i></div>
      <div class="retweet-icon"><i class="fa-solid fa-retweet"></i></div>
      <div class="thumbs-icon"><i class="fa-solid fa-thumbs-up"></i></div>
    </div>
  </footer>
</article>`
return $tweet;
}





