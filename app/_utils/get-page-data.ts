import { Entry, EntrySkeletonType, createClient, EntryFieldTypes } from "contentful";

export type RecipeSkeleton =
{
  contentTypeId: "slug",
  fields: {
    slug: EntryFieldTypes.Text,
    title: EntryFieldTypes.Text,
    thumbnail: EntryFieldTypes.AssetLink,
    featureImage: EntryFieldTypes.AssetLink,
    ingredients:  EntryFieldTypes.Text[],
    cookingTime: EntryFieldTypes.Number,
    method: EntryFieldTypes.Object
  }
}

export async function getPageData(): Promise<Entry<EntrySkeletonType, undefined, string>[]> {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_ID??'' ,
    space: process.env.CONTENTFUL_SPACE_ID??''
  });
  try {
    const res = await client.getEntries<RecipeSkeleton>({content_type: 'slug'})

    return res.items
  } catch (error) {
    //console.error(error)
    return []
  }
  
}