import { Timestamp } from "firebase/firestore";
import { IUser, IUserDB } from "@/_shared/interface/user.interface";

export class UserModel {
  public buildItem(model: IUserDB): IUser {
    return {
      ...model,
      id: String(model.id),
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IUserDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IUser): IUserDB {
    return {
      uid: model.uid || "",
      name: model.name || "",
      email: model.email || "",

      creationDate: model.creationDate
        ? Timestamp.fromDate(new Date(model.creationDate))
        : Timestamp.now(),
    };
  }
}
