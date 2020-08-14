import ResponseService from "./Services/response.service";
import responseConstants from "./constants/response.constants";
import { IItem } from "./interfaces";
import { FirebaseItem } from "./types/Firebase.types";
import * as admin from 'firebase-admin';

const handleUserDetails = async (req: any, res: any): Promise<any> => {
  // Allowing all origins for the time being. In future would use detailed CORS.
  res.set('Access-Control-Allow-Origin', '*');
  res.set("Access-Control-Allow-Headers", "Content-Type");
  
  let snapshot: any;
  try {
    snapshot = await admin.firestore().collection("items").get();
  } catch (err) {
    return res.status(responseConstants.ERROR).send(ResponseService.ErrorResponse('Something went wrong.'));
  }
  
  if (!snapshot) {
    return res.status(responseConstants.ERROR).send(ResponseService.ErrorResponse('User not found. Please try logging out and in again.'));
  }

  const deserializedResults: IItem[] = [];
  snapshot.forEach((ref: FirebaseItem<IItem>) => {
    deserializedResults.push(Object.assign(ref.data(), { id: ref.id }));
  })

  return res.status(responseConstants.SUCCESS).send(ResponseService.SuccessResponse<IItem[]>(deserializedResults));
}

export default handleUserDetails;
