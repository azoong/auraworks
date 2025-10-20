'use server';

import { createServerSupabase, createServerSupabaseAdmin } from '@/lib/supabase/server';

export async function getHero() {
  const supabase = await createServerSupabaseAdmin();

  const { data: fileList, error: listError } = await supabase.storage
    .from(process.env.NEXT_SUPABASE_STORAGE_BUCKET!)
    .list('hero');

  if (listError) {
    console.error('Error fetching hero images:', listError);
    return [];
  }

  const imageUrls = fileList.map((file) => {
    const filePath = `hero/${file.name}`;

    const { data } = supabase.storage.from(process.env.NEXT_SUPABASE_STORAGE_BUCKET!).getPublicUrl(filePath);
    return data.publicUrl;
  });
  return imageUrls;
}

export async function getProgramImages() {
  const supabase = await createServerSupabaseAdmin();

  const { data: fileList, error: listError } = await supabase.storage
    .from(process.env.NEXT_SUPABASE_STORAGE_BUCKET!)
    .list('program');

  if (listError) {
    console.error('Error fetching program images:', listError);
    return [];
  }

  const imageUrls = fileList.map((file) => {
    const filePath = `program/${file.name}`;

    const { data } = supabase.storage.from(process.env.NEXT_SUPABASE_STORAGE_BUCKET!).getPublicUrl(filePath);
    return data.publicUrl;
  });
  return imageUrls;
}

export async function getSearchReviews({ searchInput = '' }) {
  const supabase = await createServerSupabase();
  const searchTerm = `%${searchInput.trim()}%`;

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .or(`title.ilike.${searchTerm},author.ilike.${searchTerm},content.ilike.${searchTerm},username.ilike.${searchTerm}`);

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  return data;
}
