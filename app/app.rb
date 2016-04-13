require 'sinatra'
require 'json'

get '/' do
	send_file File.join(settings.public_folder, 'views/index.html')
end

get '/easynvestLogin' do
	send_file File.join(settings.public_folder, 'views/easynvest-login.html')
end

get '/photos' do
	content_type :json
	[1,2,3,4,5,6,7,8,9,10].to_json
end