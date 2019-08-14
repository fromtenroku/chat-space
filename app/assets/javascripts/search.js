$(document).on("turbolinks:load", function() {

  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });


  var search_added = $("#chat-group-users");

  function addUser(id, name) {
  var html = `<div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${ id }'>
              <p class='chat-group-user__name'>${ name }</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  search_added.append(html);
  }

  $(window.document).on("click", ".chat-group-user__btn--add", function() {
      var id = $(this).data('user-id');
      var name = $(this).data('user-name');
      addUser(id, name)
      $(this).parent().remove();
    });

    search_added.on("click", ".js-remove-btn", function() {
      $(this).parent().remove();
    }); 

});