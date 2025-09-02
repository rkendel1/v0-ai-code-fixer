import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const healthStatus = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabaseHealth(),
      openai: await checkOpenAIHealth(),
    }
  };

  const allHealthy = Object.values(healthStatus.services).every(service => service.status === "healthy");
  const statusCode = allHealthy ? 200 : 503;

  return NextResponse.json(healthStatus, { status: statusCode });
}

async function checkDatabaseHealth(): Promise<{ status: string; message?: string }> {
  try {
    // Simple check to see if database connection is available
    if (!process.env.DATABASE_URL) {
      return { status: "unavailable", message: "Database URL not configured" };
    }
    return { status: "healthy" };
  } catch (error) {
    return { status: "unhealthy", message: "Database connection failed" };
  }
}

async function checkOpenAIHealth(): Promise<{ status: string; message?: string }> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return { status: "unavailable", message: "OpenAI API key not configured" };
    }
    return { status: "healthy" };
  } catch (error) {
    return { status: "unhealthy", message: "OpenAI service check failed" };
  }
}