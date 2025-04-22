import axios from "axios"

// OpenAI API
const OPENAI_API_KEY = "6bK1WtH7EwMUHtm1B4Pf7Tl5YZfFkbwzPYaXmEmYJTOJCqyCyOVvJQQJ99BBACHYHv6XJ3w3AAABACOGVGpy"
const OPENAI_ENDPOINT = "https://opennezt-openai-service.openai.azure.com/"
const OPENAI_MODEL = "openai/deployments/gpt-4/chat/completions"
const OPENAI_API_VERSION = "2024-08-01-preview"

const OPENAI_ANALYZE_PROMPT_MAX_TOKENS = 200
const OPENAI_ANALYZE_PROMPT_TEMPERATURE = 0.7
const OPENAI_ANALYZE_PROMPT_TOP_P = 0.9
const OPENAI_ANALYZE_PROMPT_FREQUENCY_PENALTY = 0
const OPENAI_ANALYZE_PROMPT_PRESENCE_PENALTY = 0
const OPENAI_ANALYZE_PROMPT_STOP = ["###"]

const initPrompt = (message) => {
  const messages = [
    {
      role: "system",
      content: `
You are an AI system that can answer any question I have.`,
    },
    {
      role: "user",
      content: message,
    },
  ]
  return messages
}

const openAI = async (message) => {
  try {
    const prompt = initPrompt(message)
    // Gửi prompt đến OpenAI API
    const response = await axios.post(
      `${OPENAI_ENDPOINT}${OPENAI_MODEL}?api-version=${OPENAI_API_VERSION}`,
      {
        messages: prompt,
        max_tokens: OPENAI_ANALYZE_PROMPT_MAX_TOKENS,
        temperature: OPENAI_ANALYZE_PROMPT_TEMPERATURE,
        top_p: OPENAI_ANALYZE_PROMPT_TOP_P,
        frequency_penalty: OPENAI_ANALYZE_PROMPT_FREQUENCY_PENALTY,
        presence_penalty: OPENAI_ANALYZE_PROMPT_PRESENCE_PENALTY,
        stop: OPENAI_ANALYZE_PROMPT_STOP,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": OPENAI_API_KEY,
        },
      }
    )
    // Kiểm tra phản hồi từ API
    if (response.data.error) {
      throw new Error(`OpenAI API Error: ${response.data.error.message}`)
    }
    console.log("Response from OpenAI API:", response.data)
    return response.data.choices[0].message.content
  } catch (error) {
    console.error("Error calling OpenAI API:", error.response ? error.response.data : error.message)
    return error
  }
}

export default openAI
