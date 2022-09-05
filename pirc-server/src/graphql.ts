
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Gender {
    male = "male",
    female = "female"
}

export interface SignupInput {
    username?: Nullable<string>;
    gender?: Nullable<Gender>;
}

export interface IQuery {
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signup(input: SignupInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id?: Nullable<number>;
    username?: Nullable<string>;
    gender?: Nullable<Gender>;
}

type Nullable<T> = T | null;
