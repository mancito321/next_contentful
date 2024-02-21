import './recipes.styles.scss'
import { getPageData } from "@/app/_utils/get-page-data"
import { getRecipe } from "@/app/_utils/get-recipe"
import { RecipeCardProps } from "@/components";
import Image from "next/image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


export async function generateStaticParams() {
  const recipes = await getPageData()

  return recipes.map((item) => ({
    slug: item.fields.slug,
  }))
}

export default async function RecipeDetails({ params }: { params: { slug: string } }) {
  const { slug } = params
  const recipeData = await getRecipe(slug) as unknown as RecipeCardProps["recipe"]
  if (!recipeData) {
    return null
  }
  const { title,  cookingTime,
    featureImage,
    ingredients,
    method } = recipeData.fields
  console.log('pageData recipe')
  return (
    <div className="recipe-block">
      <div className="banner">
        { featureImage && (
          <Image src={`https:${featureImage.fields.file.url}`} width={featureImage.fields.file.details.image.width} height={featureImage.fields.file.details.image.height} alt={title}/>
        )}
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Take about {cookingTime} minutes to cook</p>
        <h3>Ingredients:</h3>
        <span>{ingredients.toString()}</span>
        <div className="method">
            <h3>Method:</h3>
            <div>{documentToReactComponents(method)}</div>
        </div>
      </div>
    </div>
  )
}