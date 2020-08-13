import ResponseService from "./Services/response.service";
import responseConstants from "./constants/response.constants";
import {IUser} from "./interfaces";
import * as admin from 'firebase-admin';

const handleUpdateUserDetails = async (req: any, res: any): Promise<any> => {
  // Allowing all origins for the time being. In future would use detailed CORS.
  res.set('Access-Control-Allow-Origin', '*');
  res.set("Access-Control-Allow-Headers", "Content-Type");
  // In this app, there is only one user
  const { budget, selectedItems } = req.body;
  if (!budget) {
    return res.status(responseConstants.ERROR).send(ResponseService.ErrorResponse('budget missing.'));
  }
  if (!selectedItems) {
    return res.status(responseConstants.ERROR).send(ResponseService.ErrorResponse('selectedItems missing.'));
  }
  const userID: string = 'PDkodzyofSCKEudyzKSu';
  const serializedData: IUser = {
    budget,
    selectedItems
  }
  try {
    await admin.firestore().collection('user').doc(userID).set(serializedData);
  } catch (err) {
    return res.status(responseConstants.ERROR).send(ResponseService.ErrorResponse('Something went wrong.'));
  }
  return res.status(responseConstants.SUCCESS).send(ResponseService.SuccessResponse<string>('done'));
}

export default handleUpdateUserDetails;
