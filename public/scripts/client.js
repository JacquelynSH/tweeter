/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("#text-form").submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const decodeData = decodeURI(formData).slice(5).length;
    const maxLength = 140;
    console.log(decodeData);

    if (!decodeData) {
      const emptyError = $(".empty-tweet-error").slideDown("slow");
      return;
    }
    if (decodeData > maxLength) {
      const lengthError = $(".long-tweet-error").slideDown("slow");
      return;
    } else {
      $(".long-tweet-error").slideUp("fast");
      $(".empty-tweet-error").slideUp("fast");
    }
      
  $.ajax('/tweets', {method: 'POST', data: $(this).serialize()})
      .then(function() {
        $('#tweets-container').empty();
        loadTweets();
        $("#tweet-text").val('');
        $('#characters').text(140);
      });
  });

  const renderTweets = function(tweets) {
    console.log("TWEETS", tweets);
    for (const tweet of tweets) {
      const element = createTweetElement(tweet);
      $('#tweets-container').prepend(element);
    }
  };

  function loadTweets() {
    $.ajax('/tweets', {method: 'GET', dataType: 'JSON'})
      .then(function (tweetData) {
        console.log("success!:", tweetData);
        renderTweets(tweetData);
      });
  }
  loadTweets();
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  let $tweet =  `<article class="tweet-container">
  <header>
    <div class="user-icon">
      <img src=${tweet.user.avatars}>
      <span class="name-of-user">${escape(tweet.user.name)}</span>
    </div>
      <span class="user-name">${escape(tweet.user.handle)}</span>
  </header>
    <div class="user-tweet"><strong>${escape(tweet.content.text)}</strong></div>
  <footer>
    <p>${timeago.format(tweet.created_at)}</p>
    <div class="tiny-icons">
      <div class="flag-icon"><i class="fa-solid fa-flag"></i></div>
      <div class="retweet-icon"><i class="fa-solid fa-retweet"></i></div>
      <div class="thumbs-icon"><i class="fa-solid fa-thumbs-up"></i></div>
    </div>
  </footer>
</article>`;
  return $tweet;
};





