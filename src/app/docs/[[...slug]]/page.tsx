type DocsProb = {
    params: {
        slug: string[]
    }
}

export default function Docs({ params }: DocsProb) {
    if (params.slug?.length === 2) {
        return (
            <>
                <h1>Docs Feature: {params.slug[0]}.</h1>
                <h2>Concept: {params.slug[1]}</h2>
            </>
        );
    } else if (params.slug?.length === 1) {
        return (<h1>Docs Feature: {params.slug[0]}</h1>)
    }

    return <h1>Docs home page!</h1>
}