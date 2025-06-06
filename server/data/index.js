import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import db from './db.js'
import Auth from '../schema/AuthSchema.js'
import UserProfile from '../schema/UserProfile.js'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import Favourite from '../schema/FavouriteNews.js'
import { GoogleGenAI } from '@google/genai'
import chatModel from '../schema/UserChatBot.js'
import { useUser } from '@clerk/clerk-react'
dotenv.config()
const app = express();  
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000
const NEWS_KEY = process.env.NEWS_API_KEY
const NEWS_API_ENDPOINT = process.env.NEWS_API_ENDPOINT
const GEMINI_KEY = process.env.GEMINI_API_KEY


const ai = new GoogleGenAI({apiKey: GEMINI_KEY})
// const clerkUser = localStorage.getItem("userid");
app.post("/ai/chat", async (req, res) => {
    const { userInput, userId } = req.body;
    // const userId = clerkUser;

    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userInput
        });
        const text = result?.text || "No response";
        const newMessage = {
            user: userInput,
            ai: text,
            timestamp: new Date()
        }
        const userExist = await chatModel.findOne({ userId });

        if (!userExist) {
            const newUser = new chatModel({
                userId,
                messages: [newMessage]
            });
            await newUser.save();
        } else {
            userExist.messages.push(newMessage);
            await userExist.save();
        }
        return res.status(200).json(newMessage);
        

    } catch (error) {
        console.error("Chat error:", error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
});


app.get("/ai/get/chat/:userId", async (req, res) => {
    const userId = req.params.userId
    try {
        const isExist = await chatModel.findOne({userId});
        if(isExist) {
            return res.status(200).json({messages: isExist.messages})
        } else{
            return res.status(500).json({Messages: "User Not found"})
        }
    } catch (error) {
        return res.status(400).json({message: "Something went wrong"})
    }
})

const hashedPasswordMiddleWare = (req, res, next) => {
    const {password} = req.body;
    bcryptjs.hash(password, 10, (error, hashedPassword) => {
        if(error) {
            res.status(500).json({message: "Error in hashedPassword"})
        }
        req.body.password = hashedPassword;
        next();
    })
}

app.post("/api/signup", hashedPasswordMiddleWare, async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password) {
            res.status(500).json({message: "Please fill all the required fields"})
        } else{
            const isAlreadyExist = await Auth.findOne({email})
            if(isAlreadyExist) {
                res.status(500).json({message: "User already exist"})
            } else{
                const authUser = new Auth({email, password, firstName, lastName});
                await authUser.save();
                const userProfile = new UserProfile({
                    userId: authUser._id
                })

                await userProfile.save();
                return res.status(200).json({message: "User registered Successfully", user : {id: authUser._id}})
            }
        }
    } catch (error) {   
        return res.status(400).json(error)
    }
})

app.post("/api/signin", async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(500).json({message: "Plese fill the required fields"})
    }

    const user = await Auth.findOne({email});
    if(!user) {
        res.status(500).json({message: "User not found"})
    }

    const checkPass = await bcryptjs.compare(password, user.password)
    if(!checkPass) {
        res.status(500).json({message: "Invalid Password"})
    }

    res.status(200).json({message: "Logged in Successfully", loggedUser : {user}})
})

app.post("/api/fav", async (req, res) => {
    const {userId, newsData, isOpenFavourite} = req.body;
    try {
        if(isOpenFavourite) {
            const updatedNewsList = await Favourite.findOneAndUpdate(
                {userId: userId},
                {
                    $pull: {
                        newsList: {
                            data: newsData,
                            shared: [""]
                        }
                    }
                },
                {upsert: true, new: true}
            )
            if(!updatedNewsList) {
                return res.status(500).json({message: "Error removing favourite news"})
            }
            return res.status(200).json({message: "Favourite news removed", detail: updatedNewsList})
        } else{

            const isAlreadyExist = await Favourite.findOne({
                userId: userId,
                "newsList.data.title" :newsData.title
            })

            if(!isAlreadyExist) {
                const updatedNewsList = await Favourite.findOneAndUpdate(
                    {userId: userId},
                    {
                        $push: {
                            newsList: [{
                                data: newsData,
                                shared: [""]
                            }]
                        }
                    },
                    {upsert: true, new: true}
                )
                if(!updatedNewsList) {
                    return res.status(500).json({message: "Error adding favourite news"})
                }
                return res.status(200).json({message: "Favourite news Added", detail: updatedNewsList})
            } else{
                return res.status(500).json({message: "Already Exist your news"})
            }
        }
    } catch (error) {
        return res.status(400).json(error)
    }
})

/*
when we fetch using get like /api/fav/:userid
-> use req.params.userid
-> Api cal should be : http://localhost:5000/api/fav/121312132
app.get('/api/fav/:userid', async (req, res) => {
  const userId = req.params.userid;

  try {
    const favNews = await Favourite.findOne({ userId });

    if (!favNews) {
      return res.status(404).json({ message: 'No favourites found for this user' });
    }

    res.status(200).json(favNews.newsList);
  } catch (error) {
    console.error('Error fetching favourite news:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

when we fetch using get like /api/fav and want to get an id
-> Use req.query.userid
-> api call should be : http://localhost:5000/api/fav?userid=232424
*/
app.get('/api/fav/', async (req, res) => {
  const userId = req.query.userid;
  try {
    const favNews = await Favourite.findOne({ userId });

    if (!favNews) {
      return res.status(404).json({ message: 'No favourites found for this user', favNews: favNews });
    }

    res.status(200).json(favNews.newsList);
  } catch (error) {
    console.error('Error fetching favourite news:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const date = new Date();
const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
app.get("/feed/news/", async (req, res) => {
    
    try {
        const {pageSize, pageNum, language, category, country, source} = req.query
        const params = new URLSearchParams({
            q: "tesla",
            from: formattedDate,
            sortBy: "publishedAt",
            pageSize,
            page: pageNum
          });
          
          if (language) params.append("language", language);
          if (country) params.append("country", country); 
          if (category) params.append("category", category); 
        //   console.log(`${NEWS_API_ENDPOINT}${source}?${params.toString()}&apiKey=${NEWS_KEY}`)

        const response = await fetch(`${NEWS_API_ENDPOINT}${source}?${params.toString()}&apiKey=${NEWS_KEY}`)
        

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else if (data.code === "parameterInvalid") {
            return res.status(400).json({ message: "Hmm... nothing here right now. Try using different filters." });
        } else {
            return res.status(response.status).json({ message: data.message || "Something went wrong." });
        }
        
    } catch (error) {
        return res.status(500).json({"Error ": error})
    }
})                                                              

app.listen(port, () => {
    console.log("Running on port:", port)
})