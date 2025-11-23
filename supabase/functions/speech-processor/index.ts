import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SpeechData {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

interface ScrollSpeedResponse {
  scrollSpeed: number;
  wordsPerMinute: number;
  isSpeaking: boolean;
}

function calculateWordsPerMinute(transcript: string): number {
  const words = transcript.split(/\s+/).filter((w) => w.length > 0);
  return Math.max(0, words.length);
}

function calculateScrollSpeed(
  wordsPerMinute: number,
  sensitivity: number
): number {
  if (wordsPerMinute === 0) return 0;

  const averageWPM = 150;
  const normalizedSpeed = Math.max(
    0.1,
    Math.min(10, (wordsPerMinute / averageWPM) * 5)
  );
  const adjustedSpeed = normalizedSpeed * (sensitivity / 5);

  return Math.round(adjustedSpeed * 100) / 100;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const { transcript, sensitivity, isFinal } = body;

    if (!transcript || typeof transcript !== "string") {
      return new Response(
        JSON.stringify({
          error: "Invalid input: transcript is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const sens = typeof sensitivity === "number" ? sensitivity : 5;
    const wpm = calculateWordsPerMinute(transcript);
    const scrollSpeed = calculateScrollSpeed(wpm, sens);

    const response: ScrollSpeedResponse = {
      scrollSpeed: scrollSpeed,
      wordsPerMinute: wpm,
      isSpeaking: wpm > 0,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing speech:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to process speech data",
        scrollSpeed: 0,
        wordsPerMinute: 0,
        isSpeaking: false,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
