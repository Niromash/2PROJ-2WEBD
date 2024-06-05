const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export type ArtObject = {
    objectID: number;
    title: string;
    primaryImage: string;
    artistDisplayName: string;
    artistDisplayBio: string;
    dimensions: string;
    additionalImages: string[];
};

export type SearchRequest = {
    query: string;
    title?: string;
    tags?: string[];
    geoLocation?: string;
    dateYearBegin?: number;
    dateYearEnd?: number;
}

export async function getHighlights(query?: string): Promise<ArtObject[]> {
    const highlightsResponse = await fetch(`${baseURL}/search?isHighlight=true&hasImages=true&q=${query ?? 'dog'}`);
    if (!highlightsResponse.ok) {
        throw new Error(`Failed to fetch highlights: ${highlightsResponse.status}`);
    }

    const highlightsData = await highlightsResponse.json();
    if (!highlightsData.objectIDs) {
        return [];
    }
    const highlightObjectIds = highlightsData.objectIDs.slice(0, 10);

    const highlightDetailsPromises = highlightObjectIds.map(async (objectId: number) => {
        const objectResponse = await fetch(`${baseURL}/objects/${objectId}`);
        if (!objectResponse.ok) {
            throw new Error(`Failed to fetch object ${objectId}: ${objectResponse.status}`);
        }
        const objectData = await objectResponse.json();
        return {
            objectID: objectData.objectID,
            title: objectData.title,
            primaryImage: objectData.primaryImage,
            artistDisplayName: objectData.artistDisplayName,
        } as ArtObject;
    });

    const highlightDetails = await Promise.all(highlightDetailsPromises);
    return highlightDetails.filter((highlight) => highlight.primaryImage && highlight.artistDisplayName && highlight.title);
}

export async function getObjectDetails(objectId: number): Promise<ArtObject> {
    try {
        const objectResponse = await fetch(`${baseURL}/objects/${objectId}`);
        if (!objectResponse.ok) {
            throw new Error(`Failed to fetch object ${objectId}: ${objectResponse.status}`);
        }

        const objectData = await objectResponse.json();
        return {
            objectID: objectData.objectID,
            title: objectData.title,
            primaryImage: objectData.primaryImage,
            artistDisplayName: objectData.artistDisplayName,
            artistDisplayBio: objectData.artistDisplayBio,
            dimensions: objectData.dimensions,
            additionalImages: objectData.additionalImages,
        } as ArtObject;
    } catch (error) {
        console.error('Error fetching object details:', error);
        throw error;
    }
}

export async function advancedSearch(request: SearchRequest): Promise<ArtObject[]> {
    const searchParams = new URLSearchParams();
    if (request.query) {
        searchParams.append('q', request.query);
    }
    if (request.title) {
        searchParams.append('title', request.title);
    }
    if (request.tags) {
        searchParams.append('tags', request.tags.join(','));
    }
    if (request.geoLocation) {
        searchParams.append('geoLocation', request.geoLocation);
    }
    if (request.dateYearBegin) {
        searchParams.append('dateBegin', request.dateYearBegin.toString());
    }
    if (request.dateYearEnd) {
        searchParams.append('dateEnd', request.dateYearEnd.toString());
    }

    const searchResponse = await fetch(`${baseURL}/search?${searchParams.toString()}`);
    if (!searchResponse.ok) {
        throw new Error(`Failed to fetch search results: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    if (!searchData.objectIDs) {
        return [];
    }
    const searchObjectIds = searchData.objectIDs.slice(0, 10);

    const searchDetailsPromises = searchObjectIds.map(async (objectId: number) => {
        const objectResponse = await fetch(`${baseURL}/objects/${objectId}`);
        if (!objectResponse.ok) {
            throw new Error(`Failed to fetch object ${objectId}: ${objectResponse.status}`);
        }
        const objectData = await objectResponse.json();
        return {
            objectID: objectData.objectID,
            title: objectData.title,
            primaryImage: objectData.primaryImage,
            artistDisplayName: objectData.artistDisplayName,
        } as ArtObject;
    });

    const searchDetails = await Promise.all(searchDetailsPromises);
    return searchDetails.filter((searchResult) => searchResult.primaryImage && searchResult.artistDisplayName && searchResult.title);
}