/**
 * Grabs images from the first page of reddit and saves them locally.
 *
 * This was just an exercise.  It's not something I needed to do in real life!
 */

var request = require('request'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  entries = [];

request('http://www.reddit.com', function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(body);

      $('a.title', '#siteTable').each(function() {
        var url = $(this).attr('href');

        if (url.indexOf('i.imgur.com') != -1) {
          entries.push(url);
        }
      });

      entries.forEach(function(item, index) {
        request(item).pipe(fs.createWriteStream('img/' + index + '.jpg'));
      });
    }
  });