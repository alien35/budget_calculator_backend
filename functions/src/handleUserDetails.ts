import ResponseService from "./Services/response.service";
import responseConstants from "./constants/response.constants";
import * as admin from 'firebase-admin';
import { IUser } from './interfaces'

const handleUserDetails = async (req: any, res: any): Promise<any> => {
  // Allowing all origins for the time being. In future would use detailed CORS.
  res.set('Access-Control-Allow-Origin', '*');
  res.set("Access-Control-Allow-Headers", "Content-Type");
  // In this app, there is only one user
  const userID: string = 'PDkodzyofSCKEudyzKSu';
  let userRef: any;
  try {
    userRef = await admin.firestore().collection('user').doc(userID).get();
  } catch (err) {
    return res.status(responseConstants.ERROR).send(ResponseService.ErrorResponse('Something went wrong.'));
  }
  
  if (!userRef.exists) {
    return res.status(responseConstants.ERROR).send(ResponseService.ErrorResponse('User not found. Please try logging out and in again.'));
  }

  return res.status(responseConstants.SUCCESS).send(ResponseService.SuccessResponse<IUser>(userRef.data()));
}

export default handleUserDetails;
