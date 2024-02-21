
import {getPageData } from "./_utils/get-page-data"
import { RecipeCard, RecipeCardProps } from "../components"

// type recipeEntries = {
//   recipes: Entry<EntrySkeletonType, undefined, string>[]
// } 

// Recipes.getInitialProps = async (ctx: NextPageContext) => {
//   const client = await createClient({
//     accessToken: process.env.CONTENTFUL_ACCESS_ID??'' ,
//     space: process.env.CONTENTFUL_SPACE_ID??''
//   });
//   const res = await client.getEntries({content_type: 'recipe'})
//   console.log('res')
//   console.log(res)
//   return { props: { recipes: res.items} }
// }

export default async function Recipes() {
  const pageData = await getPageData()
  console.log('something')
  console.log('recipes')
  console.log(pageData)
  return (
    <div className="recipe-list">
      {pageData.map(recipe => {

        return <RecipeCard recipe={recipe as unknown as RecipeCardProps["recipe"]} key={recipe.sys.id}/>
      })}
    </div>
  )
}
