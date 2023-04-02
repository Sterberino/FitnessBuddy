const express = require('express')
const request = require('request')

const FoodSearch = async (req, res)=>{
    const query = req.query;
    const foodName = query ? req.query.foodName : null;
    var API_Response = {
        error: '',
        payload: {}
    };

    if(foodName)
    {
        try{
            request.get({
                url: 'https://api.calorieninjas.com/v1/nutrition?query='+foodName,
                headers : {
                    'X-Api-Key' : process.env.CALORIE_NINJAS_API_KEY
                }
            }, (error, response, body) => {
                if(error)
                {
                    API_Response = {
                        error : "Something Went Wrong"
                    }
                    return res.status(400).json(API_Response);
                }
                else if(response.statusCode != 200)
                {
                    API_Response = {
                        error : "Something Went Wrong"
                    }
                    return res.status(400).json(API_Response); 
                }
                else{
                    API_Response = {
                        payload: JSON.parse(response.body).items
                    }
                    return res.status(200).json(API_Response);
                }
            })
        }catch(err)
        {
            console.log(err);
            API_Response = {
                error : "No Query Provided"
            }
            return res.status(400).json(API_Response); 
        }
       
    }
    else{
        API_Response = {
            error : "No Query Provided"
        }
        return res.status(400).json(API_Response); 
    }
}

module.exports = {
    FoodSearch
}