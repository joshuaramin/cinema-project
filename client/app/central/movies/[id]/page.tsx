import { getClient } from '@/lib/apollo/apolloClient';
import { GetMoviesByIds } from '@/lib/apollo/query/movies.query';
import Template from '@/lib/ui/central/template'
import React from 'react'


type Props = {
    params: { id: string }
}


export async function generateMetadata({ params }: Props) {
    const { id } = await params;

    const data = await getClient().query({
        query: GetMoviesByIds,
        variables: {
            moviesId: id,
            input: {
                take: 20,
                page: 1
            }
        }
    })


    return {
        title: data?.data?.getMoviesById?.name,
        descriptions: data?.data.getMoviesById.description
    }
}

export default async function MoviesIDPage({ params }: Props) {

    const { id } = await params;

    const data = await getClient().query({
        query: GetMoviesByIds,
        variables: {
            moviesId: id,
            input: {
                take: 20,
                page: 1
            }
        }
    })


    console.log(data)

    return (
        <Template name={data?.data?.getMoviesById?.name} goback={true}>
            <div>MoviesIDPage</div>
        </Template>
    )
}
