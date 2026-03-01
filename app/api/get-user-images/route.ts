import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get("since");

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {

    const { data: userModels, error: modelsError } = await supabase
      .from("models")
      .select("id")
      .eq("user_id", user.id);

    if (modelsError) {
      console.error("Models fetch error:", modelsError);
      return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
    }

    const userModelIds = userModels?.map((m) => m.id) || [];

    if (userModelIds.length === 0) {
      return NextResponse.json({ images: [] });
    }

    let imagesQuery = supabase
      .from("images")
      .select("id, modelId, uri, created_at")
      .in("modelId", userModelIds);

    if (since) {
      imagesQuery = imagesQuery.gt("created_at", since);
    }

    let imagesData: any[] = [];
    try {
      const { data, error } = await imagesQuery;
      if (!error && Array.isArray(data)) {
        imagesData = data;
      } else {
        console.warn("Images fetch error or unavailable table/permissions:", error);
        imagesData = [];
      }
    } catch (e) {
      console.warn("Images fetch threw exception (treated as empty):", e);
      imagesData = [];
    }

    const imagesImages = (imagesData || []).map((image) => ({
      id: image.id,
      image_url: image.uri,
      promptId: image.id.toString(),
      user_id: user.id,
      created_at: image.created_at,
      source: "images",
    }));

    const combinedImages = [...imagesImages].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ images: combinedImages });
  } catch (error) {
    console.error("Unexpected error in get-user-images:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
