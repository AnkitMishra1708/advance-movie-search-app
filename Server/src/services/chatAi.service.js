import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateMovieResponse = async (message) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            You are CineBot, an AI movie assistant.

            You help users with:
            - movie recommendations
            - genres
            - actors
            - directors
            - movie summaries
            - similar movies
            - trending films
            
            Never answer unrelated questions.
            
            User Question:`,
        },
        {
          role: "user",
          content: message,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log(error);

    return "Something went wrong";
  }
};
