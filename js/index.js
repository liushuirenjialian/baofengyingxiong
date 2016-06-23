$(document).ready(function(){

  // 选项卡
	 var $img_one=$('.game_info').find('.img_o');
  var $img_z=$('.game_info').find('.img_z');
  var $img_t=$('.game_info').find('.img_t');
  var $img_f=$('.game_info').find('.img_f');
  var $img_fi=$('.game_info').find('.img_fi');
  var $img_s=$('.game_info').find('.img_s');
  // 背景图
  var $img_b=$('.game_info').find('div.infoma_img img');

   $img_z.siblings('ul.content img').addClass('mengceng');
      $img_one.click(function(){
     $(this).removeClass('mengceng');
    $img_b.attr('src','img/info_game/hover_qishi_07.jpg')
   $img_one.siblings('ul.content img').addClass('mengceng');
  });
 $img_z.click(function(){
  $(this).removeClass('mengceng');
  $img_b.attr('src','img/info_game/back_22.jpg')
$img_z.siblings('ul.content img').addClass('mengceng');
 });
 $img_t.click(function(){
  $(this).removeClass('mengceng');
  $img_b.attr('src','img/info_game/hover_fashi_07.jpg')
  $img_t.siblings('ul.content img').addClass('mengceng');
 });
  $img_f.click(function(){
  $(this).removeClass('mengceng');
  $img_b.attr('src','img/info_game/hover_cike_10.jpg')
  $img_f.siblings('ul.content img').addClass('mengceng');
   });
 $img_fi.click(function(){
  $(this).removeClass('mengceng');
  $img_b.attr('src','img/info_game/hover_sheshou_11.jpg')
  $img_fi.siblings('ul.content img').addClass('mengceng');
  });
 $img_s.click(function(){
  $(this).removeClass('mengceng');
  $img_b.attr('src','img/info_game/hover_jianshi_07.jpg');
  $img_s.siblings('ul.content img').addClass('mengceng');
  })

      request(news_url, function(err, data) { //新闻
        if (err) {
            console.log(err);
        } else {
            var _data = data.posts;
            var newest_data=getDataList(235,_data);
            var news_data = getDataList(236, _data);
            var gonggao_data = getDataList(237, _data);
            var activity_data = getDataList(238, _data);
            var $content = $('div.news_info').find('ul.conte');

            // var $newest = $('div.news').find('ul.title').find('li.newest');
            var $news = $('div.news_info').find('ul.title').find('li.news_content');
            var $activity = $('div.news_info').find('ul.title').find('li.activity');
            var $gonggao = $('div.news_info').find('ul.title').find('li.gonggao');
            var $zuixin=$('div.news_info').find('ul.title').find('li.zuixint');
            $content.html(getNewsLis(newest_data, '【最新消息】', 235));
         setMoreTag();

            $zuixin.click(function() {
                $zuixin.siblings('li').removeClass('cur');
                $zuixin.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(newest_data, '【最新消息】',235));
            });
            $activity.click(function() {
                $activity.siblings('li').removeClass('cur');
                $activity.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(activity_data, '【活动】', 238));
            });
            $gonggao.click(function() {
                $gonggao.siblings('li').removeClass('cur');
                $gonggao.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(gonggao_data, '【公告】', 237));
            });
               $news.click(function() {
                $news.siblings('li').removeClass('cur');
                $news.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(news_data, '【新闻】', 236));
            });

        }
    });
})

var news_url = "http://games.hoolai.com/cms/?cat=234&json=get_category_posts&include=title,categories,date&count=500";

// 四个的下一页
// 
function setMoreTag(){
    var $more = $('div.news_info').find('a.more');
    var $newsTitle = $('div.news_info').children('ul.title').children('li');
    var tag = 236;
    var $cur;
    $newsTitle.each(function() {
        if ($(this).hasClass('cur')) {
            $cur = $(this);
        }
    });

    if ($cur.hasClass('news_content')) {
        tag = 236;
    }
    if ($cur.hasClass('gonggao')) {
        tag = 237;
    }
    if ($cur.hasClass('activity')) {
        tag = 238;
    }
    if($cur.hasClass('zuixint')){
    	tag=235;
    }
    $more.attr('href', 'list.html?tag=' + tag);
}

function getDate(date) {
    var _date = date.substr(6, 5);
    return _date;
}
function getNewsLis(dataList, mark, tag) {
    var lis_str = '';
    var data;
    if (dataList) {
        var data_len = dataList.length;
        if (data_len >= 4) {
            for (var i = 0; i < 4; i++) {
                data = dataList[i];
                lis_str += '<li><span class="sign si">' + mark + '</span><a href="detail.html?post_id=' + data.id + '&tag=' + tag + '">' + data.title + '</a><span class="time ti">' + getDate(data.date) + '</span></li>'
            }
        } else {
            for (var i = 0; i < data_len; i++) {
                data = dataList[i];
                lis_str += '<li><span class="sign si">' + mark + '</span><a href="detail.html?post_id=' + data.id + '&tag=' + tag + '">' + data.title + '</a><span class="time ti">' + getDate(data.date) + '</span></li>'
            }
        }
    }
    return lis_str;
}
function getDataList(cat, posts){
    var posts_len = posts.length;
    var dataList = [];
    if (posts_len == 0) {
        return null;
    }
    for (var j = 0; j < posts_len; j++){
        var cat_len = posts[j].categories.length;
        for(var i=0;i<cat_len;i++){
          if(posts[j].categories[i].id==cat){
            dataList.push(posts[j]);
          }
        }
    }
    return dataList;
}
function request(url, cal) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(resp) {
            cal(false, resp);
        },
        error: function(resp) {
            cal(resp)
        }
    });
}
