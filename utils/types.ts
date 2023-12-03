export namespace IEntity {
  export type Role = "admin" | "user";

  export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IAdmin extends IUser {}

  export interface IPost {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IComment {
    id: string;
    userId: string;
    postId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export namespace IResponse {
  export type Status = "success" | "error";

  export interface IError {
    status: Status;
    message: string;
  }

  export interface ISuccess<T> {
    status: Status;
    data: T;
    message: string;
  }
}

export namespace IBody {
  export interface IRegister {
    name: string;
    email: string;
    password: string;
    role: IEntity.Role;
  }

  export interface ILogin extends Pick<IRegister, "email" | "password"> {}

  export interface IPost {
    title: string;
    content: string;
  }

  export interface IComment {
    content: string;
  }
}
