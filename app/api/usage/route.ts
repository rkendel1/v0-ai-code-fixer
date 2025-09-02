import { type NextRequest, NextResponse } from "next/server"
import { getUserUsage, incrementAIFixUsage, incrementHumanFixUsage, createDefaultUserUsage } from "@/lib/database"
import { getUserIdFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Try to get existing usage data
    let usage = await getUserUsage(userId);
    
    // If no usage data exists, create default data for new user
    if (!usage) {
      await createDefaultUserUsage(userId);
      usage = await getUserUsage(userId);
    }
    
    if (!usage) {
      return NextResponse.json({ error: "Failed to fetch usage data" }, { status: 500 });
    }

    return NextResponse.json(usage);
  } catch (error) {
    console.error("Usage API error:", error);
    return NextResponse.json({ error: "Failed to fetch usage data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { action, type } = await request.json();

    let success = false;

    if (action === "increment" && type === "ai_fix") {
      success = await incrementAIFixUsage(userId);
    } else if (action === "increment" && type === "human_fix") {
      success = await incrementHumanFixUsage(userId);
    } else {
      return NextResponse.json({ error: "Invalid action or type" }, { status: 400 });
    }

    if (!success) {
      return NextResponse.json({ error: "Failed to update usage" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Usage update error:", error);
    return NextResponse.json({ error: "Failed to update usage" }, { status: 500 });
  }
}
