function request(url, cal) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(data) {
            cal(false, data);
        },
        error: function(data) {
            cal(data);
        }
    });
}

function getArgs(strs) {
    var _strs = strs.length > 0 ? strs.substring(1) : '',
        args = {},
        items = _strs.split('&'),
        len = items.length,
        mame = null,
        value = null,
        item = [];
    if (_strs.length == 0) {
        console.log('没有要读取的字符串');
        return;
    }
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = item[0];
        value = item[1];
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[name] = value;
    }
    return args;
}

function getDate(date) {
    var _date = date.substr(6, 5);
    return _date;
}
    var index = {};
 
function getLis(dataList, mark, tag) {
    var lis_str = '';
    var data, date;
    var total = dataList.length;
    var rows_once = 5;
    var p = -1;

    if (dataList) {
        var data_len = dataList.length;
        if(data_len > rows_once) {
            $('.news_info a.more').css('display','block');
        }
        for (var i = 0; i < data_len; i++) {
            data = dataList[i];

            if(i % rows_once == 0) {
                p++;
            }
            date = getDate(data.date);
            lis_str += '<li class="page' + p + '"><span class="sign si">' + mark + '</span><a href="detail.html?post_id=' + data.id + '&tag=' + tag + '">' + data.title + '</a><span class="time ti">' + date + '</span></li>';
        }
        index.countPage = p;
        index.page = 0;
        // $('div.content ul.content')
    }

    return lis_str;
}

function getMark(tag) {
    var mark = '';
    if (tag == 235) {
        mark = '【最新消息】';
    }
    if (tag == 236) {
        mark = '【新闻】';
    }
    if (tag == 238) {
        mark = '【活动】';
    }
    if (tag == 237) {
        mark = '【公告】';
    }
    return mark;
}

$(function(){
        $('div.news_info a.more').click(function () {
        index.page ++;
        $('.page' + index.page).show();
        if(index.page == index.countPage) {
            $('div.news_info a.more').hide();
        }
    });

    var hash=window.location.search;
    var args = getArgs(hash);
   var tag = args['tag'];
   /* var tag=235;*/
    console.log(tag);
    if (tag == 235 || tag == 236 || tag == 237 || tag == 238) { //nav当前页样式
        var $li = $('ul.nav').children('li');
        $li.each(function() {
            if ($(this).children('a').hasClass('news')) {
                $(this).addClass('cur');
            }
        });
    }


    var $head = $('div.news_info').find('ul.title li.other');

    if (tag == 235){
        $head.html('最新消息');
    }
    else if (tag==236) {
    	$head.html('新闻');
    }
      else if (tag==237) {
    	$head.html('公告');
    }
       else if (tag==238) {
    	$head.html('活动');
    }

    var url = "http://games.hoolai.com/cms/?cat=" + tag + "&json=get_category_posts&include=title,date&count=500";
    var mark = getMark(tag);
    request(url, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var _data = data.posts;

            var li_str = getLis(_data, mark, tag);
            $('div.news_info').find('ul.conte').html(li_str);

            $('div.news_info ul.conte').find('li').hide();
            $('li.page0').show();
        }
    });

});
