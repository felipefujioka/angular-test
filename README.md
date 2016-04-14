# angular-test

This simple project is a lab using a ruby server using Sinatra and Angular.js to control the page.

To setup the project install ruby if you don't have it already. For Mac users the default ruby version is fine, for those
running Linux just install it using:

```shell
$ sudo apt-get install ruby-full
```

Having Ruby successfully installed navigate to the project root directory and install all the dependencies:

```shell
$ cd {project location}
$ bundle install
```

This will check the Gemfile and search for uninstalled dependencies to make sure your environment have everything to 
run the project.

Ok, now we are good to go, just type:

```shell
$ ruby app/app.rb
```

Go to your browser and enter the URL http://localhost:4567/easynvestLogin
