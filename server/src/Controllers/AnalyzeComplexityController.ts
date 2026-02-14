import {Request,Response} from 'express';
import OpenAI from 'openai';
export const analyzeComplexity=async(req:Request,res:Response)=>{
const {userCode,language}=req.body;
if(!userCode || !language){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const client=new OpenAI({
    apiKey:process.env.COMPLEXITY_CHECKER
})

const prompt=`
Analyze the following code and estimate:
- Time Complexity (worst case)
- Space Complexity (worst case)

Rules:
- Use Big-O notation
- If unclear, give the most reasonable estimate
- Respond strictly in JSON with keys: time, space, reason

Language: ${language}

Code:
${userCode}
`;


try{
       const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0
    });
    //choices here means first reply of ai message is actual message of ai
    //and content is type of ai reply it is in string we have to convert it into json format using 
    //JSON.parse
    const content=response.choices[0].message.content || "{}";

    let analysis;
    try{
     analysis=JSON.parse(content);
    }catch(err){
        return res.status(500).json({
            message:"not able to response",
        });
    }
    return res.status(200).json({
        message:"successfull",
        data:{
            success:true,
            estimate:true,
            time:analysis.time,
            space:analysis.space,
            reason:analysis.reason,
        }
    })
}catch(err){
    console.log(err);
}
}