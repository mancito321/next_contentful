import './RecipeCard.style.scss'
import { Entry, EntrySkeletonType } from "contentful";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Document } from '@contentful/rich-text-types';

export type RecipeCardProps = {
  recipe: Entry<EntrySkeletonType, undefined, string> & {
    fields: {
      title: string,
      cookingTime: number,
      thumbnail: ContentfulAssetImageObject,
      featureImage: ContentfulAssetImageObject,
      ingredients: string[],
      method: Document
    }
  }
}
type ContentfulAssetImageObject = Entry<EntrySkeletonType, undefined, string>  & {
  fields: {
    file: {
      url: string
      details: {
        image:{
          width: number,
          height: number
        }
      }
    }
  }
}

export default function  RecipeCard({recipe} : RecipeCardProps) {
  const { title, slug, cookingTime, thumbnail,
    featureImage,
    ingredients,
    method } = recipe.fields
  return (
    <div className='card'>
      <div className="featured">
        {/* <img src={thumbnail.} alt={title as string} /> */}
        <Image src={`https:${thumbnail.fields.file.url}`} width={thumbnail.fields.file.details.image.width} height={thumbnail.fields.file.details.image.height} alt={title}/>
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins to make</p>
        </div>
        <div className="actions">
          <Link href={`/recipes/${slug}`} >
              cook this
          </Link>
        </div>
      </div>
      {title}
    </div>
  )
}