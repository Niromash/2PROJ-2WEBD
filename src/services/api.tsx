const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export type ArtObject = {
    objectID: number;
    title: string;
    primaryImage: string;
    artistDisplayName: string;
};

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
        } as ArtObject;
    } catch (error) {
        console.error('Error fetching object details:', error);
        throw error;
    }
}
