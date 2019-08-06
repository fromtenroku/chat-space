$(function(){
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message" src="${message.image}"></img>`: "";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    
    e.preventDefault();
    
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      console.log(message)
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.form__message').val('');
    })
    .fail(function(){
      alert('error');
    })
  })
})