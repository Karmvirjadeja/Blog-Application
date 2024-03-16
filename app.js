//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
/*const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
*/
const homeStartingContent = `Welcome to our free blog creation platform! Whether you're a seasoned blogger or just starting out, we're here to help you create a stunning blog that reflects your unique style and interests. With our user-friendly tools and templates, you can easily design and customize your blog without any technical expertise.

Why choose our platform?
- Free to Use: Our platform is completely free to use, with no hidden fees or subscriptions.
- Easy to Use: Our intuitive drag-and-drop editor makes it easy to create and customize your blog.
- Beautiful Templates: Choose from a variety of professionally designed templates to make your blog stand out.
- Custom Domain: You can use your own custom domain name for your blog.
- SEO Friendly: Our platform is optimized for search engines, helping your blog get discovered online.
- Mobile Responsive: Your blog will look great on all devices, from desktops to smartphones.`;

const aboutContent = `Welcome to Daily Journel, a platform dedicated to empowering bloggers of all levels to share their stories, passions, and expertise with the world. Whether you're a seasoned writer or just starting out, our goal is to provide you with the tools and resources you need to create a successful blog.

At  Daily Journel , we believe that everyone has a story to tell and that blogging is a powerful medium for sharing those stories. Our platform is designed to be user-friendly, allowing you to create and customize your blog with ease. With a wide range of beautiful templates to choose from, you can create a blog that reflects your unique style and personality.

What sets us apart is our commitment to providing a free and accessible platform for bloggers. We believe that blogging should be open to everyone, regardless of their background or financial means. That's why our platform is completely free to use, with no hidden fees or subscriptions.

Our platform is also optimized for search engines, making it easier for your blog to be discovered online. We understand the importance of SEO in building an audience and are committed to helping you maximize the visibility of your blog.

Whether you're passionate about travel, food, fashion, or any other topic, Daily Journel is here to support you on your blogging journey. Join us today and start sharing your voice with the world!`;



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const URL=`mongodb+srv://Karmvir:KingKarma@blog-app.lhfvpja.mongodb.net/blog-app?retryWrites=true&w=majority&appName=blog-app`;
mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, });

const postSchema = mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);


app.get('/', function(req, res){
  Post.find({}, function(err, foundPosts){
    if(!err){
      res.render('home.ejs', {startingContent: homeStartingContent, posts: foundPosts});
    }
  });
});

app.get('/about', function(req, res){
  res.render('about.ejs', {aboutContent: aboutContent});
});

app.get('/contact', function(req, res){
  res.render('contact.ejs');
});

app.get('/compose', function(req, res){
  res.render('compose.ejs');
});

app.post('/compose', function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  post.save();

  res.redirect('/');
});

app.get('/posts/:postId', function(req, res){
  const requestedId = req.params.postId;
  Post.findOne({_id: requestedId}, function(err, postFound){
    if(!err){
      res.render("post.ejs", {postTitle: postFound.title, postContent: postFound.content});
    }
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
