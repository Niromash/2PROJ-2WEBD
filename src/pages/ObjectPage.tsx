// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getObjectDetails, ArtObject } from '../services/api.tsx';
// import ObjectDetail from '../components/ObjectDetail.tsx';
//
// interface RouteParams {
//     id: string;
// }
//
// const ObjectPage: React.FC = () => {
//     const { id } = useParams<RouteParams>();
//     const [object, setObject] = useState<ArtObject | null>(null);
//
//     useEffect(() => {
//         const fetchObjectDetails = async () => {
//             try {
//                 const objectData = await getObjectDetails(Number(id));
//                 setObject(objectData);
//             } catch (error) {
//                 console.error('Error fetching object details:', error);
//             }
//         };
//
//         fetchObjectDetails();
//     }, [id]);
//
//     return (
//         <div className="p-4">
//             {object ? <ObjectDetail object={object} /> : 'Loading...'}
//         </div>
//     );
// };
//
// export default ObjectPage;