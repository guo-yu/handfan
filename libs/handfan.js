function countGithubStars() {
  var stars = [];
  var counts = 0;
  var dom = $('ul.js-repo-list');
  if (!dom.length) throw new Error('CountGithubStars can not find the dom');

  $('ul.js-repo-list > li.public').each(function() {
    var star = $(this).find('.repo-stats li.stargazers').text();
    if (star.indexOf(',') > -1) star = star.replace(',', '');
    star = parseInt(star, 10);
    stars.push(star);
    counts += star;
  });

  return {
    stars: stars,
    counts: counts
  };
}

// var counts = countGithubStars().counts;

// console.log(counts);

function findStarer() {
  var starers = [];
  var dom = $('#repos ol.follow-list');
  if (!dom.length) throw new Error('findStarer can not find the dom');

  var counts = $('#repos .tabnav .tabnav-tabs li:eq(0) span.counter').text();
  if (counts.indexOf(',') > -1) counts = counts.replace(',', '');

  var pagesize = 51;
  var page = counts / pagesize;
  if (page.toString().indexOf('.') > -1) page = parseInt(page + 1);
  console.log(page);

  // Page 1
  $('#repos ol.follow-list > li.follow-list-item').each(function() {
    var uri = $(this).find('>a').attr('href');
    starers.push({
      raw: uri,
      id: uri.substr(uri.indexOf('/') + 1),
      uri: 'https://github.com' + uri
    });
  });

  return starers;
}