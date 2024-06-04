const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export type ArtObject = {
    objectID: number;
    title: string;
    primaryImage: string;
    artistDisplayName: string;
};

export async function getHighlights(): Promise<ArtObject[]> {
    try {
        // Step 1: Fetch the highlight object IDs from the API
        const highlightsResponse = await fetch(`${baseURL}/search?isHighlight=true&hasImages=true&q=dog`);
        if (!highlightsResponse.ok) {
            throw new Error(`Failed to fetch highlights: ${highlightsResponse.status}`);
        }

        const highlightsData = await highlightsResponse.json();
        const highlightObjectIds = highlightsData.objectIDs;

        // Limiting the number of highlights for demonstration purposes (e.g., first 10 highlights)
        const limitedHighlightObjectIds = highlightObjectIds.slice(0, 10);

        // Step 2: Fetch details for each highlighted object
        const highlightDetailsPromises = limitedHighlightObjectIds.map(async (objectId) => {
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

        return highlightDetails.filter((highlight) => highlight.primaryImage).filter((highlight) => highlight.artistDisplayName).filter((highlight) => highlight.title);
    } catch (error) {
        console.error('Error fetching highlights:', error);
        return [];
    }
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
        return {} as ArtObject;
    }
}
