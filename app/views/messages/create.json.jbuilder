json.content  @message.content
json.user_id  @message.user.id
json.user_name  @message.user.name
json.image  @message.image.url
json.date   @message.created_at.strftime("%Y%m%d%H%M%S")