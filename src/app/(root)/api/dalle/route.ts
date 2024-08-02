import OpenAI from "openai";
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: message,
      n: 1,
      size: "1024x1024",
      response_format: 'b64_json'
    })

    return NextResponse.json({ message: response.data[0].b64_json})
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at dalle endpoint" },
      { status: 500 }
    )
  }
}
